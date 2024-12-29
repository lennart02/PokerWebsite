import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { useSettlement } from '../context/SettlementContext';
import { calculateSettlements } from '../utils/calculations';

export default function SettlementsView() {
  const { players, setPlayers, initialChips } = useGame();
  const { settlements, setSettlements } = useSettlement();
  const [chipInputs, setChipInputs] = useState(
    players.reduce((acc, player) => {
      acc[player.id] = initialChips ?? player.finalChips;
      return acc;
    }, {})
  );

  useEffect(() => {
    const newSettlements = calculateSettlements(players);
    console.log(players, newSettlements);
    setSettlements(newSettlements);
  }, [players, setSettlements]);

  const handleChipChange = (id, value) => {
      setChipInputs({
        ...chipInputs,
        [id]: value,
      });
    };

  const handleSaveChips = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        finalChips: Number(chipInputs[player.id]) || player.finalChips,
      }))
    );
  };


  const getPlayerName = (id) => players.find((p) => p.id === id)?.name || '';

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settlements</h2>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Final Chips</h3>
        {players.map((player) => (
          <div key={player.id} className="flex items-center justify-between mb-3">
            <label className="text-gray-700">
              {getPlayerName(player.id)}:
            </label>
            <input
              type="number"
              placeholder={initialChips}
              className="border rounded-md p-2 w-24 text-right"
              value={chipInputs[player.id] || ''}
              onChange={(e) => handleChipChange(player.id, e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={handleSaveChips}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Final Chips
        </button>
      </div>

      <div className="space-y-4">
        {settlements.map((settlement, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-red-600">{getPlayerName(settlement.from)}</span>
              <span className="text-gray-500 mx-2">pays</span>
              <span className="text-green-600">{getPlayerName(settlement.to)}</span>
            </div>
            <div className="text-center mt-2 text-xl font-semibold">
              ${settlement.amount.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
