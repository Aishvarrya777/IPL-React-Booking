
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchCard from './components/MatchCard';
import MyBookings from './components/MyBookings';
import { supabase } from './supabase';

function App() {
  const [matches, setMatches] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  async function fetchMatches() {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .order('id', { ascending: true });

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
    fetchMatches();
    fetchBookingCount();

    const channel = supabase
      .channel('matches-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'matches'
        },
        () => {
          fetchMatches();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleBooking(id, tickets, category, pricePerTicket) {
    const match = matches.find((m) => m.id === id);

    if (!match || tickets < 1 || tickets > match.available_seats) {
      alert('Not enough seats available!');
      return;
    }

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

    const { error: bookingError } = await supabase
      .from('bookings')
      .insert([
        {
          match_id: id,
          customer_name: 'Guest',
          tickets: tickets,
          ticket_category: category,
          price_per_ticket: pricePerTicket,
          total_amount: tickets * pricePerTicket
        }
      ]);

    if (bookingError) {
      console.error('Booking error:', bookingError.message);

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
    <BrowserRouter>
      <Navbar bookingCount={bookingCount} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />

              <section id="matches">
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
                        onToggle={(tickets, category, price) =>
                          handleBooking(match.id, tickets, category, price)
                        }
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          }
        />

        <Route
          path="/bookings"
          element={<MyBookings />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
