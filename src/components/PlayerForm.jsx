import React, { useState } from "react";

const PlayerForm = ({ onAddPlayer, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    position: "ST",
    appearances: 0,
    goals: 0,
    assists: 0,
  });

  const [error, setError] = useState("");

  const handleChange = (evt) => {

    setFormData((previousData) => ({
      ...previousData,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter the player's name.");
      return;
    }

    const newPlayer = {
      id: Date.now(),
      name: formData.name.trim(),
      position: formData.position,
      appearances: Number(formData.appearances),
      goals: Number(formData.goals),
      assists: Number(formData.assists),
    };

    onAddPlayer(newPlayer);

    setFormData({
      name: "",
      position: "ST",
      appearances: 0,
      goals: 0,
      assists: 0,
    });

    setError("");
    onClose();
  };

  return (
    <div>
        <div>
            <h2>Add Player</h2>
            <p>
              Add a new player to your squad.
            </p>
        </div>
        <div>
          <button onClick={onClose}>×</button>
        </div>

        {error && <div>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Player Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Brian Otieno"
            />
          </div>

          <div>
            <label>Position</label>

            <select
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

          <div >
            <div>
              <label>Appearances</label>

              <input
                type="number"
                min="0"
                name="appearances"
                value={formData.appearances}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Goals</label>
              <input
                type="number"
                min="0"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
              />
            </div>

            <div >
              <label>Assists</label>
              <input
                type="number"
                min="0"
                name="assists"
                value={formData.assists}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Add Player</button>
          </div>
        </form>
      </div>
  );
};

export default PlayerForm;