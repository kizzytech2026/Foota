import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialMatches } from "../data/initialData";

function Matches() {
  const [matches, setMatches] = useLocalStorage(
    "teamhub-matches",
    initialMatches
  );

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    opponent: "",
    date: "",
    time: "",
    venue: "",
    type: "Leagues",
  });

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const matchesFilter =
        filter === "All" || match.result === filter;

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

    const newMatch = {
      id: Date.now(),
      opponent: formData.opponent,
      date: formData.date,
      time: formData.time,
      venue: formData.venue,
      type: formData.type,
      result: "Upcoming",
      teamScore: null,
      opponentScore: null,
    };

    setMatches((previous) => [newMatch, ...previous]);

    setFormData({
      opponent: "",
      date: "",
      time: "",
      venue: "",
      type: "League",
    });

    setShowForm(false);
  };

  const deleteMatch = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this match?"
    );

    if (!confirmed) return;

    setMatches((previous) =>
      previous.filter((match) => match.id !== id)
    );
  };

  const updateResult = (id, result, teamScore, opponentScore) => {
    setMatches((previous) =>
      previous.map((match) =>
        match.id === id
          ? {
              ...match,
              result,
              teamScore,
              opponentScore,
            }
          : match
      )
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
        <form className="form-card" onSubmit={handleSubmit}>
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

          <button type="submit" className="primary-btn">
            Save Match
          </button>
        </form>
      )}

      <div className="filters">
        <input
          type="text"
          placeholder="Search opponent..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
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
          filteredMatches.map((match) => (
            <div className="match-card" key={match.id}>
              <div className="match-top">
                <span className="match-type">{match.type}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteMatch(match.id)}
                >
                  Delete
                </button>
              </div>

              <h2>TeamHub FC</h2>

              <div className="vs-row">
                <strong>TeamHub FC</strong>
                <span>VS</span>
                <strong>{match.opponent}</strong>
              </div>

              {match.result !== "Upcoming" && (
                <div className="score">
                  {match.teamScore} - {match.opponentScore}
                </div>
              )}

              <p>
                📅 {match.date} &nbsp; 🕒 {match.time}
              </p>

              <p>📍 {match.venue}</p>

              <div className="result-controls">
                <select
                  value={match.result}
                  onChange={(event) => {
                    const result = event.target.value;

                    if (result === "Upcoming") {
                      updateResult(match.id, result, null, null);
                      return;
                    }

                    const teamScore = prompt(
                      "Enter TeamHub FC score:"
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

                    updateResult(
                      match.id,
                      result,
                      Number(teamScore),
                      Number(opponentScore)
                    );
                  }}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Won">Won</option>
                  <option value="Draw">Draw</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Matches;