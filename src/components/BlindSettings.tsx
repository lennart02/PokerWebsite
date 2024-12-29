import React, { useState } from 'react';
import { BlindLevel } from '../types';
import { Plus, Minus } from 'lucide-react';

interface BlindSettingsProps {
  blindLevels: BlindLevel[];
  onUpdate: (levels: BlindLevel[]) => void;
  onCancel: () => void;
}

export default function BlindSettings({ blindLevels, onUpdate, onCancel }: BlindSettingsProps) {
  const [levels, setLevels] = useState<BlindLevel[]>(blindLevels);

  const addLevel = () => {
    const lastLevel = levels[levels.length - 1];
    const newLevel = {
      smallBlind: lastLevel.smallBlind * 2,
      bigBlind: lastLevel.bigBlind * 2,
      duration: lastLevel.duration,
    };
    setLevels([...levels, newLevel]);
  };

  const removeLevel = (index: number) => {
    if (levels.length > 1) {
      setLevels(levels.filter((_, i) => i !== index));
    }
  };

  const updateLevel = (index: number, field: keyof BlindLevel, value: number) => {
    const newLevels = [...levels];
    newLevels[index] = { ...newLevels[index], [field]: value };
    if (field === 'smallBlind') {
      newLevels[index].bigBlind = value * 2;
    }
    setLevels(newLevels);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Blind Settings</h3>
      
      <div className="space-y-2">
        {levels.map((level, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="number"
              value={level.smallBlind}
              onChange={(e) => updateLevel(index, 'smallBlind', Number(e.target.value))}
              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
            />
            <span>/</span>
            <input
              type="number"
              value={level.bigBlind}
              className="w-20 rounded-md border-gray-300 shadow-sm bg-gray-50"
              disabled
            />
            <input
              type="number"
              value={level.duration}
              onChange={(e) => updateLevel(index, 'duration', Number(e.target.value))}
              className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              min="1"
            />
            <span className="text-sm text-gray-500">min</span>
            <button
              onClick={() => removeLevel(index)}
              className="text-red-600 hover:text-red-800"
              disabled={levels.length === 1}
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={addLevel}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Level
        </button>
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => onUpdate(levels)}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}