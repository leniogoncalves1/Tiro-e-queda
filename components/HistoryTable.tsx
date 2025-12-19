
import React from 'react';
import { Attempt } from '../types';

interface HistoryTableProps {
  attempts: Attempt[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ attempts }) => {
  if (attempts.length === 0) {
    return (
      <div className="h-48 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-600 italic text-sm">
        Nenhuma jogada realizada ainda.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest px-1">Histórico</h3>
      <div className="max-h-60 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {attempts.map((attempt) => (
          <div
            key={attempt.timestamp}
            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 group hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-200 tracking-widest leading-none">
                {attempt.guess}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-bold">Palpite</span>
            </div>
            
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                attempt.resultLabel === 'Água' 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400' 
                  : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
              }`}>
                {attempt.resultLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
