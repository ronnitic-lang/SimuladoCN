
import React, { useState } from 'react';
import { SKILLS, GET_PREREQUISITES_RECURSIVE } from '../constants';

const FlowchartView: React.FC = () => {
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const yearColors: Record<number, string> = {
    1: 'bg-rose-50 border-rose-200 text-rose-700',
    2: 'bg-orange-50 border-orange-200 text-orange-700',
    3: 'bg-amber-50 border-amber-200 text-amber-700',
    4: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    5: 'bg-teal-50 border-teal-200 text-teal-700',
    6: 'bg-blue-50 border-blue-200 text-blue-700',
    7: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    8: 'bg-violet-50 border-violet-200 text-violet-700',
    9: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700',
  };

  const getHighlightClass = (code: string) => {
    if (!activeSkill) return '';
    if (activeSkill === code) return 'ring-4 ring-blue-500 scale-105 z-20 shadow-xl';
    const related = GET_PREREQUISITES_RECURSIVE(activeSkill);
    if (related.includes(code)) return 'ring-2 ring-amber-400 opacity-100 z-10';
    return 'opacity-30 blur-[1px]';
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Percurso Pedagógico das Ciências (BNCC)</h3>
          <p className="text-slate-500 max-w-2xl">
            Clique em uma habilidade para visualizar seu percurso histórico e pré-requisitos pedagógicos desde o 1º ano.
          </p>
        </div>
        {activeSkill && (
          <button 
            onClick={() => setActiveSkill(null)}
            className="text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Limpar Filtro
          </button>
        )}
      </div>
      
      <div className="flex gap-8 min-w-[2800px] pb-10 relative">
        {years.map(year => (
          <div key={year} className="flex-1 flex flex-col gap-6 relative z-10">
            <div className={`text-center font-black text-lg py-4 rounded-xl sticky top-0 shadow-sm border ${yearColors[year]}`}>
              {year}º ANO
            </div>
            
            <div className="space-y-4">
              {SKILLS.filter(s => s.year === year).map(skill => (
                <div 
                  key={skill.code}
                  onClick={() => setActiveSkill(skill.code === activeSkill ? null : skill.code)}
                  className={`p-4 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group relative ${getHighlightClass(skill.code)}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{skill.code}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-700 leading-tight">
                    {skill.name}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                    {skill.description}
                  </div>

                  {/* Visual connections for the active path */}
                  {activeSkill === skill.code && skill.preRequisites?.map((pre, i) => (
                    <div 
                      key={pre}
                      className="absolute left-[-32px] top-1/2 w-[32px] h-0.5 bg-blue-500 pointer-events-none"
                    >
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-wrap gap-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-md ring-4 ring-blue-500 bg-white"></div>
          <span className="text-slate-700 font-bold">Habilidade Selecionada</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-md ring-2 ring-amber-400 bg-white"></div>
          <span className="text-slate-700 font-bold">Pré-requisito Pedagógico</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-0.5 bg-blue-500"></div>
          <span className="text-slate-500">Conexão Direta</span>
        </div>
      </div>
    </div>
  );
};

export default FlowchartView;
