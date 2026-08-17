import { useMemo, useState, useContext } from "react";
import { TeamContext } from "../context/TeamContext";

function Matches() {
  const {
    team,
    matches,
    addMatch,
    deleteMatch,
    updateMatchResult,
  } = useContext(TeamContext);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    opponent: "",
    date: "",
    time: "",
    venue: "",
    type: "League",
  });

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const result = match.result || "Upcoming";

      const matchesFilter =
        filter === "All" || result === filter;

      const matchesSearch = match.opponent
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [matches, filter, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.opponent ||
      !formData.date ||
      !formData.time ||
      !formData.venue
    ) {
      alert("Please complete all fields.");
      return;
    }

    addMatch({
      opponent: formData.opponent,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      type: formData.type,
      result: "Upcoming",
      teamScore: null,
      opponentScore: null,
    });

    setFormData({
      opponent: "",
      date: "",
      time: "",
      venue: "",
      type: "League",
    });

    setShowForm(false);
  };

  const handleDeleteMatch = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmed) return;

    deleteMatch(id);
  };

  const handleResultChange = (match, result) => {
    if (result === "Upcoming") {
      updateMatchResult(match.id, result, null, null);
      return;
    }

    const teamScore = prompt(
      `Enter ${team.name} score:`
    );

    const opponentScore = prompt(
      "Enter opponent score:"
    );

    if (
      teamScore === null ||
      opponentScore === null
    ) {
      return;
    }

    updateMatchResult(
      match.id,
      result,
      Number(teamScore),
      Number(opponentScore)
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Matches</h1>
          <p>Manage fixtures and record team results.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Match"}
        </button>
      </div>

      {showForm && (
        <form
          className="form-card"
          onSubmit={handleSubmit}
        >
          <h2>Add New Match</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Opponent</label>

              <input
                type="text"
                name="opponent"
                value={formData.opponent}
                onChange={handleChange}
                placeholder="e.g. Kahawa United"
              />
            </div>

            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Time</label>

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Venue</label>

              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Match venue"
              />
            </div>

            <div className="form-group">
              <label>Match Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="League">League</option>
                <option value="Friendly">Friendly</option>
                <option value="Cup">Cup</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="primary-btn"
          >
            Save Match
          </button>
        </form>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search opponent..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value)
          }
        >
          <option value="All">All Matches</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Won">Won</option>
          <option value="Draw">Draw</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      <div className="matches-grid">
        {filteredMatches.length === 0 ? (
          <div className="empty-state">
            <h3>No matches found</h3>
            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          filteredMatches.map((match) => {
            const result = match.result || "Upcoming";

            return (
              <div
                className="match-card"
                key={match.id}
              >
                <div className="match-top">
                  <span className="match-type">
                    {match.type}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDeleteMatch(match.id)
                    }
                  >
                    Delete
                  </button>
                </div>

                <h2>{team.name}</h2>

                <div className="vs-row">
                  <strong>{team.name}</strong>
                  <span>VS</span>
                  <strong>{match.opponent}</strong>
                </div>

                {result !== "Upcoming" && (
                  <div className="score">
                    {match.teamScore} -{" "}
                    {match.opponentScore}
                  </div>
                )}

                <p>
                  📅 {match.date} &nbsp; 🕒{" "}
                  {match.time}
                </p>

                <p>📍 {match.venue}</p>

                <div className="result-controls">
                  <select
                    value={result}
                    onChange={(event) =>
                      handleResultChange(
                        match,
                        event.target.value
                      )
                    }
                  >
                    <option value="Upcoming">
                      Upcoming
                    </option>
                    <option value="Won">Won</option>
                    <option value="Draw">Draw</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Matches;