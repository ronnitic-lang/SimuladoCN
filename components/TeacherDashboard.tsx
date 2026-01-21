
import React, { useState } from 'react';
import { StudentAttempt, Question, Skill } from '../types';
import { SKILLS, GET_PREREQUISITES_RECURSIVE } from '../constants';

interface Props {
  attempts: StudentAttempt[];
  questions: Question[];
}

const TeacherDashboard: React.FC<Props> = ({ attempts, questions }) => {
  const [selectedAttempt, setSelectedAttempt] = useState<StudentAttempt | null>(null);
  const [inspectedQuestion, setInspectedQuestion] = useState<Question | null>(null);

  const getSkill = (code: string) => SKILLS.find(s => s.code === code);

  if (attempts.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Aguardando Simulados</h3>
        <p className="text-slate-400 max-w-sm mx-auto">Nenhum resultado disponível. Quando os alunos concluírem o teste, as estatísticas aparecerão aqui.</p>
      </div>
    );
  }

  const averageScore = Math.round(attempts.reduce((a, b) => a + b.score, 0) / attempts.length);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* List of Students */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit">
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-lg font-bold text-slate-800">Resultados da Turma</h3>
          <div className="text-right">
            <span className="text-3xl font-black text-blue-600 block leading-none">{averageScore}%</span>
            <small className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Média Geral</small>
          </div>
        </div>
        <div className="space-y-2">
          {attempts.map((att, i) => (
            <div 
              key={i}
              onClick={() => setSelectedAttempt(att)}
              className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                selectedAttempt === att ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-700 block">{att.studentName}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-black">{new Date(att.timestamp).toLocaleDateString()}</span>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-black ${
                  att.score >= 70 ? 'bg-emerald-100 text-emerald-700' : 
                  att.score >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {att.score}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis View */}
      <div className="lg:col-span-2 space-y-6">
        {!selectedAttempt ? (
          <div className="h-full flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
               <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            <p className="text-slate-400 font-medium">Selecione um aluno para analisar o desempenho individual e o percurso pedagógico sugerido.</p>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Relatório: {selectedAttempt.studentName}</h3>
              <button 
                onClick={() => setSelectedAttempt(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest"
              >
                Fechar
              </button>
            </div>
            
            <div className="grid gap-4">
              {selectedAttempt.answers.map((ans, idx) => {
                const q = questions.find(q => q.id === ans.questionId)!;
                const skill = getSkill(q.skillCode);
                
                return (
                  <div key={idx} className={`p-6 rounded-2xl border transition-all ${ans.isCorrect ? 'bg-white border-emerald-100' : 'bg-white border-rose-100 shadow-sm'}`}>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            q.difficulty === 'Fácil' ? 'bg-emerald-50 text-emerald-600' :
                            q.difficulty === 'Médio' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                          }`}>{q.difficulty}</span>
                          <span className="text-xs font-black text-blue-600 uppercase">{q.skillCode}</span>
                        </div>
                        <h4 className="text-slate-800 font-semibold leading-relaxed">{q.text}</h4>
                        {skill && <p className="text-[10px] text-slate-400 mt-1 italic">{skill.name}</p>}
                      </div>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${ans.isCorrect ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-rose-500 text-white shadow-lg shadow-rose-200'}`}>
                        {ans.isCorrect ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        )}
                      </div>
                    </div>

                    {!ans.isCorrect && (
                      <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-xs text-rose-400 font-medium italic">Habilidade não consolidada</span>
                        <button 
                          onClick={() => setInspectedQuestion(q)}
                          className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-lg text-rose-600 text-xs font-black hover:bg-rose-100 transition-colors uppercase tracking-widest"
                        >
                          Ver Percurso de Apoio
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Percurso - Enhanced with Flowchart Logic */}
      {inspectedQuestion && (
        <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-pop-in">
            <div className="p-8 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h4 className="text-2xl font-black text-slate-800">Mapa de Intervenção</h4>
                <p className="text-slate-500 text-sm font-medium">Análise de dependências: {inspectedQuestion.skillCode}</p>
              </div>
              <button 
                onClick={() => setInspectedQuestion(null)} 
                className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border rounded-full hover:bg-slate-100 transition-colors"
              >
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <div className="mb-10">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Para que o aluno domine <span className="font-black text-blue-600">{inspectedQuestion.skillCode}</span>, é essencial verificar se houve aprendizagem nas habilidades antecessoras:
                </p>
                
                <div className="relative space-y-6">
                  {/* Current Skill Card */}
                  <div className="p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl flex justify-between items-center relative z-10">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Nível Atual</span>
                      <h5 className="text-lg font-black">{inspectedQuestion.skillCode}</h5>
                      <p className="text-xs opacity-90">{getSkill(inspectedQuestion.skillCode)?.name}</p>
                    </div>
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                    </div>
                  </div>
                  
                  {/* Prerequisite Path */}
                  {GET_PREREQUISITES_RECURSIVE(inspectedQuestion.skillCode).length > 0 ? (
                    GET_PREREQUISITES_RECURSIVE(inspectedQuestion.skillCode).map((preCode, i) => {
                      const preSkill = getSkill(preCode);
                      return (
                        <div key={preCode} className="relative pl-12">
                          <div className="absolute left-6 top-[-24px] bottom-1/2 w-0.5 border-l-2 border-dashed border-slate-200"></div>
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-white shadow-sm"></div>
                          
                          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-200 transition-colors">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{preSkill?.year}º Ano</span>
                              <span className="text-xs font-black text-slate-800">{preCode}</span>
                            </div>
                            <span className="text-slate-600 font-bold text-sm block mb-1">{preSkill?.name}</span>
                            <p className="text-[10px] text-slate-400 leading-relaxed italic">{preSkill?.description}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center p-10 bg-slate-50 rounded-2xl border border-dashed">
                      <p className="text-slate-400 text-sm font-medium italic">Esta habilidade não possui pré-requisitos diretos mapeados nos anos iniciais.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <h5 className="text-amber-800 font-black mb-2 text-sm flex items-center gap-2 uppercase tracking-widest">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Estratégia de Recuperação
                </h5>
                <p className="text-amber-700 text-xs leading-relaxed font-medium">
                  O erro sugere defasagem no percurso de <b>{getSkill(GET_PREREQUISITES_RECURSIVE(inspectedQuestion.skillCode)[0])?.year || 'anos anteriores'}</b>. 
                  Recomenda-se aplicar atividades de reforço focadas em experimentação prática para resgatar os conceitos da base do fluxograma.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
