import { useContext } from "react";
import { TeamContext } from "../context/TeamContext";
import StatCard from "../components/StatCard";
import MatchPreview from "../components/MatchPreview";

function Dashboard() {
  const { team, players, matches } =
    useContext(TeamContext);

  const upcomingMatches = matches.filter(
    (match) => match.result === "Upcoming"
  );

  const nextMatch = upcomingMatches[0];

  const totalGoals = players.reduce(
    (total, player) => total + Number(player.goals || 0),
    0
  );

  const completedMatches = matches.filter(
    (match) => match.result !== "Upcoming"
  );

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <p className="eyebrow">TEAM OVERVIEW</p>

          <h1>Welcome to {team.name}</h1>

          <p className="page-description">
            Here's what's happening with your team.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Players"
          value={players.length}
        />

        <StatCard
          title="Matches"
          value={matches.length}
        />

        <StatCard
          title="Goals"
          value={totalGoals}
        />

        <StatCard
          title="Completed"
          value={completedMatches.length}
        />
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Upcoming Match</h2>
        </div>

        <MatchPreview match={nextMatch} />
      </section>

      <section className="dashboard-section">
        <div className="section-header">
          <h2>Team Information</h2>
        </div>

        <div className="team-info-card">
          <div>
            <span>Team</span>
            <strong>{team.name}</strong>
          </div>

          <div>
            <span>Coach</span>
            <strong>{team.coach}</strong>
          </div>

          <div>
            <span>Season</span>
            <strong>{team.season}</strong>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;