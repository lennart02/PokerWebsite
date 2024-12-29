import React from 'react';

const POKER_HANDS = [
  {
    name: 'Royal Flush',
    description: 'A, K, Q, J, 10 of the same suit',
    example: '♠A K Q J 10',
    rank: 1,
  },
  {
    name: 'Straight Flush',
    description: 'Five consecutive cards of the same suit',
    example: '♥9 8 7 6 5',
    rank: 2,
  },
  {
    name: 'Four of a Kind',
    description: 'Four cards of the same rank',
    example: '♠K ♣K ♥K ♦K A',
    rank: 3,
  },
  {
    name: 'Full House',
    description: 'Three of a kind plus a pair',
    example: '♠Q ♣Q ♥Q ♠J ♣J',
    rank: 4,
  },
  {
    name: 'Flush',
    description: 'Any five cards of the same suit',
    example: '♥A K 9 6 4',
    rank: 5,
  },
  {
    name: 'Straight',
    description: 'Five consecutive cards of any suit',
    example: '9 8 7 6 5',
    rank: 6,
  },
  {
    name: 'Three of a Kind',
    description: 'Three cards of the same rank',
    example: '♠7 ♣7 ♥7 K 4',
    rank: 7,
  },
  {
    name: 'Two Pair',
    description: 'Two different pairs',
    example: '♠J ♣J ♥8 ♦8 A',
    rank: 8,
  },
  {
    name: 'Pair',
    description: 'Two cards of the same rank',
    example: '♠10 ♣10 A K Q',
    rank: 9,
  },
  {
    name: 'High Card',
    description: 'Highest card plays',
    example: 'A K J 8 4',
    rank: 10,
  },
];

export default function RulesReference() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Poker Hand Rankings</h2>
      <div className="space-y-4">
        {POKER_HANDS.map((hand) => (
          <div
            key={hand.name}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{hand.name}</h3>
              <span className="text-sm text-gray-500">Rank: {hand.rank}</span>
            </div>
            <p className="text-gray-600 mt-1">{hand.description}</p>
            <div className="mt-2 font-mono text-indigo-600">{hand.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}