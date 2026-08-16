import React,{useMemo,useState} from "react";
import SquadSummary from "../pages/SquadSummary";
import SquadFilters from "../pages/SquadFilters";
import PlayerCard from "../components/PlayerCard";
import PlayerForm from "../components/PlayerForm";
import "./Squad.css"

const initialPlayers=[
  {
    id:1,
    name:"Don Sergon",
    position:"ST",
    appearances:8,
    goals:6,
    assists:2,
  },
  {
    id:2,
    name:"Derick Mwangi",
    position:"CM",
    appearances:7,
    goals:2,
    assists:5,
  },
  {
    id:3,
    name:"Gerald Kizito",
    position:"CB",
    appearances:9,
    goals:0,
    assists:1,
  },
];

const Squad=()=>{
  const [players,setPlayers]=useState(initialPlayers);
  const [searchTerm,setSearchTerm]=useState("");
  const [positionFilter,setPositionFilter]=useState("All");
  const [showForm,setShowForm]=useState(false);

  const addPlayer=(newPlayer)=>{
    setPlayers((previousPlayers)=>[...previousPlayers,newPlayer]);
  };

  const deletePlayer=(playerId)=>{
    const confirmed=window.confirm("Are you sure you want to remove this player?");
    if(!confirmed)return;
    setPlayers((previousPlayers)=>previousPlayers.filter((player)=>player.id!==playerId));
  };

  const filteredPlayers=useMemo(()=>{
    return players.filter((player)=>{
      const matchesSearch=player.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition=positionFilter==="All"||player.position===positionFilter;
      return matchesSearch&&matchesPosition;
    });
  },[players,searchTerm,positionFilter]);

  return(
    <div className="squad-page">
      <div className="squad-container">
        <div className="squad-header">
          <div>
            <h1 className="squad-title">Squad</h1>
            <p className="squad-subtitle">Manage your team's players and statistics.</p>
          </div>
          <button className="add-player-btn" onClick={()=>setShowForm(true)}>Add Player</button>
        </div>
        <SquadSummary players={players}/>
        <SquadFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} positionFilter={positionFilter} setPositionFilter={setPositionFilter}/>
        {filteredPlayers.length>0?(
          <div className="player-grid">
            {filteredPlayers.map((player)=>(
              <PlayerCard key={player.id} player={player} onDelete={deletePlayer}/>
            ))}
          </div>
        ):(
          <div className="empty-state">
            <h3>No players found</h3>
            <p>Try changing your search or position filter.</p>
          </div>
        )}
      </div>
      {showForm&&(
        <PlayerForm onAddPlayer={addPlayer} onClose={()=>setShowForm(false)}/>
      )}
    </div>
  );
};
export default Squad;