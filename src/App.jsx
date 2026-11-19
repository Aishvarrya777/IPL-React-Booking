
import { useState } from 'react';
import './App.css';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchCard from './components/MatchCard';

function App() {
  const matches = [
    { id: 1, team1: "CSK", team2: "MI", date: "20 April 2026", venue: "Chennai" },
    { id: 2, team1: "RCB", team2: "KKR", date: "22 April 2026", venue: "Bengaluru" },
    { id: 3, team1: "SRH", team2: "RR", date: "24 April 2026", venue: "Hyderabad" }
  ];

  const [selectedMatches, setSelectedMatches] = useState([]);

  function toggleBooking(id) {
    setSelectedMatches((previous) =>
      previous.includes(id)
        ? previous.filter((matchId) => matchId !== id)
        : [...previous, id]
    );
  }

  return (
    <>
      <Navbar bookingCount={selectedMatches.length} />
      <Hero />

      <section>
        <h2>Upcoming Matches</h2>
<div className="matches-grid">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            venue={match.venue}
            isBooked={selectedMatches.includes(match.id)}
            onToggle={() => toggleBooking(match.id)}
          />
        ))}
        </div>
      </section>
    </>
  );
}

export default App;
