import Link from 'next/link';
import { HeartPulse, User, Users, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-slate-900 font-sans p-4 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gym-bg.png')" }}
    >
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] z-0" />

      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ieadtam-DEFAULT/20 rounded-full blur-3xl z-0 mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-blue-500/20 rounded-full blur-3xl z-0 mix-blend-screen" />

      <div className="mb-12 flex flex-col items-center gap-2 relative z-10">
        <img src="/logo.png" alt="Jorge Fit Logo" className="w-auto h-32 md:h-40 object-contain rounded-3xl shadow-2xl shadow-ieadtam-DEFAULT/20 border border-white/10 mb-4" />
        <p className="text-slate-400 mt-3 text-lg font-medium">Sua plataforma completa de treinos</p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-ieadtam-DEFAULT to-green-300 rounded-[2rem] blur opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          <Link href="/aluno" className="group/link relative h-full glass p-8 rounded-[2rem] border border-white/10 hover:border-ieadtam-DEFAULT/50 transition-all duration-300 flex flex-col items-center text-center overflow-hidden bg-slate-900/80 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ieadtam-DEFAULT/10 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shrink-0 border-2 border-white/10 group-hover/link:border-ieadtam-light mb-6 group-hover/link:scale-110 transition-all shadow-inner">
              <img src="/logo_aluno.png" alt="Avatar Aluno" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-slate-50 mb-3 group-hover/link:text-white transition-colors">Área do Aluno</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">
              Acesse seus treinos semanais, visualize a execução dos exercícios e acompanhe seu progresso de forma simples e rápida.
            </p>
            <div className="flex items-center gap-2 text-ieadtam-DEFAULT font-bold text-sm uppercase tracking-wider group-hover/link:translate-x-2 transition-transform">
              Acessar <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2rem] blur opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          <Link href="/professor" className="group/link relative h-full glass p-8 rounded-[2rem] border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center text-center overflow-hidden bg-slate-900/80 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/10 opacity-0 group-hover/link:opacity-100 transition-opacity" />
            <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center shrink-0 border-2 border-white/10 group-hover/link:border-blue-400 mb-6 group-hover/link:scale-110 transition-all shadow-inner">
              <img src="/logo_professor.png" alt="Avatar Professor" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-slate-50 mb-3 group-hover/link:text-white transition-colors">Área do Professor</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">
              Gerencie seus alunos, crie fichas de treino personalizadas, adicione novos exercícios e acompanhe a evolução de todos.
            </p>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider group-hover/link:translate-x-2 transition-transform">
              Acessar <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>

      <div className="mt-16 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Jorge Fit. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
