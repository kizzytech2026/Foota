import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const TeamContext = createContext();

export function TeamProvider({ children }) {
  const [team, setTeam] = useState({
    name: "TeamHub FC",
    coach: "Team Coach",
    season: "2026 Season",
  });

  const [players, setPlayers] = useLocalStorage("teamhub-players", [
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
  ]);

  const [matches, setMatches] = useLocalStorage("teamhub-matches", [
    {
      id: 1,
      opponent: "Kahawa United",
      date: "2026-08-21",
      time: "15:00",
      venue: "Kahawa Grounds",
      type: "League",
      result: "Upcoming",
      teamScore: null,
      opponentScore: null,
    },
    {
      id: 2,
      opponent: "Westlands FC",
      date: "2026-08-10",
      time: "16:00",
      venue: "Home Ground",
      type: "Friendly",
      result: "Won",
      teamScore: 3,
      opponentScore: 1,
    },
  ]);

  const [darkMode, setDarkMode] = useState(false);

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

  const updateMatchResult = (
    matchId,
    result,
    teamScore,
    opponentScore
  ) => {
    setMatches((currentMatches) =>
      currentMatches.map((match) =>
        match.id === matchId
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

  const updateTeam = (updatedTeam) => {
    setTeam((currentTeam) => ({
      ...currentTeam,
      ...updatedTeam,
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  return (
    <TeamContext.Provider
      value={{
        team,
        setTeam,
        updateTeam,
        players,
        addPlayer,
        deletePlayer,
        matches,
        addMatch,
        deleteMatch,
        updateMatchResult,
        darkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}