
import React, { useState, useEffect } from 'react';
import { SKILLS } from './constants';
import { Skill, Difficulty, Question, SimulationConfig, StudentAttempt } from './types';
import { generateQuestions } from './geminiService';
import SkillSelector from './components/SkillSelector';
import QuizGenerator from './components/QuizGenerator';
import StudentQuiz from './components/StudentQuiz';
import TeacherDashboard from './components/TeacherDashboard';
import FlowchartView from './components/FlowchartView';

type View = 'LANDING' | 'TEACHER_SETUP' | 'TEACHER_DASHBOARD' | 'STUDENT_QUIZ' | 'STUDENT_RESULT' | 'FLOWCHART';

const App: React.FC = () => {
  const [view, setView] = useState<View>('LANDING');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<StudentAttempt | null>(null);

  const handleGenerate = async (config: SimulationConfig) => {
    setIsGenerating(true);
    try {
      const skillsToUse = SKILLS.filter(s => config.selectedSkillCodes.includes(s.code));
      const newQuestions = await generateQuestions(skillsToUse, config.counts);
      setQuestions(newQuestions);
      setView('STUDENT_QUIZ');
    } catch (error) {
      alert("Erro ao gerar questões. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuizSubmit = (attempt: StudentAttempt) => {
    setAttempts(prev => [...prev, attempt]);
    setCurrentAttempt(attempt);
    setView('STUDENT_RESULT');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">CidCiência Digital</h1>
          <p className="text-slate-500">Simulados BNCC: 6º ao 9º Ano</p>
        </div>
        <nav className="flex gap-4">
          <button 
            onClick={() => setView('LANDING')}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Início
          </button>
          <button 
            onClick={() => setView('FLOWCHART')}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Mapa de Habilidades
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {view === 'LANDING' && (
          <div className="grid md:grid-cols-2 gap-8 py-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => setView('TEACHER_SETUP')}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Painel do Professor</h2>
              <p className="text-slate-600">Selecione habilidades, configure dificuldades e gere simulados personalizados.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
                 onClick={() => setView('TEACHER_DASHBOARD')}>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Resultados e Análise</h2>
              <p className="text-slate-600">Visualize o desempenho da turma e rastreie defasagens pedagógicas.</p>
            </div>
          </div>
        )}

        {view === 'TEACHER_SETUP' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-700">1. Selecione as Habilidades (6º ao 9º)</h3>
              <SkillSelector 
                selectedCodes={selectedSkills} 
                onChange={setSelectedSkills} 
              />
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-semibold mb-4 text-slate-700">2. Configuração do Simulado</h3>
              <QuizGenerator 
                selectedCodes={selectedSkills} 
                onGenerate={handleGenerate}
                loading={isGenerating}
              />
            </div>
          </div>
        )}

        {view === 'STUDENT_QUIZ' && questions.length > 0 && (
          <StudentQuiz 
            questions={questions} 
            onSubmit={handleQuizSubmit} 
          />
        )}

        {view === 'STUDENT_RESULT' && currentAttempt && (
          <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-slate-800">Simulado Concluído!</h2>
              <p className="text-slate-600 text-lg">Parabéns, {currentAttempt.studentName}!</p>
            </div>
            
            <div className="flex justify-center gap-10 mb-10">
              <div className="p-4 bg-blue-50 rounded-xl min-w-[150px]">
                <p className="text-slate-500 text-sm uppercase font-semibold">Pontuação</p>
                <p className="text-4xl font-bold text-blue-600">{currentAttempt.score}%</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl min-w-[150px]">
                <p className="text-slate-500 text-sm uppercase font-semibold">Acertos</p>
                <p className="text-4xl font-bold text-slate-700">
                  {currentAttempt.answers.filter(a => a.isCorrect).length} / {currentAttempt.answers.length}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setView('LANDING')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        )}

        {view === 'TEACHER_DASHBOARD' && (
          <TeacherDashboard 
            attempts={attempts} 
            questions={questions}
          />
        )}

        {view === 'FLOWCHART' && (
          <FlowchartView />
        )}
      </main>
    </div>
  );
};

export default App;
