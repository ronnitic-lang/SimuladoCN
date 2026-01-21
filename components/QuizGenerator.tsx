
import React, { useState } from 'react';
import { Difficulty, SimulationConfig } from '../types';

interface Props {
  selectedCodes: string[];
  onGenerate: (config: SimulationConfig) => void;
  loading: boolean;
}

const QuizGenerator: React.FC<Props> = ({ selectedCodes, onGenerate, loading }) => {
  // Explicitly type the state to Record<Difficulty, number> to help TS inference
  const [counts, setCounts] = useState<Record<Difficulty, number>>({
    [Difficulty.EASY]: 2,
    [Difficulty.MEDIUM]: 3,
    [Difficulty.HARD]: 1
  });

  const handleCountChange = (diff: Difficulty, val: number) => {
    setCounts(prev => ({ ...prev, [diff]: val }));
  };

  // Cast Object.values to number[] to fix addition operator error on unknown types
  const total = (Object.values(counts) as number[]).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-end">
      <div className="flex-1 grid grid-cols-3 gap-4 w-full">
        {Object.values(Difficulty).map(diff => (
          <div key={diff} className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">{diff}</label>
            <input 
              type="number" 
              min="0"
              max="10"
              value={counts[diff]}
              onChange={(e) => handleCountChange(diff, parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
          </div>
        ))}
      </div>
      
      <button
        disabled={loading || selectedCodes.length === 0 || total === 0}
        onClick={() => onGenerate({ selectedSkillCodes: selectedCodes, counts })}
        className={`w-full md:w-auto px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
          loading || selectedCodes.length === 0 || total === 0
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
        }`}
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Gerando...
          </div>
        ) : 'Gerar Simulado'}
      </button>
    </div>
  );
};

export default QuizGenerator;
