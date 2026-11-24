
import { useState, useEffect } from 'react';
import './App.css';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchCard from './components/MatchCard';
import { supabase } from './supabase';

function App() {
  const [matches, setMatches] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchMatches() {
    const { data, error } = await supabase
      .from('matches')
      .select('*');

    if (error) {
      console.error('Error fetching matches:', error.message);
    } else {
      setMatches(data);
    }

    setLoading(false);
  }

  async function fetchBookingCount() {
  const { data, error } = await supabase
    .from('bookings')
    .select('tickets');

  if (error) {
    console.error('Error fetching bookings:', error.message);
    return;
  }

  const total = data.reduce(
    (sum, booking) => sum + booking.tickets,
    0
  );

  setBookingCount(total);
}
useEffect(() => {
  // Fetch matches when the app loads
  fetchMatches();
    fetchBookingCount();

  // Listen for database changes
  const channel = supabase
    .channel('matches-realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'matches'
      },
      (payload) => {
        console.log('Database changed:', payload);
        fetchMatches();
      }
    )
    .subscribe();

  // Clean up subscription
  return () => {
    supabase.removeChannel(channel);
  };
}, []);


  async function handleBooking(id, tickets) {
    const match = matches.find((m) => m.id === id);

    if (!match || tickets < 1 || tickets > match.available_seats) {
      alert('Not enough seats available!');
      return;
    }

    // Update available seats
    const { data: updatedMatch, error: updateError } = await supabase
      .from('matches')
      .update({
        available_seats: match.available_seats - tickets
      })
      .eq('id', id)
      .gte('available_seats', tickets)
      .select()
      .maybeSingle();

    if (updateError || !updatedMatch) {
      alert('Booking failed! Please check available seats.');
      await fetchMatches();
      return;
    }

    // Insert booking into database
    const { error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          match_id: id,
          customer_name: 'Guest',
          tickets: tickets
        }
      ]);

    if (bookingError) {
      console.error('Booking error:', bookingError.message);

      // Restore seats if booking insertion fails
      await supabase
        .from('matches')
        .update({ available_seats: match.available_seats })
        .eq('id', id);

      alert('Booking failed! Please try again.');
      await fetchMatches();
      return;
    }

    setBookingCount((previous) => previous + tickets);

    await fetchMatches();

    alert('Tickets booked successfully!');
  }

  return (
    <>
      <Navbar bookingCount={bookingCount} />
      <Hero />

      <section>
        <h2>Upcoming Matches</h2>

        {loading ? (
          <p>Loading matches...</p>
        ) : (
          <div className="matches-grid">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                team1={match.team1}
                team2={match.team2}
                date={match.match_date}
                venue={match.venue}
                availableSeats={match.available_seats}
                onToggle={(tickets) =>
                  handleBooking(match.id, tickets)
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default App;
