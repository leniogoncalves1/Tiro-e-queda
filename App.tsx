
import React, { useState, useEffect, useCallback } from 'react';
import { Attempt, GameState } from './types';
import { generateSecretNumber, calculateResult, validateGuess } from './logic/gameEngine';
import { HistoryTable } from './components/HistoryTable';
import { GameHeader } from './components/GameHeader';

const INITIAL_SCORE = 1000;
const MAX_ATTEMPTS = 10;
const SCORE_PENALTY = 100;

const App: React.FC = () => {
  const [secretNumber, setSecretNumber] = useState('');
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(INITIAL_SCORE);
  const [error, setError] = useState<string | null>(null);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const startNewGame = useCallback(() => {
    setSecretNumber(generateSecretNumber());
    setAttempts([]);
    setCurrentGuess('');
    setGameState('playing');
    setScore(INITIAL_SCORE);
    setError(null);
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== 'playing') return;

    const validationError = validateGuess(currentGuess, attempts.map(a => a.guess));
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const result = calculateResult(currentGuess, secretNumber);
    const newAttempt: Attempt = {
      guess: currentGuess,
      tiros: result.tiros,
      quedas: result.quedas,
      resultLabel: result.resultLabel,
      timestamp: Date.now()
    };

    const newAttempts = [newAttempt, ...attempts];
    setAttempts(newAttempts);
    setCurrentGuess('');

    if (result.tiros === 4) {
      setGameState('won');
    } else {
      const newScore = Math.max(0, score - SCORE_PENALTY);
      setScore(newScore);
      
      if (newAttempts.length >= MAX_ATTEMPTS) {
        setGameState('lost');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 flex flex-col items-center transition-colors duration-300">
      <div className="max-w-md w-full flex-grow space-y-6 relative">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute -top-4 -right-2 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all border border-slate-100 dark:border-slate-700 active:scale-95 z-10"
          title={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <div className="space-y-4">
          <GameHeader 
            secretNumber={secretNumber} 
            isRevealed={gameState !== 'playing'} 
          />
          
          {gameState !== 'playing' && (
            <div className={`text-center p-4 rounded-xl animate-in fade-in slide-in-from-top-2 duration-500 shadow-sm ${
              gameState === 'won' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800/50' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800/50'
            }`}>
              <h2 className="text-xl font-bold uppercase tracking-wide">
                {gameState === 'won' ? '✨ Parabéns! ✨' : 'Game Over!'}
              </h2>
              <p className="text-sm font-medium opacity-90">
                {gameState === 'won' 
                  ? `Você descobriu o código com ${score} pontos!` 
                  : 'Suas tentativas acabaram. O código foi revelado acima.'}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 space-y-6 transition-colors duration-300 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center px-2">
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Pontuação</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">Restantes</p>
              <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{MAX_ATTEMPTS - attempts.length}</p>
            </div>
          </div>

          <form onSubmit={handleGuessSubmit} className="space-y-4">
            {gameState === 'playing' ? (
              <div className="space-y-2">
                <label htmlFor="guess" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Seu Palpite (4 dígitos únicos)
                </label>
                <input
                  id="guess"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  maxLength={4}
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value.replace(/\D/g, ''))}
                  placeholder="Ex: 1234"
                  className={`w-full text-center text-3xl tracking-[1rem] font-bold py-3 border-2 rounded-xl focus:ring-4 focus:outline-none transition-all bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 ${
                    error 
                      ? 'border-red-300 dark:border-red-900 focus:ring-red-100 dark:focus:ring-red-900/20' 
                      : 'border-slate-200 dark:border-slate-700 focus:ring-blue-100 dark:focus:ring-blue-900/20 focus:border-blue-500 dark:focus:border-blue-400'
                  }`}
                />
                {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>}
                
                <button
                  type="submit"
                  disabled={currentGuess.length !== 4}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition-transform active:scale-95 text-lg"
                >
                  Confirmar Jogada
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={startNewGame}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transform transition-transform active:scale-95 animate-in zoom-in-95 duration-300 ${
                  gameState === 'won' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Jogar Novamente
              </button>
            )}
          </form>

          <HistoryTable attempts={attempts} />
          
          {gameState === 'playing' && (
            <button
              onClick={startNewGame}
              className="w-full text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-medium py-2 flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reiniciar agora
            </button>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-slate-400 dark:text-slate-500 text-sm font-medium pb-4">
        Desenvolvido por <span className="text-slate-600 dark:text-slate-300 font-bold tracking-tight">Lenio Gonçalves</span>
      </footer>
    </div>
  );
};

export default App;
