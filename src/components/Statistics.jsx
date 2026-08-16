import { useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  initialMatches,
  initialPlayers,
} from "../data/initialData";

function Statistics() {
  const [matches] = useLocalStorage(
    "teamhub-matches",
    initialMatches
  );

  const [Players] = useLocalStorage(
    "teamhub-players",
    initialPlayers
  );

  const stats = useMemo(() => {
    const completedMatches = matches.filter(
      (match) => match.result !== "Upcoming"
    );

    const wins = completedMatches.filter(
      (match) => match.result === "Won"
    ).length;

    const draws = completedMatches.filter(
      (match) => match.result === "Draw"
    ).length;

    const losses = completedMatches.filter(
      (match) => match.result === "Lost"
    ).length;

    const goalsScored = completedMatches.reduce(
      (total, match) => total + (match.teamScore || 0),
      0
    );

    const goalsConceded = completedMatches.reduce(
      (total, match) => total + (match.opponentScore || 0),
      0
    );

    const totalGoals = players.reduce(
      (total, player) => total + Number(player.goals || 0),
      0
    );

    const totalAssists = players.reduce(
      (total, player) => total + Number(player.assists || 0),
      0
    );

    const winPercentage =
      completedMatches.length === 0
        ? 0
        : Math.round((wins / completedMatches.length) * 100);

    const topScorer =
      [...players].sort((a, b) => b.goals - a.goals)[0] || null;

    const mostAppearances =
      [...players].sort(
        (a, b) => b.appearances - a.appearances
      )[0] || null;

    return {
      played: completedMatches.length,
      wins,
      draws,
      losses,
      goalsScored,
      goalsConceded,
      totalGoals,
      totalAssists,
      winPercentage,
      topScorer,
      mostAppearances,
    };
  }, [matches, players]);

  const statCards = [
    {
      title: "Matches Played",
      value: stats.played,
      icon: "⚽",
    },
    {
      title: "Wins",
      value: stats.wins,
      icon: "🏆",
    },
    {
      title: "Draws",
      value: stats.draws,
      icon: "🤝",
    },
    {
      title: "Losses",
      value: stats.losses,
      icon: "❌",
    },
    {
      title: "Goals Scored",
      value: stats.goalsScored,
      icon: "🥅",
    },
    {
      title: "Goals Conceded",
      value: stats.goalsConceded,
      icon: "🧤",
    },
    {
      title: "Win Percentage",
      value: `${stats.winPercentage}%`,
      icon: "📈",
    },
    {
      title: "Total Assists",
      value: stats.totalAssists,
      icon: "🎯",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Statistics</h1>
          <p>Analyze TeamHub FC performance.</p>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-icon">{stat.icon}</div>

            <div>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="two-column">
        <div className="panel">
          <h2>Top Scorer</h2>

          {stats.topScorer ? (
            <div className="player-highlight">
              <div className="avatar">
                {stats.topScorer.name.charAt(0)}
              </div>

              <div>
                <h3>{stats.topScorer.name}</h3>
                <p>{stats.topScorer.position}</p>
              </div>

              <strong>{stats.topScorer.goals} Goals</strong>
            </div>
          ) : (
            <p>No player data available.</p>
          )}
        </div>

        <div className="panel">
          <h2>Most Appearances</h2>

          {stats.mostAppearances ? (
            <div className="player-highlight">
              <div className="avatar">
                {stats.mostAppearances.name.charAt(0)}
              </div>

              <div>
                <h3>{stats.mostAppearances.name}</h3>
                <p>{stats.mostAppearances.position}</p>
              </div>

              <strong>
                {stats.mostAppearances.appearances} Games
              </strong>
            </div>
          ) : (
            <p>No player data available.</p>
          )}
        </div>
      </div>

      <div className="panel">
        <h2>Player Performance</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Position</th>
                <th>Appearances</th>
                <th>Goals</th>
                <th>Assists</th>
              </tr>
            </thead>

            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.appearances}</td>
                  <td>{player.goals}</td>
                  <td>{player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Statistics;