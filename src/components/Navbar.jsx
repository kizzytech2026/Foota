function Navbar() {
    return(
        <header className="navbar">
            <div className="navbar-brand">
                <span className="logo"></span>
                <span>Foota</span>
            </div>

            <div className="navbar-actions">
                <button className="icon-button" ariel-label="Notifications">🔔</button>
                <button className="icon-button" ariel-label="Settings">⚙️</button>
            </div>
        </header>
    );
}

export default Navbar;