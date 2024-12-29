import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import { useSettlement } from "../context/SettlementContext";
import { calculateSettlements } from "../utils/calculations";

export default function SettlementsView() {
  const { players, setPlayers } = useGame();
  const { settlements, setSettlements } = useSettlement();
  const [chipInputs, setChipInputs] = useState(
    players.reduce((acc, player) => {
      acc[player.id] = player.initialChips ?? player.finalChips;
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

  const getPlayerName = (id) => players.find((p) => p.id === id)?.name || "";

  return (
    <div className="max-w-2xl mx-auto p-6  text-gray-900 dark:text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Settlements</h2>

      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Update Final Chips</h3>
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between mb-3 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-800 dark:to-gray-800 p-3 rounded-lg"
          >
            <label className="text-gray-700 dark:text-gray-100 font-semibold">
              {getPlayerName(player.id)}:
            </label>
            <input
              type="number"
              placeholder={player.initialChips?.toString()}
              className="border rounded-md p-2 w-24 text-right bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
              value={chipInputs[player.id] || ""}
              onChange={(e) => handleChipChange(player.id, e.target.value)}
            />
          </div>
        ))}
        <button
          onClick={handleSaveChips}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Calculate Debts
        </button>
      </div>

      <div className="space-y-4">
        {settlements.map((settlement, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <span className="text-red-600 dark:text-red-500 font-semibold">
                {getPlayerName(settlement.from)}
              </span>
              <span className="text-gray-500 mx-2 dark:text-gray-100">pays</span>
              <span className="text-green-600 font-semibold">
                {getPlayerName(settlement.to)}
              </span>
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
