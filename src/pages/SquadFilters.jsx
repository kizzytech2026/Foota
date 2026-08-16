import React from "react";
import "./Squad.css"

const SquadFilters = ({searchTerm,setSearchTerm,positionFilter,setPositionFilter,}) => {
  return (
    <div className="squad-filters">
      <div className="filter-grid">
        <div className="form-group">
          <label className="form-label">Search Players</label>
          <input
            className="form-input"
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search by name"/></div>

        <div className="form-group">
          <label className="form-label">Filter by Position</label>

          <select
            className="form-select"
            value={positionFilter}
            onChange={(e) =>
              setPositionFilter(e.target.value)
            }>
            <option value="All">All</option>
            <option value="GK">GK</option>
            <option value="CB">CB</option>
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
    </div>
  );
};
export default SquadFilters;