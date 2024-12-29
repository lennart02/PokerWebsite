import React, { createContext, useContext, useState } from 'react';
import { BlindLevel } from '../types';
import { generateDefaultBlinds } from '../utils/blindCalculations';

interface BlindContextType {
  blindLevels: BlindLevel[];
  setBlindLevels: (levels: BlindLevel[]) => void;
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
}

const BlindContext = createContext<BlindContextType | undefined>(undefined);

export function BlindProvider({ children }: { children: React.ReactNode }) {
  const [blindLevels, setBlindLevels] = useState<BlindLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  return (
    <BlindContext.Provider
      value={{
        blindLevels,
        setBlindLevels,
        currentLevel,
        setCurrentLevel,
        isRunning,
        setIsRunning,
        timeLeft,
        setTimeLeft,
      }}
    >
      {children}
    </BlindContext.Provider>
  );
}

export function useBlind() {
  const context = useContext(BlindContext);
  if (context === undefined) {
    throw new Error('useBlind must be used within a BlindProvider');
  }
  return context;
}