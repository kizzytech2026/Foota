import React from "react";

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
    <div>
      <div>
        <p>Total Players</p>
        <p>{players.length}</p>
      </div>

      <div>
        <p>Total Goals</p>
        <p>{totalGoals}</p>
      </div>

      <div>
        <p>Total Assists</p>
        <p>{totalAssists}</p>
      </div>
    </div>
  );
};

export default SquadSummary;