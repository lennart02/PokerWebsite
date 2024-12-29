import { Player, Settlement } from '../types';

export const calculateNetChips = (player: Player): number => {
  return player.finalChips - player.initialChips;
};

export const calculateProfit = (player: Player): number => {
  const netChips = calculateNetChips(player);
  // Calculate profit relative to total chips in play
  return (netChips / player.initialChips) * player.buyIn;
};

export const calculateSettlements = (players: Player[]): Settlement[] => {
  const balances = new Map<string, number>();
  
  // Calculate each player's balance
  players.forEach(player => {
    const profit = calculateProfit(player);
    balances.set(player.id, profit);
  });

  const settlements: Settlement[] = [];
  const debtors = Array.from(balances.entries())
    .filter(([_, balance]) => balance < 0)
    .sort((a, b) => a[1] - b[1]); // Most negative first
  const creditors = Array.from(balances.entries())
    .filter(([_, balance]) => balance > 0)
    .sort((a, b) => b[1] - a[1]); // Most positive first

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const [debtorId, debtorBalance] = debtors[i];
    const [creditorId, creditorBalance] = creditors[j];
    
    // Calculate the minimum amount that can be settled
    const amount = Math.min(Math.abs(debtorBalance), creditorBalance);
    
    if (amount > 0) {
      // Create settlement rounded to 2 decimal places
      settlements.push({
        from: debtorId,
        to: creditorId,
        amount: Number(amount.toFixed(2))
      });

      // Update balances
      debtors[i] = [debtorId, debtorBalance + amount];
      creditors[j] = [creditorId, creditorBalance - amount];
    }

    // Move to next player if their balance is settled
    if (Math.abs(debtors[i][1]) < 0.01) i++;
    if (creditors[j][1] < 0.01) j++;
  }

  return settlements;
};
