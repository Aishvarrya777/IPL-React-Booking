
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        id,
        customer_name,
        tickets,
        ticket_category,
        price_per_ticket,
        total_amount,
        created_at,
        matches (
          team1,
          team2,
          match_date,
          venue
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      return;
    }

    setBookings(data);
  }

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>
            <h3>
              {booking.matches?.team1} vs {booking.matches?.team2}
            </h3>

            <p>Date: {booking.matches?.match_date}</p>
            <p>Venue: {booking.matches?.venue}</p>
            <p>Ticket Category: {booking.ticket_category}</p>
            <p>Number of Tickets: {booking.tickets}</p>
            <p>Price per Ticket: ₹{booking.price_per_ticket}</p>
            <h3>Total Amount: ₹{booking.total_amount}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
