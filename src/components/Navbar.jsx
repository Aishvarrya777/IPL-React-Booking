
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav>
      <h2>IPL TICKET BOOKING</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/#matches">Matches</Link></li>
        <li><Link to="/#matches">Book Tickets</Link></li>
        <li><Link to="/bookings">My Bookings</Link></li>
      </ul>

      <h3>Bookings: {props.bookingCount}</h3>
    </nav>
  );
}

export default Navbar;
