function MatchPreview({ match }) {
    if (!match) {
        return (
            <div className="match-preview empty">
                <p>No upcoming matches</p>
            </div>
        );
    }

    return(
        <div className="match-preview">
            <div>
                <span className="match-label">NEXT MATCH</span>
                <h2>TeamHub FC</h2>
            </div>

            <div className="match-vs">
                <span>VS</span>
            </div>

            <div className="opponent">
                <span className="match-label">OPPONENT</span>
                <h2>{match.opponent}</h2>
                </div>

                <div className="match-details">
                    <p>{match.date}</p>
                    <p>{match.venue}</p>
                </div>
                </div>
    );
}

export default MatchPreview;
