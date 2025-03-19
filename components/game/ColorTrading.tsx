// components/game/ColorTradingGame.tsx
"use client";

import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";

const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

export function ColorTradingGame() {
  const address = useAddress();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "finished">("waiting");
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [winningColor, setWinningColor] = useState<string | null>(null);

  const startGame = () => {
    setGameState("playing");
    setTimeLeft(60);
    setCurrentInterval(1);
    setSelectedColor(null);
    setWinningColor(null);
  };

  useEffect(() => {
    if (gameState !== "playing") return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("finished");
          return 0;
        }
        
        // Every 15 seconds, determine winning color
        if (prev % 15 === 0 && prev !== 60) {
          const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
          setWinningColor(randomColor);
          setCurrentInterval(prev => prev + 1);
        }
        
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameState]);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Color Trading Game</h2>
        <div className="text-sm">
          {gameState === "playing" && `Time: ${timeLeft}s | Interval: ${currentInterval}/4`}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {COLORS.map((color) => (
          <div
            key={color}
            className={`h-24 rounded-lg cursor-pointer flex items-center justify-center
              ${selectedColor === color ? "ring-4 ring-white" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => gameState === "playing" && setSelectedColor(color)}
          >
            {winningColor === color && gameState === "playing" && (
              <div className="bg-white bg-opacity-30 p-2 rounded-full">
                Winner!
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        {gameState === "waiting" && (
          <Button 
            onClick={startGame}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Start Game
          </Button>
        )}
        
        {gameState === "finished" && (
          <div className="text-center">
            <p className="mb-2">
              {selectedColor === winningColor 
                ? "Congratulations! You won!" 
                : "Better luck next time!"}
            </p>
            <Button 
              onClick={startGame}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
