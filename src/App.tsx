import React, { useState } from 'react';
import Navigation from './components/Navigation';
import GameSetup from './components/GameSetup';
import BlindTimer from './components/BlindTimer';
import RulesReference from './components/RulesReference';
import SettlementsView from './components/SettlementsView';
import { GameProvider } from './context/GameContext';
import { BlindProvider } from './context/BlindContext';
import { SettlementProvider } from './context/SettlementContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function AppContent() {
  const [activeTab, setActiveTab] = useState('game');

  const handleNavigateToTimer = () => {
    setActiveTab('timer');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'game':
        return <GameSetup onNavigateToTimer={handleNavigateToTimer} />;
      case 'timer':
        return <BlindTimer />;
      case 'rules':
        return <RulesReference />;
      case 'settlements':
        return <SettlementsView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Poker Helper</h1>
          <ThemeToggle />
        </div>
      </header>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <BlindProvider>
          <SettlementProvider>
            <AppContent />
          </SettlementProvider>
        </BlindProvider>
      </GameProvider>
    </ThemeProvider>
  );
}