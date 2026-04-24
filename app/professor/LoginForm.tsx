'use client';

import { useState } from 'react';
import { loginProfessor } from '../actions';
import { Lock, User as UserIcon } from 'lucide-react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const res = await loginProfessor(formData);
    
    if (!res.success) {
      setError(res.error || 'Erro ao fazer login');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4" style={{ backgroundImage: "url('/gym-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-0" />
      
      <form onSubmit={handleSubmit} className="relative z-10 glass p-8 rounded-2xl w-full max-w-md flex flex-col gap-6 shadow-2xl border border-white/10">
        <div className="text-center mb-4">
          <img src="/logo_professor.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 object-cover rounded-full shadow-lg border-2 border-slate-700" />
          <h1 className="text-2xl font-bold text-slate-50">Área do Professor</h1>
          <p className="text-slate-400 mt-2 text-sm">Acesso restrito</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Usuário</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                name="email"
                type="text" 
                defaultValue="jorge@jorgefit"
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-50 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                name="password"
                type="password" 
                required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-slate-50 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <button 
          disabled={loading}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
