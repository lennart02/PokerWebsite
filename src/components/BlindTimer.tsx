import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useBlind } from '../context/BlindContext';
import { generateDefaultBlinds } from '../utils/blindCalculations';
import BlindSettings from './BlindSettings';

export default function BlindTimer() {
  const { initialChips } = useGame();
  const {
    blindLevels,
    setBlindLevels,
    currentLevel,
    setCurrentLevel,
    isRunning,
    setIsRunning,
    timeLeft,
    setTimeLeft,
  } = useBlind();
  const [showSettings, setShowSettings] = React.useState(false);

  // Only initialize blinds if they haven't been set yet
  useEffect(() => {
    if (blindLevels.length === 0) {
      const defaultBlinds = generateDefaultBlinds(initialChips);
      setBlindLevels(defaultBlinds);
      setTimeLeft(defaultBlinds[0].duration * 60);
    }
  }, [initialChips, setBlindLevels, setTimeLeft, blindLevels.length]);

  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev: number) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && currentLevel < blindLevels.length - 1) {
      setCurrentLevel((prev) => prev + 1);
      setTimeLeft(blindLevels[currentLevel + 1].duration * 60);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, currentLevel, blindLevels, setTimeLeft, setCurrentLevel]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentLevel(0);
    setTimeLeft(blindLevels[0].duration * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleUpdateBlinds = (newBlinds: BlindLevel[]) => {
    setBlindLevels(newBlinds);
    setCurrentLevel(0);
    setTimeLeft(newBlinds[0].duration * 60);
    setShowSettings(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {showSettings ? (
          <BlindSettings
            blindLevels={blindLevels}
            onUpdate={handleUpdateBlinds}
            onCancel={() => setShowSettings(false)}
          />
        ) : (
          <>
            <div className="text-4xl font-bold text-gray-900">
              {formatTime(timeLeft)}
            </div>
            
            <div className="text-xl font-semibold text-gray-700">
              Blinds: {blindLevels[currentLevel]?.smallBlind}/{blindLevels[currentLevel]?.bigBlind}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={toggleTimer}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={resetTimer}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upcoming Levels</h3>
              <div className="space-y-2">
                {blindLevels.slice(currentLevel + 1, currentLevel + 4).map((level, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded"
                  >
                    <span>{level.smallBlind}/{level.bigBlind}</span>
                    <span>{level.duration} min</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}