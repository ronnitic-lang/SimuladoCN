
import React, { useState } from 'react';
import { SKILLS } from './constants';
import { Skill, Difficulty, Question, SimulationConfig, StudentAttempt, UserRole } from './types';
import { generateQuestions } from './geminiService';
import SkillSelector from './components/SkillSelector';
import QuizGenerator from './components/QuizGenerator';
import StudentQuiz from './components/StudentQuiz';
import TeacherDashboard from './components/TeacherDashboard';
import FlowchartView from './components/FlowchartView';
import Login from './components/Login';
import PrintableExam from './components/PrintableExam';

type View = 'LANDING' | 'TEACHER_SETUP' | 'TEACHER_DASHBOARD' | 'STUDENT_QUIZ' | 'STUDENT_RESULT' | 'FLOWCHART' | 'PRINT_EXAM';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
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
      if (userRole === UserRole.TEACHER) {
        setView('TEACHER_SETUP'); // Stay on setup but with questions ready
      } else {
        setView('STUDENT_QUIZ');
      }
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

  const logout = () => {
    setUserRole(null);
    setView('LANDING');
  };

  if (!userRole) {
    return <Login onLogin={setUserRole} />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">CidCiência Digital</h1>
          <p className="text-slate-500">Simulados BNCC: 6º ao 9º Ano | <span className="font-bold text-blue-600">{userRole}</span></p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button onClick={() => setView('LANDING')} className={`px-3 py-2 text-sm font-medium rounded-lg ${view === 'LANDING' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'}`}>
            Início
          </button>
          
          {userRole === UserRole.TEACHER && (
            <>
              <button onClick={() => setView('FLOWCHART')} className={`px-3 py-2 text-sm font-medium rounded-lg ${view === 'FLOWCHART' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'}`}>
                Mapa de Habilidades
              </button>
              <button onClick={() => setView('TEACHER_SETUP')} className={`px-3 py-2 text-sm font-medium rounded-lg ${view === 'TEACHER_SETUP' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'}`}>
                Painel do Professor
              </button>
              <button onClick={() => setView('TEACHER_DASHBOARD')} className={`px-3 py-2 text-sm font-medium rounded-lg ${view === 'TEACHER_DASHBOARD' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'}`}>
                Resultados e Análise
              </button>
            </>
          )}

          <button onClick={logout} className="px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg">
            Sair
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {view === 'LANDING' && (
          <div className="py-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-slate-800 mb-4">Bem-vindo ao Portal de Ciências</h2>
            <p className="text-slate-600 mb-10 text-lg">Plataforma inteligente para gestão de simulados e trilhas de aprendizagem baseadas na BNCC.</p>
            
            {userRole === UserRole.STUDENT ? (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Pronto para o desafio?</h3>
                <button 
                  onClick={() => questions.length > 0 ? setView('STUDENT_QUIZ') : setView('LANDING')}
                  disabled={questions.length === 0}
                  className={`px-12 py-4 rounded-2xl font-black text-xl shadow-lg transition-all active:scale-95 ${questions.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  Fazer Simulado
                </button>
                {questions.length === 0 && (
                  <p className="mt-4 text-sm text-amber-600 font-medium">Aguarde o professor gerar um simulado.</p>
                )}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                 <div onClick={() => setView('TEACHER_SETUP')} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Criar Simulado</h4>
                    <p className="text-slate-500 text-sm">Selecione habilidades e gere questões automáticas.</p>
                 </div>
                 <div onClick={() => setView('TEACHER_DASHBOARD')} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <h4 className="text-xl font-bold mb-2">Ver Resultados</h4>
                    <p className="text-slate-500 text-sm">Acompanhe a evolução pedagógica da turma.</p>
                 </div>
              </div>
            )}
          </div>
        )}

        {view === 'TEACHER_SETUP' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-slate-700 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">1</span>
                Selecione as Habilidades (6º ao 9º)
              </h3>
              <SkillSelector selectedCodes={selectedSkills} onChange={setSelectedSkills} />
            </div>
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-slate-700 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                Configuração e Geração
              </h3>
              <QuizGenerator selectedCodes={selectedSkills} onGenerate={handleGenerate} loading={isGenerating} />
            </div>

            {questions.length > 0 && (
              <div className="bg-white p-10 rounded-[2.5rem] border-2 border-dashed border-blue-200 text-center animate-fade-in">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Simulado Pronto!</h3>
                <p className="text-slate-500 mb-8">O simulado com {questions.length} questões já está disponível para os alunos.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setView('STUDENT_QUIZ')}
                    className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors"
                  >
                    Visualizar como Aluno
                  </button>
                  <button 
                    onClick={() => setView('PRINT_EXAM')}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    PROVA (Copiar para Word)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'STUDENT_QUIZ' && questions.length > 0 && (
          <StudentQuiz questions={questions} onSubmit={handleQuizSubmit} />
        )}

        {view === 'STUDENT_RESULT' && currentAttempt && (
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center max-w-2xl mx-auto animate-pop-in">
            <div className="mb-6">
              <div className="text-7xl mb-4">✨</div>
              <h2 className="text-3xl font-black text-slate-800">Resultado do Simulado</h2>
              <p className="text-slate-600 text-lg">Ótimo trabalho, {currentAttempt.studentName}!</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="p-6 bg-blue-50 rounded-3xl">
                <p className="text-slate-500 text-xs uppercase font-black tracking-widest mb-1">Nota</p>
                <p className="text-5xl font-black text-blue-600">{currentAttempt.score}%</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-3xl">
                <p className="text-slate-500 text-xs uppercase font-black tracking-widest mb-1">Acertos</p>
                <p className="text-5xl font-black text-slate-800">
                  {currentAttempt.answers.filter(a => a.isCorrect).length}<span className="text-2xl text-slate-300">/{currentAttempt.answers.length}</span>
                </p>
              </div>
            </div>

            <button onClick={() => setView('LANDING')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Voltar ao Início
            </button>
          </div>
        )}

        {view === 'TEACHER_DASHBOARD' && (
          <TeacherDashboard attempts={attempts} questions={questions} />
        )}

        {view === 'FLOWCHART' && (
          <FlowchartView />
        )}

        {view === 'PRINT_EXAM' && (
          <PrintableExam questions={questions} onBack={() => setView('TEACHER_SETUP')} />
        )}
      </main>
    </div>
  );
};

export default App;
