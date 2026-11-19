
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MatchCard from './components/MatchCard';
import './App.css';
import './index.css';
function App() {

  const matches = [
    {
      id: 1,
      team1: "CSK",
      team2: "MI",
      date: "20 April 2026",
      venue: "Chennai"
    },
    {
      id: 2,
      team1: "RCB",
      team2: "KKR",
      date: "22 April 2026",
      venue: "Bengaluru"
    },
    {
      id: 3,
      team1: "SRH",
      team2: "RR",
      date: "24 April 2026",
      venue: "Hyderabad"
    }
  ];

  return (
    <>
      <Navbar />
      <Hero />

      <section>
        <h2>Upcoming Matches</h2>

        {matches.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            date={match.date}
            venue={match.venue}
          />
        ))}

      </section>
    </>
  );
}

export default App;
