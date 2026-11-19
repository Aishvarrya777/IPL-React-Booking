
function MatchCard(props) {
  return (
    <div className="match-card">
      <h3>{props.team1} vs {props.team2}</h3>

      <p>Date: {props.date}</p>
      <p>Venue: {props.venue}</p>

      <button onClick={props.onToggle}>
        {props.isBooked ? "Cancel Booking" : "Book Tickets"}
      </button>

      {props.isBooked && (
        <p>Match selected successfully!</p>
      )}
    </div>
  );
}

export default MatchCard;
