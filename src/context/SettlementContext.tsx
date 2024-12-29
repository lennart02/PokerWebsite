import React, { createContext, useContext, useState } from 'react';
import { Settlement } from '../types';

interface SettlementContextType {
  settlements: Settlement[];
  setSettlements: (settlements: Settlement[]) => void;
}

const SettlementContext = createContext<SettlementContextType | undefined>(undefined);

export function SettlementProvider({ children }: { children: React.ReactNode }) {
  const [settlements, setSettlements] = useState<Settlement[]>([]);

  return (
    <SettlementContext.Provider
      value={{
        settlements,
        setSettlements,
      }}
    >
      {children}
    </SettlementContext.Provider>
  );
}

export function useSettlement() {
  const context = useContext(SettlementContext);
  if (context === undefined) {
    throw new Error('useSettlement must be used within a SettlementProvider');
  }
  return context;
}