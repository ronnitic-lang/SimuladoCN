
import React from 'react';
import { UserRole } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-slate-800 mb-4 tracking-tight">CidCiência Digital</h1>
          <p className="text-slate-500 text-xl font-medium">Acesse o sistema de simulados inteligentes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Aluno Option */}
          <div 
            onClick={() => onLogin(UserRole.STUDENT)}
            className="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-100/50 border border-slate-100 hover:scale-[1.02] transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4 uppercase tracking-tight">Sou Aluno</h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">Acesse os simulados gerados pelo seu professor e acompanhe sua evolução.</p>
            <div className="mt-auto px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200">Entrar como Aluno</div>
          </div>

          {/* Professor Option */}
          <div 
            onClick={() => onLogin(UserRole.TEACHER)}
            className="bg-slate-800 p-10 rounded-[3rem] shadow-2xl shadow-slate-900/20 hover:scale-[1.02] transition-all cursor-pointer group flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 bg-slate-700 text-blue-400 rounded-3xl flex items-center justify-center mb-8 group-hover:-rotate-6 transition-transform">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tight">Sou Professor</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">Gerencie turmas, mapeie habilidades e crie simulados personalizados em segundos.</p>
            <div className="mt-auto px-8 py-3 bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-400/20">Entrar como Professor</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
