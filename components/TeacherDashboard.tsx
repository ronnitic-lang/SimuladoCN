
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
        <p className="text-slate-400 text-lg">Nenhum resultado disponível. Os alunos precisam concluir os simulados primeiro.</p>
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
          <span className="text-2xl font-black text-blue-600">{averageScore}% <small className="text-sm font-normal text-slate-400">Média</small></span>
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
                <span className="font-medium text-slate-700">{att.studentName}</span>
                <span className={`px-2 py-1 rounded-md text-sm font-bold ${
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
          <div className="h-full flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-10">
            <p className="text-slate-400">Selecione um aluno para analisar o desempenho individual e o percurso pedagógico.</p>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Desempenho: {selectedAttempt.studentName}</h3>
            
            <div className="grid gap-4">
              {selectedAttempt.answers.map((ans, idx) => {
                const q = questions.find(q => q.id === ans.questionId)!;
                const skill = getSkill(q.skillCode);
                
                return (
                  <div key={idx} className={`p-5 rounded-2xl border ${ans.isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs font-bold">{q.difficulty}</span>
                          <span className="text-xs font-bold text-blue-600">{q.skillCode}</span>
                        </div>
                        <h4 className="text-slate-800 font-medium">{q.text}</h4>
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${ans.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                        {ans.isCorrect ? '✓' : '✗'}
                      </div>
                    </div>

                    {!ans.isCorrect && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => setInspectedQuestion(q)}
                          className="flex items-center gap-2 text-rose-600 text-sm font-bold hover:underline"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Ver Percurso de Aprendizagem (Pré-requisitos)
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

      {/* Modal for Percurso */}
      {inspectedQuestion && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-pop-in">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h4 className="text-xl font-bold text-slate-800">Mapa de Defasagem</h4>
                <p className="text-slate-500 text-sm">Habilidade Base: {inspectedQuestion.skillCode}</p>
              </div>
              <button onClick={() => setInspectedQuestion(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="mb-6">
                <p className="text-slate-600 mb-4">Para dominar <span className="font-bold text-blue-600">{inspectedQuestion.skillCode}</span>, o aluno deve ter consolidado as seguintes habilidades de anos anteriores:</p>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-600 text-white rounded-xl shadow-md flex justify-between items-center">
                    <span className="font-black text-lg">{inspectedQuestion.skillCode}</span>
                    <span className="text-sm font-medium">Habilidade Alvo (Atual)</span>
                  </div>
                  
                  {GET_PREREQUISITES_RECURSIVE(inspectedQuestion.skillCode).length > 0 ? (
                    GET_PREREQUISITES_RECURSIVE(inspectedQuestion.skillCode).map((preCode, i) => {
                      const preSkill = getSkill(preCode);
                      return (
                        <div key={preCode} className="relative pl-10">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-slate-300 border-4 border-white"></div>
                          
                          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{preSkill?.year}º Ano</span>
                              <span className="text-sm font-bold text-slate-700">{preCode}</span>
                            </div>
                            <span className="text-slate-600 text-sm">{preSkill?.name}</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-slate-400 italic py-4">Não há pré-requisitos cadastrados para esta habilidade.</p>
                  )}
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <h5 className="text-amber-800 font-bold mb-1 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Intervenção Recomendada
                </h5>
                <p className="text-amber-700 text-xs">O erro nesta alternativa sugere que o aluno apresenta dificuldades em conceitos fundamentais do {getSkill(GET_PREREQUISITES_RECURSIVE(inspectedQuestion.skillCode)[0])?.year || 'anterior'}º ano. Recomenda-se retomar atividades de experimentação básica.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
