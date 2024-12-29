import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Player } from '../types';
import { useGame } from '../context/GameContext';

interface GameSetupProps {
  onNavigateToTimer: () => void;
}

export default function GameSetup({ onNavigateToTimer }: GameSetupProps) {
  const { 
    players, 
    setPlayers, 
    buyIn, 
    setBuyIn, 
    initialChips, 
    setInitialChips, 
    setGameStarted 
  } = useGame();
  
  const [newPlayerName, setNewPlayerName] = useState('');

  const addPlayer = () => {
    if (!newPlayerName.trim()) return;
    
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: newPlayerName.trim(),
      buyIn,
      initialChips,
      finalChips: 0,
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName('');
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
      onNavigateToTimer();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Game Setup</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Buy-in Amount (€)</label>
            <input
              type="number"
              value={buyIn}
              onChange={(e) => setBuyIn(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Initial Chips</label>
            <input
              type="number"
              value={initialChips}
              onChange={(e) => setInitialChips(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Player name"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={addPlayer}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Player
          </button>
        </div>

        <div className="space-y-2">
          {players.map((player) => (
            <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span>{player.name}</span>
              <button
                onClick={() => removePlayer(player.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={handleStartGame}
          disabled={players.length < 2}
          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
        >
          Start Game ({players.length} players)
        </button>
      </div>
    </div>
  );
}