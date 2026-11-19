
function Navbar(props) {
  return (
    <nav>
      <h2>IPL TICKET BOOKING</h2>

      <ul>
        <li>Home</li>
        <li>Matches</li>
        <li>Book Tickets</li>
        <li>My Bookings</li>
      </ul>

      <h3>Bookings: {props.bookingCount}</h3>
    </nav>
  );
}

export default Navbar;
