// app/dashboard/page.tsx
import { ColorTradingGame } from "@/components/game/ColorTradingGame";
import { Leaderboard } from "@/components/game/Leaderboard";
import { Achievements } from "@/components/game/Achievements";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          ColorFi Trading
        </span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <ColorTradingGame />
        </div>
        <div className="space-y-6">
          <Achievements />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
