
import React from 'react';
import { SKILLS } from '../constants';

const FlowchartView: React.FC = () => {
  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  // Define some color themes for years
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

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
      <h3 className="text-2xl font-bold text-slate-800 mb-2">Percurso Pedagógico das Ciências</h3>
      <p className="text-slate-500 mb-10">Relação de dependência e evolução das habilidades (1º ao 9º Ano)</p>
      
      <div className="flex gap-12 min-w-[2000px] pb-10 relative">
        {years.map(year => (
          <div key={year} className="flex-1 flex flex-col gap-6 relative z-10">
            <div className={`text-center font-black text-lg py-3 rounded-xl sticky top-0 shadow-sm border ${yearColors[year]}`}>
              {year}º ANO
            </div>
            
            <div className="space-y-4">
              {SKILLS.filter(s => s.year === year).map(skill => (
                <div 
                  key={skill.code}
                  className={`p-3 rounded-lg border bg-white shadow-sm hover:shadow-md transition-all group relative`}
                  title={skill.description}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{skill.code}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-700 leading-tight">
                    {skill.name}
                  </div>

                  {/* Visual indicators for connections */}
                  {skill.preRequisites && skill.preRequisites.length > 0 && (
                    <div className="absolute left-[-48px] top-1/2 w-[48px] h-0.5 bg-slate-200 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Background lines could be added here for a more "flowchart" feel */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
              </marker>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="mt-8 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-400"></div>
          <span className="text-slate-500">Habilidade Dependente</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-slate-200"></div>
          <span className="text-slate-500">Conexão Pedagógica</span>
        </div>
      </div>
    </div>
  );
};

export default FlowchartView;
