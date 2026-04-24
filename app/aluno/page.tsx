import Link from 'next/link';
import { MOCK_STUDENTS } from '@/lib/data';
import { HeartPulse, User, ArrowLeft } from 'lucide-react';

export default function AlunoLoginMock() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-slate-900 font-sans p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gym-bg.png')" }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] z-0" />

      <Link 
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-xl transition-all border border-slate-700 hover:border-ieadtam-DEFAULT backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>

      <div className="mb-8 flex flex-col items-center gap-2 relative z-10">
        <img src="/logo_aluno.png" alt="Jorge Fit Aluno Logo" className="w-auto h-24 object-contain rounded-2xl shadow-xl shadow-ieadtam-DEFAULT/20 border border-white/10" />
        <p className="text-slate-400 mt-2">Área do Aluno</p>
      </div>

      <div className="relative group z-10 w-full max-w-md">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-ieadtam-DEFAULT to-green-400 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
        <div className="relative glass p-8 rounded-[2rem] border border-white/10 bg-slate-900/80 backdrop-blur-xl">
          <h2 className="text-xl font-bold text-slate-50 mb-6 text-center">Selecione o seu perfil</h2>
          <p className="text-sm text-slate-400 mb-6 text-center">
            (Simulação de Autenticação)
          </p>

          <div className="space-y-4">
            {MOCK_STUDENTS.map(student => (
              <Link 
                key={student.id} 
                href={`/aluno/${student.id}`}
                className="flex items-center gap-4 w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-ieadtam-DEFAULT hover:bg-slate-800 transition-all group/item shadow-sm"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-600 group-hover/item:border-ieadtam-light transition-colors">
                  <img src="/logo_aluno.png" alt="Avatar do Aluno" className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="font-semibold text-slate-200 group-hover/item:text-white transition-colors">{student.name}</h3>
                  <p className="text-xs text-slate-500">{student.goal}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
