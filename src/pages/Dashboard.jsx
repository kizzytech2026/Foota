import { useContext } from "react";
import { TeamContext } from "../context/Teamcontext";
import Matches from "./Matches";

function Dashboard() {
    const {team, players, matches} = useContext(TeamContext);

    return(
        <><div>
            <h1>Welcome to {team.name}</h1>
            <p>{team.season}</p>
        </div><div>
                <h2>{players.length}</h2>
                <p>Total Players</p>
            </div><div>
                <h2>{matches.length}</h2>
                <p>Total Matches</p>
            </div></>
    );
}
export default Dashboard;