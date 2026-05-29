import React from 'react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-200 dark:border-slate-800">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Regras do Jogo</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors bg-slate-100/50 hover:bg-slate-100/80 dark:bg-slate-800/50 dark:hover:bg-slate-800 rounded-full p-2"
              title="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              O objetivo é adivinhar um <strong>código secreto de 4 dígitos</strong> gerado aleatoriamente.
            </p>
            
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Não há dígitos repetidos:</strong> Os 4 números do código são todos únicos.</li>
              <li>Você tem um total de <strong>10 tentativas</strong>.</li>
            </ul>

            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 pt-2 border-t border-slate-100 dark:border-slate-800/50">
              Pistas recebidas:
            </h3>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="font-bold text-green-600 dark:text-green-500 mr-2 min-w-[85px] shrink-0 whitespace-nowrap">🎯 Tiro:</span>
                <span>Um dígito do seu palpite está correto e na mesma posição que o código secreto.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-yellow-600 dark:text-yellow-500 mr-2 min-w-[85px] shrink-0 whitespace-nowrap">🔀 Queda:</span>
                <span>Um dígito do seu palpite existe no código secreto, mas está na posição errada.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-500 dark:text-blue-400 mr-2 min-w-[85px] shrink-0 whitespace-nowrap">💧 Água:</span>
                <span>Nenhum dos dígitos do seu palpite existe no código secreto.</span>
              </li>
            </ul>
          </div>
          
          <button
             onClick={onClose}
             className="w-full bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-bold py-3 pt-4 pb-4 rounded-xl shadow-md transform transition-transform active:scale-95 text-base"
          >
             Entendi!
          </button>
        </div>
      </div>
    </div>
  );
};
