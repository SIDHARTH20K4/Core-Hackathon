// components/game/Achievements.tsx
"use client";

const MOCK_ACHIEVEMENTS = [
  { id: "first_win", name: "First Win", description: "Win your first color trading game", unlocked: true },
  { id: "streak_3", name: "Hot Streak", description: "Win 3 games in a row", unlocked: true },
  { id: "games_10", name: "Dedicated Trader", description: "Play 10 color trading games", unlocked: false },
  { id: "perfect_game", name: "Perfect Game", description: "Win all 4 intervals in a single game", unlocked: false },
];

export function Achievements() {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Achievements</h3>
      <div className="space-y-2">
        {MOCK_ACHIEVEMENTS.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`p-2 rounded ${achievement.unlocked ? 'bg-indigo-900/50' : 'bg-gray-700'}`}
          >
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${achievement.unlocked ? 'bg-indigo-500' : 'bg-gray-600'}`} />
              <div className="font-medium">{achievement.name}</div>
            </div>
            <div className="text-xs text-gray-400 mt-1">{achievement.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
