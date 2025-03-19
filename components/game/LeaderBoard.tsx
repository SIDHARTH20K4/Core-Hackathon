// components/game/Leaderboard.tsx
"use client";

const MOCK_LEADERBOARD = [
  { rank: 1, address: "0x1a2b...3c4d", name: "ColorMaster", wins: 42, games: 50 },
  { rank: 2, address: "0x5e6f...7g8h", name: "LuckyTrader", wins: 38, games: 48 },
  { rank: 3, address: "0x9i0j...1k2l", name: "RainbowHunter", wins: 36, games: 47 },
  { rank: 4, address: "0x3m4n...5o6p", name: "PixelPicker", wins: 30, games: 45 },
];

export function Leaderboard() {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Leaderboard</h3>
      <div className="space-y-2">
        {MOCK_LEADERBOARD.map((player) => (
          <div key={player.address} className="flex items-center justify-between p-2 bg-gray-700 rounded">
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center bg-gray-600 rounded-full mr-2">
                {player.rank}
              </div>
              <div>
                <div className="font-medium">{player.name}</div>
                <div className="text-xs text-gray-400">{player.address}</div>
              </div>
            </div>
            <div className="text-sm">
              {player.wins}/{player.games} wins
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
