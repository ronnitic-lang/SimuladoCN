
import React, { useState } from 'react';
import { Question, StudentAttempt } from '../types';

interface Props {
  questions: Question[];
  onSubmit: (attempt: StudentAttempt) => void;
}

const StudentQuiz: React.FC<Props> = ({ questions, onSubmit }) => {
  const [studentName, setStudentName] = useState('');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [started, setStarted] = useState(false);

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finish();
    }
  };

  const finish = () => {
    const results = questions.map(q => ({
      questionId: q.id,
      selectedOptionId: answers[q.id],
      isCorrect: answers[q.id] === q.correctOptionId
    }));
    
    const correctCount = results.filter(r => r.isCorrect).length;
    const score = Math.round((correctCount / questions.length) * 100);

    onSubmit({
      studentName,
      answers: results,
      score,
      timestamp: Date.now()
    });
  };

  if (!started) {
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Iniciar Simulado</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Nome Completo</label>
            <input 
              type="text" 
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button 
            disabled={!studentName.trim()}
            onClick={() => setStarted(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
          >
            Começar Agora
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Questão {currentIdx + 1} de {questions.length}</span>
        <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
        {q.introText && (
          <p className="text-slate-500 text-sm italic mb-4 border-l-4 border-slate-200 pl-4 py-2">{q.introText}</p>
        )}
        
        {q.imageUrl && (
          <img src={q.imageUrl} alt="Contexto da questão" className="w-full h-48 object-cover rounded-xl mb-6 shadow-inner" />
        )}

        <h3 className="text-xl font-semibold text-slate-800 mb-8 leading-relaxed">{q.text}</h3>

        <div className="space-y-4">
          {q.options.map(opt => (
            <button
              key={opt.id}
              onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex gap-4 items-center group ${
                answers[q.id] === opt.id 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                : 'border-slate-100 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors ${
                answers[q.id] === opt.id ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
              }`}>
                {opt.id}
              </div>
              <span className={`text-lg ${answers[q.id] === opt.id ? 'text-blue-900 font-medium' : 'text-slate-700'}`}>
                {opt.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button 
          onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          className="text-slate-500 font-semibold hover:text-slate-700"
        >
          Anterior
        </button>
        <button 
          onClick={handleNext}
          disabled={!answers[q.id]}
          className={`px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
            !answers[q.id] ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {currentIdx === questions.length - 1 ? 'Finalizar Simulado' : 'Próxima Questão'}
        </button>
      </div>
    </div>
  );
};

export default StudentQuiz;
