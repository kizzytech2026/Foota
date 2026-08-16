import React from "react";
import "./Squad.css"

const SquadSummary = ({ players }) => {
  const totalGoals = players.reduce(
    (total, player) => total + player.goals,
    0
  );

  const totalAssists = players.reduce(
    (total, player) => total + player.assists,
    0
  );

  return (
    <div className="squad-summary">
      <div className="summary-card">
        <p className="summary-label">
          Total Players
        </p>
        <p className="summary-number">
          {players.length}
        </p>
      </div>
      <div className="summary-card">
        <p className="summary-label">
          Total Goals
        </p>
        <p className="summary-number green">
          {totalGoals}
        </p>
      </div>
      <div className="summary-card">
        <p className="summary-label">
          Total Assists
        </p>
        <p className="summary-number">
          {totalAssists}
        </p>
      </div>
    </div>
  );
};

export default SquadSummary;