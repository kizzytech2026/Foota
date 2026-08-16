import React from "react";

const PlayerCard = ({ player, onDelete }) => {
  return (
    <div>
          <div>
            {player.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{player.name}</h3>
            <p>{player.position}</p>
          </div>
        
        <button onClick={() => onDelete(player.id)}>Delete</button>

      <div>
        <div>
          <p>Appearances</p>
          <p>{player.appearances}</p>
        </div>

        <div>
          <p>Goals</p>
          <p>{player.goals}</p>
        </div>

        <div>
          <p>Assists</p>
          <p>{player.assists}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;