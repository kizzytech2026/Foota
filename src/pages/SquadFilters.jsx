import React from "react";

const SquadFilters = ({searchTerm,setSearchTerm,positionFilter,setPositionFilter,}) => {
  return (
    <div>
      <div>
        <label>Search Players</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(evt) => setSearchTerm(evt.target.value)}
          placeholder="Search by name"
        />
      </div>

      <div>
        <label>Filter by Position</label>

        <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
          <option value="All">All Positions</option>
          <option value="GK">Gk</option>
          <option value="CB">C</option>
          <option value="LB">LB</option>
          <option value="RB">RB</option>
          <option value="CM">CM</option>
          <option value="CAM">CAM</option>
          <option value="LW">LW</option>
          <option value="RW">RW</option>
          <option value="ST">ST</option>
        </select>
      </div>
    </div>
  );
};

export default SquadFilters;