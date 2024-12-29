import { BlindLevel } from '../types';

export function generateDefaultBlinds(initialChips: number): BlindLevel[] {
  // Start with 0,5% of initial chips as small blind, rounded to the nearest 5
  const initialSmallBlind = Math.max(Math.round(initialChips * 0.005 / 5) * 5, 5);

  return [
    { smallBlind: initialSmallBlind, bigBlind: initialSmallBlind * 2, duration: 15 },
    { smallBlind: initialSmallBlind * 2, bigBlind: initialSmallBlind * 4, duration: 15 },
    { smallBlind: initialSmallBlind * 3, bigBlind: initialSmallBlind * 6, duration: 15 },
    { smallBlind: initialSmallBlind * 4, bigBlind: initialSmallBlind * 8, duration: 15 },
    { smallBlind: initialSmallBlind * 6, bigBlind: initialSmallBlind * 12, duration: 15 },
    { smallBlind: initialSmallBlind * 8, bigBlind: initialSmallBlind * 16, duration: 15 },
    { smallBlind: initialSmallBlind * 10, bigBlind: initialSmallBlind * 20, duration: 15 },
    { smallBlind: initialSmallBlind * 12, bigBlind: initialSmallBlind * 24, duration: 15 },
    { smallBlind: initialSmallBlind * 15, bigBlind: initialSmallBlind * 30, duration: 15 },
    { smallBlind: initialSmallBlind * 20, bigBlind: initialSmallBlind * 40, duration: 15 },
  ];
}
