import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TeamContext = createContext();

export function TeamProvider({ children }) {
 
 const [team, setTeam] = useLocalStorage("teamhub-team", {
    name: "TeamHub FC",
    coach: "Team Coach",
    season: "2026 Season",
  });

  const [players, setPlayers] = useLocalStorage(
    "teamhub-players",
    [
      {
        id: 1,
        name: "Brian Otieno",
        position: "ST",
        appearances: 8,
        goals: 6,
        assists: 2,
      },
      {
        id: 2,
        name: "Kevin Mwangi",
        position: "CM",
        appearances: 7,
        goals: 2,
        assists: 5,
      },
      {
        id: 3,
        name: "David Kamau",
        position: "CB",
        appearances: 9,
        goals: 0,
        assists: 1,
      },
    ]
  );


  const [matches, setMatches] = useLocalStorage(
    "teamhub-matches",
    [
      {
        id: 1,
        opponent: "Kahawa United",
        date: "2026-08-21",
        venue: "Kahawa Grounds",
        status: "Upcoming",
        result: null,
      },
      {
        id: 2,
        opponent: "Westlands FC",
        date: "2026-08-10",
        venue: "Home Ground",
        status: "Completed",
        result: "Won",
      },
    ]
  );

  const [darkMode, setDarkMode] = useLocalStorage(
    "teamhub-dark-mode",
    false
  );

  const addPlayer = (player) => {
    setPlayers((currentPlayers) => [
      ...currentPlayers,
      {
        ...player,
        id: Date.now(),
      },
    ]);
  };

  const deletePlayer = (playerId) => {
    setPlayers((currentPlayers) =>
      currentPlayers.filter((player) => player.id !== playerId)
    );
  };


  const addMatch = (match) => {
    setMatches((currentMatches) => [
      ...currentMatches,
      {
        ...match,
        id: Date.now(),
      },
    ]);
  };

  const deleteMatch = (matchId) => {
    setMatches((currentMatches) =>
      currentMatches.filter((match) => match.id !== matchId)
    );
  };

  const updateTeam = (updates) => {
    setTeam((currentTeam) => ({
      ...currentTeam,
      ...updates,
    }));
  };

  const updateTeamName = (name) => {
    setTeam((currentTeam) => ({
      ...currentTeam,
      name,
    }));
  };


  const toggleDarkMode = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  return (
    <TeamContext.Provider
      value={{
        // Team
        team,
        setTeam,
        updateTeam,
        updateTeamName,

        // Players
        players,
        addPlayer,
        deletePlayer,

        // Matches
        matches,
        addMatch,
        deleteMatch,

        // Dark mode
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}