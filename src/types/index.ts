export interface Player {
  id: string;
  name: string;
  initialChips: number;
  finalChips: number;
  buyIn: number;
}

export interface BlindLevel {
  smallBlind: number;
  bigBlind: number;
  duration: number; // in minutes
}

export interface Settlement {
  from: string;
  to: string;
  amount: number;
}