import React,{useState} from "react";
import "../pages/Squad.css"

const PlayerForm=({onAddPlayer,onClose})=>{
  const [formData,setFormData]=useState({
    name:"",
    position:"ST",
    appearances:0,
    goals:0,
    assists:0,
  });
  const [error,setError]=useState("");

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((previousData)=>({
      ...previousData,
      [name]:value,
    }));
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!formData.name.trim()){
      setError("Please enter the player's name.");
      return;
    }
    const newPlayer={
      id:Date.now(),
      name:formData.name.trim(),
      position:formData.position,
      appearances:Number(formData.appearances),
      goals:Number(formData.goals),
      assists:Number(formData.assists),
    };
    onAddPlayer(newPlayer);
    setFormData({
      name:"",
      position:"ST",
      appearances:0,
      goals:0,
      assists:0,
    });
    setError("");
    onClose();
  };

  return(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Add Player</h2>
            <p className="modal-subtitle">Add a new player to your squad.</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose}>×</button>
        </div>

        {error&&(
          <div className="error-message">{error}</div>
        )}

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Player Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Brian Otieno"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Position</label>
            <select
              className="form-select"
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="GK">Goalkeeper</option>
              <option value="CB">Centre Back</option>
              <option value="LB">Left Back</option>
              <option value="RB">Right Back</option>
              <option value="CM">Central Midfielder</option>
              <option value="CAM">Attacking Midfielder</option>
              <option value="LW">Left Winger</option>
              <option value="RW">Right Winger</option>
              <option value="ST">Striker</option>
            </select>
          </div>

          <div className="stats-input-grid">
            <div className="form-group">
              <label className="form-label">Appearances</label>
              <input
                className="form-input"
                type="number"
                min="0"
                name="appearances"
                value={formData.appearances}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Goals</label>
              <input
                className="form-input"
                type="number"
                min="0"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assists</label>
              <input
                className="form-input"
                type="number"
                min="0"
                name="assists"
                value={formData.assists}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-player-btn">Add Player</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlayerForm;
