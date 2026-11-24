
import { useState } from 'react';

function MatchCard(props) {
  const [tickets, setTickets] = useState(1);

  return (
    <div className="match-card">
      <h3>{props.team1} vs {props.team2}</h3>

      <p>Date: {props.date}</p>
      <p>Venue: {props.venue}</p>

      <p>Available Seats: {props.availableSeats}</p>

      <div className="ticket-selector">
        <label>Number of Tickets: </label>

        <button
          onClick={() => setTickets(Math.max(1, tickets - 1))}
        >
          -
        </button>

        <span>{tickets}</span>

        <button
          onClick={() => setTickets(Math.min(props.availableSeats, tickets + 1))}
          disabled={tickets >= props.availableSeats}
        >
          +
        </button>
      </div>

      <button
        onClick={() => props.onToggle(tickets)}
        disabled={props.availableSeats < 1}
      >
        Book Tickets
      </button>
    </div>
  );
}

export default MatchCard;
