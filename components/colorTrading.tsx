"use client"
import React, { useState, useEffect } from 'react';

const ColorTradingGame = () => {
  const [account, setAccount] = useState({
    userId: "0x3a2DeF83C82D3EEa729EF62D\]][[732f18Ac61F2a05C",
    balance: 100000,
    walletAddress: "0x3a2DeF83C82D3EEa729EF62D732f18Ac61F2a05C",
  });
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isFrozen, setIsFrozen] = useState(false);
  const [finalAmount, setFinalAmount] = useState(0);
  const [currentColor, setCurrentColor] = useState("#FF0000");
  const [nextColor, setNextColor] = useState("#00FF00");
  const [bet, setBet] = useState(1000);
  const [betDirection, setBetDirection] = useState("up");
  const [gameHistory, setGameHistory] = useState([]);
  const [colorHistory, setColorHistory] = useState([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showDemoSection, setShowDemoSection] = useState(false);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getColorValue = (color) => {
    return parseInt(color.replace('#', ''), 16);
  };

  const startGame = () => {
    if (!isDemoMode && account.balance < bet) {
      alert("Insufficient balance for this bet!");
      return;
    }
    
    setGameActive(true);
    setIsFrozen(false);
    setTimeLeft(60);
    setCurrentColor(generateRandomColor());
    setNextColor(generateRandomColor());
    setColorHistory([]);
    
    if (!isDemoMode) {
      setAccount(prev => ({
        ...prev,
        balance: prev.balance - bet
      }));
    }
  };

  const placeBet = (direction) => {
    if (!gameActive || isFrozen) return;
    
    setBetDirection(direction);
    
    setColorHistory(prev => [...prev, {
      current: currentColor,
      next: nextColor,
       bet: bet,
      direction: direction
    }]);
    
    setCurrentColor(nextColor);
    setNextColor(generateRandomColor());
  };

  const freezeGame = () => {
    if (isFrozen) return;
    setIsFrozen(true);
    
    const currentValue = getColorValue(currentColor);
    const nextValue = getColorValue(nextColor);
    
    let winnings = 0;
    if ((betDirection === "up" && nextValue > currentValue) || 
        (betDirection === "down" && nextValue < currentValue)) {
      winnings = bet * 1.8;
    }
    
    setFinalAmount(winnings);
    
    setGameHistory(prev => [...prev, {
      startColor: colorHistory[0]?.current || currentColor,
      endColor: nextColor,
      betAmount: bet,
      winnings: winnings,
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    if (!isDemoMode && winnings > 0) {
      setAccount(prev => ({
        ...prev,
        balance: prev.balance + winnings
      }));
    }
  };

  const endGame = () => {
    setGameActive(false);
    setTimeLeft(60);
    setIsFrozen(false);
    setIsDemoMode(false);
  };

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0 && !isFrozen) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        
        if (timeLeft % 5 === 0) {
          setCurrentColor(nextColor);
          setNextColor(generateRandomColor());
        }
        
        if (timeLeft === 15) {
          freezeGame();
        }
        
        if (timeLeft === 1) {
          endGame();
        }
      }, 1000);
    }
    
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft, isFrozen]);

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Color Trading Arena</h1>
        <p className="text-xl text-gray-200 mb-6">Trade, predict, and win with our revolutionary color-based trading platform</p>
        <div className="flex justify-center gap-4">
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
            onClick={() => window.scrollTo({top: document.getElementById('trading-game').offsetTop, behavior: 'smooth'})}
          >
            Start Trading
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
            onClick={() => {
              setShowDemoSection(true);
              setIsDemoMode(true);
              window.scrollTo({top: document.getElementById('demo-section').offsetTop, behavior: 'smooth'});
            }}
          >
            Try Demo
          </button>
        </div>
      </div>

      {/* Demo Section */}
      <div id="demo-section" className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">Try it Yourself!</h2>
          <p className="text-gray-300">Experience the thrill of color trading with our interactive demo below</p>
        </div>
        
        {showDemoSection ? (
          <div className="bg-gray-700 p-6 rounded-lg">
            {!gameActive ? (
              <div className="text-center">
                <p className="text-xl text-white mb-4">Ready to start your color trading journey? No registration required!</p>
                <button 
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
                  onClick={() => {
                    setIsDemoMode(true);
                    startGame();
                  }}
                >
                  Launch Demo Game
                </button>
              </div>
            ) : (
              <div className="text-white">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Demo Mode Active</h3>
                  <p className="text-2xl font-bold text-yellow-400">Time Left: {timeLeft}s</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">Current Color</h3>
                    <div 
                      className="w-full h-40 rounded-lg flex items-center justify-center mb-2 transition-all duration-500"
                      style={{ backgroundColor: currentColor }}
                    >
                      <span style={{ color: getContrastColor(currentColor) }} className="text-xl font-mono">{currentColor}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg mb-2">Next Color</h3>
                    <div 
                      className="w-full h-40 rounded-lg flex items-center justify-center mb-2 transition-all duration-500"
                      style={{ backgroundColor: nextColor }}
                    >
                      <span style={{ color: getContrastColor(nextColor) }} className="text-xl font-mono">{nextColor}</span>
                    </div>
                  </div>
                </div>
                
                {!isFrozen ? (
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex-1 flex items-center justify-center"
                      onClick={() => placeBet("up")}
                    >
                      <span className="mr-2">Bet UP</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold flex-1 flex items-center justify-center"
                      onClick={() => placeBet("down")}
                    >
                      <span className="mr-2">Bet DOWN</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-xl text-yellow-400 mb-2">Game Frozen - Calculating Results</p>
                    {finalAmount > 0 ? (
                      <p className="text-2xl text-green-400 font-bold">You won {finalAmount.toLocaleString()} CORE!</p>
                    ) : (
                      <p className="text-2xl text-red-400 font-bold">Better luck next time!</p>
                    )}
                  </div>
                )}
                
                <div className="flex justify-center mt-4">
                  {isFrozen ? (
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                      onClick={() => {
                        endGame();
                        setIsDemoMode(true);
                        startGame();
                      }}
                    >
                      Play Again
                    </button>
                  ) : (
                    <button 
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
                      onClick={freezeGame}
                    >
                      Freeze Game
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <button 
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-lg"
              onClick={() => {
                setShowDemoSection(true);
                setIsDemoMode(true);
              }}
            >
              Try Demo Now
            </button>
          </div>
        )}
      </div>

      {/* Main Game Section */}
      <div id="trading-game" className="bg-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold p-4 border-b border-gray-700">Color Trading Arena</h1>
        
        <div className="p-4 bg-gray-700 rounded-lg m-4">
          <h2 className="text-xl mb-2">User Account</h2>
          <p>ID: {account.userId.substring(0, 8)}...{account.userId.substring(36)}</p>
          <p>Balance: {account.balance.toLocaleString()} CORE</p>
        </div>
        
        <div className="p-4 bg-gray-700 rounded-lg m-4">
          <h2 className="text-xl mb-2">Game Controls</h2>
          
          {!gameActive ? (
            <div>
              <div className="flex items-center mb-4">
                <label className="mr-2">Bet Amount:</label>
                <input 
                  type="number" 
                  className="bg-gray-600 text-white p-2 rounded w-32"
                  value={bet}
                  onChange={(e) => setBet(Math.max(100, parseInt(e.target.value) || 0))}
                  min="100"
                />
              </div>
              <button 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                onClick={startGame}
              >
                Start Game
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsDemoMode(true);
                  startGame();
                }}
              >
                Try Demo
              </button>
            </div>
          ) : (
            <div>
              <p className="text-2xl mb-2">Time Left: {timeLeft}s</p>
              {isFrozen ? (
                <p className="text-yellow-400">Game Frozen - Finalizing Results</p>
              ) : (
                <p className="text-green-400">Game Active - Place Your Bets!</p>
              )}
              
              {!isFrozen && (
                <button 
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded mt-2"
                  onClick={freezeGame}
                >
                  Freeze
                </button>
              )}
              
              {timeLeft === 0 && (
                <div className="mt-4">
                  <h3 className="text-xl">Game Results</h3>
                  <p>Final Amount: {finalAmount.toLocaleString()} CORE</p>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
                    onClick={() => {
                      endGame();
                      setIsDemoMode(false);
                    }}
                  >
                    New Game
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {gameActive && (
          <div className="p-4 bg-gray-700 rounded-lg m-4">
            <h2 className="text-xl mb-2">Color Trading Arena</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <h3>Current Color</h3>
                <div 
                  className="w-full h-32 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: currentColor }}
                >
                  <span style={{ color: getContrastColor(currentColor) }}>{currentColor}</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h3>Next Color</h3>
                <div 
                  className="w-full h-32 rounded-lg flex items-center justify-center mb-2"
                  style={{ backgroundColor: nextColor }}
                >
                  <span style={{ color: getContrastColor(nextColor) }}>{nextColor}</span>
                </div>
              </div>
            </div>
            
            {!isFrozen && (
              <div className="flex gap-2">
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex-1"
                  onClick={() => placeBet("up")}
                >
                  Bet UP ↑
                </button>
                <button 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex-1"
                  onClick={() => placeBet("down")}
                >
                  Bet DOWN ↓
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="p-4 bg-gray-700 rounded-lg m-4">
          <h2 className="text-xl mb-2">Trading History</h2>
          
          {gameHistory.length === 0 ? (
            <p>No trading history yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Start Color</th>
                    <th className="text-left p-2">End Color</th>
                    <th className="text-right p-2">Bet</th>
                    <th className="text-right p-2">Winnings</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory.map((game, index) => (
                    <tr key={index} className="border-b border-gray-600">
                      <td className="p-2">{game.timestamp}</td>
                      <td className="p-2">
                        <div className="w-6 h-6 rounded-full inline-block mr-2" style={{ backgroundColor: game.startColor }}></div>
                        {game.startColor}
                      </td>
                      <td className="p-2">
                        <div className="w-6 h-6 rounded-full inline-block mr-2" style={{ backgroundColor: game.endColor }}></div>
                        {game.endColor}
                      </td>
                      <td className="p-2 text-right">{game.betAmount.toLocaleString()}</td>
                      <td className="p-2 text-right">
                        <span className={game.winnings > 0 ? "text-green-400" : "text-red-400"}>
                          {game.winnings.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorTradingGame;