
import React, { useRef } from 'react';
import { Question } from '../types';

interface Props {
  questions: Question[];
  onBack: () => void;
}

const PrintableExam: React.FC<Props> = ({ questions, onBack }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    if (contentRef.current) {
      const range = document.createRange();
      range.selectNode(contentRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      alert('Simulado copiado! Agora basta colar no Word (Ctrl+V).');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border">
        <div>
          <h2 className="text-xl font-bold">Versão para Impressão (Word)</h2>
          <p className="text-sm text-slate-500">Formatação limpa otimizada para cópia e cola.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-2 border rounded-xl font-bold hover:bg-slate-50 transition-colors">
            Voltar
          </button>
          <button 
            onClick={copyToClipboard}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Copiar Tudo
          </button>
        </div>
      </div>

      <div 
        ref={contentRef}
        className="bg-white p-12 rounded-3xl shadow-sm border font-serif text-slate-800 leading-normal"
      >
        {/* Exam Header */}
        <div className="border-b-2 border-slate-900 pb-8 mb-8 text-center uppercase tracking-widest font-bold">
          <h1 className="text-2xl mb-2">Simulado de Ciências da Natureza</h1>
          <p className="text-sm">Escola: ___________________________________________________________</p>
          <p className="text-sm mt-2 text-left">Nome: ___________________________________________________________ Nº: _______</p>
          <p className="text-sm mt-2 text-left">Turma: ______________ Professor(a): _____________________________ Data: ___/___/___</p>
        </div>

        {/* Questions */}
        <div className="space-y-10">
          {questions.map((q, i) => (
            <div key={q.id} className="question-block">
              <p className="font-bold mb-4">Questão {i + 1} ({q.skillCode})</p>
              
              {q.introText && (
                <p className="italic mb-4 text-justify">{q.introText}</p>
              )}
              
              <p className="mb-6 text-justify">{q.text}</p>
              
              <div className="space-y-2 ml-4">
                {q.options.map((opt) => (
                  <p key={opt.id}>
                    <span className="font-bold">{opt.id})</span> {opt.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Answer Key */}
        <div className="mt-16 pt-8 border-t-2 border-dashed border-slate-300">
          <h3 className="text-lg font-bold mb-4 uppercase">Gabarito (Para o Professor)</h3>
          <div className="grid grid-cols-5 gap-4">
            {questions.map((q, i) => (
              <p key={q.id} className="text-sm">
                <span className="font-bold">{i + 1}:</span> {q.correctOptionId}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableExam;
