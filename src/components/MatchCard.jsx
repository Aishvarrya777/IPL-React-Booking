
import { useState } from 'react';

function MatchCard(props) {
  const [tickets, setTickets] = useState(1);
  const [category, setCategory] = useState('General');

  const prices = {
    General: 500,
    Premium: 1500,
    VIP: 3000
  };

  const totalPrice = prices[category] * tickets;

  return (
    <div className="match-card">
      <h3>{props.team1} vs {props.team2}</h3>

      <p>Date: {props.date}</p>
      <p>Venue: {props.venue}</p>
      <p>Available Seats: {props.availableSeats}</p>

      <label>Ticket Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="General">General - ₹500</option>
        <option value="Premium">Premium - ₹1500</option>
        <option value="VIP">VIP - ₹3000</option>
      </select>

      <div className="ticket-selector">
        <label>Number of Tickets: </label>

        <button
          onClick={() => setTickets(Math.max(1, tickets - 1))}
        >
          -
        </button>

        <span>{tickets}</span>

        <button
          onClick={() =>
            setTickets(Math.min(props.availableSeats, tickets + 1))
          }
          disabled={tickets >= props.availableSeats}
        >
          +
        </button>
      </div>

      <h3>Total Price: ₹{totalPrice}</h3>

      <button
        onClick={() => props.onToggle(tickets, category, prices[category])}
        disabled={props.availableSeats < 1 || tickets > props.availableSeats}
      >
        Book Tickets
      </button>
    </div>
  );
}

export default MatchCard;
