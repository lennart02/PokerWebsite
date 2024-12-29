import React, { useState } from 'react';
import Navigation from './components/Navigation';
import GameSetup from './components/GameSetup';
import BlindTimer from './components/BlindTimer';
import RulesReference from './components/RulesReference';
import SettlementsView from './components/SettlementsView';
import { GameProvider } from './context/GameContext';
import { BlindProvider } from './context/BlindContext';
import { SettlementProvider } from './context/SettlementContext';

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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Poker Helper</h1>
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
    <GameProvider>
      <BlindProvider>
        <SettlementProvider>
          <AppContent />
        </SettlementProvider>
      </BlindProvider>
    </GameProvider>
  );
}