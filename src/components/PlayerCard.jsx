import React from "react";
import "../pages/Squad.css"

const PlayerCard=({player,onDelete})=>{
  return(
    <div className="player-card">
      <div className="player-top">
        <div className="player-info">
          <div className="player-avatar">
            {player.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="player-name">{player.name}</h3>
            <p className="player-position">{player.position}</p>
          </div>
        </div>
        <button className="delete-player-btn" onClick={()=>onDelete(player.id)}>Delete</button>
      </div>
      <div className="player-stats">
        <div className="player-stat">
          <p className="player-stat-label">Appearances</p>
          <p className="player-stat-value">{player.appearances}</p>
        </div>
        <div className="player-stat">
          <p className="player-stat-label">Goals</p>
          <p className="player-stat-value">{player.goals}</p>
        </div>
        <div className="player-stat">
          <p className="player-stat-label">Assists</p>
          <p className="player-stat-value">{player.assists}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
