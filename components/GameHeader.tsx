
import React from 'react';

interface GameHeaderProps {
  secretNumber: string;
  isRevealed: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ secretNumber, isRevealed }) => {
  return (
    <div className="text-center space-y-4">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
          Tiro e <span className="text-blue-600 dark:text-blue-400">Queda</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">Desvende o código secreto de 4 dígitos</p>
      </div>

      <div className="flex justify-center gap-2">
        {(isRevealed ? secretNumber : "****").split('').map((char, i) => (
          <div
            key={i}
            className={`w-14 h-16 rounded-xl flex items-center justify-center text-3xl font-black shadow-inner transition-all duration-500 ${
              isRevealed 
                ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600'
            }`}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};
