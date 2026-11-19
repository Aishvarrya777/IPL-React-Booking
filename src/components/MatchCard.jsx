
import { useState } from 'react';

function MatchCard(props) {

  const [booked, setBooked] = useState(false);

  return (
    <div className="match-card">
      <h3>{props.team1} vs {props.team2}</h3>

      <p>Date: {props.date}</p>
      <p>Venue: {props.venue}</p>

      <button onClick={() => setBooked(!booked)}>
        {booked ? "Selected!" : "Book Tickets"}
      </button>

      {booked && <p>Match selected successfully!</p>}
    </div>
  );
}

export default MatchCard;
