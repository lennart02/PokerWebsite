import React, { createContext, useContext, useState } from 'react';
import { Player, BlindLevel } from '../types';

interface GameContextType {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  buyIn: number;
  setBuyIn: (amount: number) => void;
  initialChips: number;
  setInitialChips: (chips: number) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [buyIn, setBuyIn] = useState(0);
  const [initialChips, setInitialChips] = useState(1000);
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        buyIn,
        setBuyIn,
        initialChips,
        setInitialChips,
        gameStarted,
        setGameStarted,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}