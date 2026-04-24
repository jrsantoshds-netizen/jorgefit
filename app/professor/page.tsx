'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, User, Users, Calendar, Activity, Dumbbell, Timer, ArrowLeft, Target, HeartPulse, Plus, TrendingUp, Scale, Ruler, Trash2, Edit3, Save, CheckCircle, Check } from 'lucide-react';
import { MOCK_STUDENTS, DAYS_ORDER, Student, DayOfWeek, Exercise, DailyWorkout, ProgressEntry, EXERCISES } from '@/lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

function Header() {
  return (
    <header className="sticky top-0 z-10 w-full glass border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 p-2 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <img src="/logo_professor.png" alt="Jorge Fit Professor Logo" className="w-auto h-12 object-contain rounded-xl shadow-md border border-white/10" />
        </div>
        <div className="flex items-center gap-x-4 text-sm text-slate-400">
          <span className="flex items-center gap-1.5"><Users className="w-4 h-4"/> Área do Professor</span>
        </div>
      </div>
    </header>
  );
}

export default function AppDashboard() {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleSaveStudent = (savedStudent: Student) => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === savedStudent.id ? savedStudent : s));
      setEditingStudent(null);
    } else {
      setStudents([...students, savedStudent]);
      setIsAddingStudent(false);
    }
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
    setSelectedStudent(updatedStudent);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {(isAddingStudent || editingStudent) ? (
            <StudentForm 
              key="student-form" 
              initialData={editingStudent}
              onSave={handleSaveStudent} 
              onCancel={() => { setIsAddingStudent(false); setEditingStudent(null); }} 
            />
          ) : !selectedStudent ? (
            <StudentList 
              key="student-list" 
              students={students}
              onSelect={setSelectedStudent} 
              onAdd={() => setIsAddingStudent(true)}
              onDelete={handleDeleteStudent}
              onEdit={setEditingStudent}
            />
          ) : (
            <StudentDetailView 
              key="student-detail" 
              student={selectedStudent} 
              onBack={() => setSelectedStudent(null)}
              onUpdateStudent={handleUpdateStudent}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function StudentList({ students, onSelect, onAdd, onDelete, onEdit }: { students: Student[], onSelect: (s: Student) => void, onAdd: () => void, onDelete: (id: string) => void, onEdit: (s: Student) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-bold mb-2 text-slate-50">Meus Alunos</h2>
          <p className="text-slate-400 text-sm">Gerencie fichas de treino e acompanhe o progresso.</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-ieadtam-DEFAULT hover:bg-ieadtam-dark text-slate-900 px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-500/10 shrink-0"
        >
          <Plus className="w-4 h-4" /> Novo Aluno
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer rounded-2xl glass p-4 sm:p-5 transition-colors border-l-4 border-l-transparent hover:border-l-ieadtam-DEFAULT hover:border-ieadtam-dark flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between relative"
          >
            <div className="flex items-start" onClick={() => onSelect(student)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-600 group-hover:border-ieadtam-light transition-colors">
                  <img src="/logo_aluno.png" alt="Avatar do Aluno" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-heading font-medium text-lg text-slate-100 group-hover:text-ieadtam-light transition-colors">{student.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className="inline-flex items-center text-xs font-medium bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      Nível: {student.level}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-ieadtam-DEFAULT/10 border border-ieadtam-DEFAULT/20 text-ieadtam-light px-2 py-0.5 rounded">
                      <Target className="w-3 h-3" />
                      {student.goal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(student); }}
                className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                title="Editar Aluno"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(student.id); }}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Remover Aluno"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
        {students.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-slate-700 rounded-2xl">
            <p className="text-slate-400">Nenhum aluno cadastrado. Adicione seu primeiro aluno!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function StudentForm({ initialData, onSave, onCancel }: { initialData?: Student | null; onSave: (s: Student) => void; onCancel: () => void }) {
  const [name, setName] = useState(initialData?.name || '');
  const [level, setLevel] = useState<Student['level']>(initialData?.level || 'Iniciante');
  const [goal, setGoal] = useState(initialData?.goal || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !goal) return;
    
    if (initialData) {
      onSave({
        ...initialData,
        name,
        level,
        goal
      });
    } else {
      onSave({
        id: `s_${Date.now()}`,
        name,
        level,
        goal,
        weeklyPlan: [],
        progress: []
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-xl mx-auto"
    >
      <button 
        onClick={onCancel}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-50 mb-6 transition-colors font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-5">
        <div>
          <h2 className="font-heading text-2xl font-bold text-slate-50 text-center mb-6">{initialData ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-ieadtam-DEFAULT focus:ring-1 focus:ring-ieadtam-DEFAULT transition-all"
              placeholder="Ex: João da Silva"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nível de Experiência</label>
            <div className="flex flex-wrap gap-3">
              {['Iniciante', 'Intermediário', 'Avançado'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl as Student['level'])}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border ${
                    level === lvl 
                      ? 'bg-ieadtam-DEFAULT/10 border-ieadtam-DEFAULT text-ieadtam-light' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Objetivo Principal</label>
            <input 
              type="text" 
              required
              value={goal}
              onChange={e => setGoal(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-ieadtam-DEFAULT focus:ring-1 focus:ring-ieadtam-DEFAULT transition-all"
              placeholder="Ex: Hipertrofia, Emagrecimento, Fortalecimento..."
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="flex items-center gap-2 bg-ieadtam-DEFAULT hover:bg-ieadtam-dark text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-500/10"
          >
            <Save className="w-4 h-4" /> Salvar Aluno
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function StudentDetailView({ student, onBack, onUpdateStudent }: { student: Student; onBack: () => void; onUpdateStudent: (s: Student) => void }) {
  const [activeTab, setActiveTab] = useState<'treino' | 'progresso'>('treino');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-50 transition-colors font-medium text-sm self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a lista
      </button>

      <div className="glass p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-50">{student.name}</h2>
          <p className="text-slate-400 mt-1 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
             <span className="flex items-center gap-1"><Target className="w-4 h-4 text-ieadtam-light"/> Meta: <span className="text-slate-200">{student.goal}</span></span>
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="bg-slate-800/60 px-4 py-2 rounded-lg text-center border border-slate-700 w-full md:w-auto">
            <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Nível</div>
            <div className="font-bold text-ieadtam-light">{student.level}</div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-slate-800/40 rounded-xl w-full sm:w-fit border border-white/5">
        <button
          onClick={() => setActiveTab('treino')}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'treino' 
              ? 'bg-ieadtam-DEFAULT text-slate-900 shadow-lg shadow-green-500/10' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Dumbbell className="w-4 h-4" /> Treino Semanal
        </button>
        <button
          onClick={() => setActiveTab('progresso')}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'progresso' 
              ? 'bg-ieadtam-DEFAULT text-slate-900 shadow-lg shadow-green-500/10' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" /> Progresso
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'treino' ? (
          <motion.div key="tab-treino" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WeeklyPlanView student={student} onUpdateStudent={onUpdateStudent} />
          </motion.div>
        ) : (
          <motion.div key="tab-progresso" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProgressView student={student} />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

function WeeklyPlanView({ student, onUpdateStudent }: { student: Student; onUpdateStudent: (s: Student) => void }) {
  // Try to find the first day with a workout, or default to current day / Monday
  const defaultDay = DAYS_ORDER[0];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(defaultDay);
  
  const currentWorkout = student.weeklyPlan.find(w => w.day === selectedDay);

  const handleCreateWorkout = () => {
    const newWorkout: DailyWorkout = {
      id: `w_${Date.now()}`,
      day: selectedDay,
      title: 'Treino Novo',
      focus: [],
      exercises: []
    };
    
    const updatedStudent = {
      ...student,
      weeklyPlan: [...student.weeklyPlan, newWorkout]
    };
    onUpdateStudent(updatedStudent);
  };

  return (
    <div className="space-y-6">
      <div className="flex sm:grid sm:grid-cols-7 gap-2 md:gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
        {DAYS_ORDER.map((day, index) => {
          const hasWorkout = student.weeklyPlan.find(w => w.day === day);
          const isSelected = selectedDay === day;
          
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`
                snap-center shrink-0 min-w-[4.5rem] sm:min-w-0 p-2 md:p-3 rounded-xl text-center transition-all border flex flex-col items-center justify-center
                ${isSelected 
                  ? 'glass border-ieadtam-DEFAULT shadow-[inset_0_0_15px_rgba(34,197,94,0.15)] ring-1 ring-ieadtam-DEFAULT' 
                  : hasWorkout 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white cursor-pointer' 
                    : 'bg-slate-800/20 border-slate-800/50 text-slate-500 hover:bg-slate-800 hover:text-slate-200 cursor-pointer'}
              `}
            >
              <div className={`text-[11px] sm:text-xs font-bold uppercase ${!isSelected && !hasWorkout ? 'italic' : ''}`}>{day.substring(0,3)}</div>
              <div className={`text-base sm:text-lg font-black mt-1 sm:mt-0 ${isSelected ? 'text-ieadtam-light' : ''}`}>
                {hasWorkout ? String.fromCharCode(65 + student.weeklyPlan.findIndex(w => w.day === day)) : 'Off'}
              </div>
              <div className="text-[9px] sm:text-[10px] font-medium truncate w-full px-1 opacity-80 mix-blend-plus-lighter mt-1 sm:mt-0">
                {hasWorkout ? hasWorkout.title.split('-')[0].trim() : 'Descanso'}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-2">
        <AnimatePresence mode="wait">
          {currentWorkout ? (
            <DailyWorkoutView key={currentWorkout.id} workout={currentWorkout} student={student} onUpdateStudent={onUpdateStudent} />
          ) : (
            <motion.div
              key="rest-day"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center glass rounded-2xl flex flex-col items-center justify-center"
            >
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-medium text-slate-400">Dia de Descanso</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm mb-6">A recuperação também faz parte do processo, ou você pode adicionar um treino aqui.</p>
              
              <button 
                onClick={handleCreateWorkout}
                className="flex items-center gap-2 bg-ieadtam-DEFAULT hover:bg-ieadtam-dark text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-500/10"
              >
                <Plus className="w-4 h-4" /> Criar Treino para {selectedDay}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProgressView({ student }: { student: Student }) {
  const hasProgress = student.progress && student.progress.length > 0;
  // Apenas extraindo os dados para o gráfico de forma amigável
  const chartData = hasProgress ? [...student.progress].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(p => ({
    name: new Date(p.date).toLocaleDateString('pt-BR', { month: 'short' }),
    peso: p.weight,
    peito: p.metrics?.chest,
    braco: p.metrics?.arm
  })) : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-5 rounded-2xl border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h3 className="font-heading font-semibold text-slate-200">Peso Atual</h3>
          </div>
          <div className="text-3xl font-black text-slate-50">
            {hasProgress ? `${student.progress[student.progress.length-1].weight} kg` : '--'}
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border-l-4 border-l-ieadtam-DEFAULT">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-ieadtam-light" />
            <h3 className="font-heading font-semibold text-slate-200">Evolução (6m)</h3>
          </div>
          <div className="text-3xl font-black text-slate-50">
            {hasProgress && student.progress.length > 1 ? (
              <span className={student.progress[student.progress.length-1].weight < student.progress[0].weight ? 'text-green-400' : 'text-slate-50'}>
                {(student.progress[student.progress.length-1].weight - student.progress[0].weight).toFixed(1)} kg
              </span>
            ) : '--'}
          </div>
        </div>
        <div className="glass p-5 rounded-2xl border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <Ruler className="w-5 h-5 text-purple-400" />
            <h3 className="font-heading font-semibold text-slate-200">Última Medição</h3>
          </div>
          <div className="text-lg font-medium text-slate-300">
            {hasProgress ? new Date(student.progress[student.progress.length-1].date).toLocaleDateString('pt-BR') : '--'}
          </div>
        </div>
      </div>

      {hasProgress ? (
        <div className="glass p-6 rounded-2xl">
          <h3 className="font-heading font-semibold text-xl mb-6 text-slate-50">Histórico de Peso</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Line type="monotone" dataKey="peso" stroke="#22c55e" strokeWidth={3} dot={{ r: 4, fill: '#1e293b', strokeWidth: 2 }} activeDot={{ r: 6 }} name="Peso (kg)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="glass p-12 rounded-2xl text-center">
          <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-medium text-slate-400">Sem dados de progresso</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm">Registre as medidas do aluno periodicamente para visualizar a evolução aqui.</p>
        </div>
      )}
    </div>
  );
}

function DailyWorkoutView({ workout, student, onUpdateStudent }: { workout: DailyWorkout; student: Student; onUpdateStudent: (s: Student) => void }) {
  const [playingExercise, setPlayingExercise] = useState<Exercise | null>(null);
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState('10 a 12');
  const [rest, setRest] = useState(60);

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExerciseId) return;

    const exercise = EXERCISES[selectedExerciseId];
    if (!exercise) return;

    const newExercise = {
      id: `ex_${Date.now()}`,
      exercise,
      sets,
      reps,
      restSeconds: rest
    };

    const updatedWorkout = {
      ...workout,
      exercises: [...workout.exercises, newExercise]
    };

    const updatedStudent = {
      ...student,
      weeklyPlan: student.weeklyPlan.map(w => w.id === workout.id ? updatedWorkout : w)
    };

    onUpdateStudent(updatedStudent);
    setIsAddingExercise(false);
    
    // Reset form
    setSelectedExerciseId('');
    setSets(3);
    setReps('10 a 12');
    setRest(60);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="glass rounded-2xl p-4 sm:p-6 flex flex-col overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-bold text-lg sm:text-xl text-slate-50">{workout.title}</h3>
          <div className="flex items-center gap-2 mt-2 sm:mt-1 text-xs text-slate-400 font-medium flex-wrap">
            <span className="bg-slate-800 px-2 py-1 rounded">
              Foco: {workout.focus.join(' • ')}
            </span>
            <span className="bg-slate-800 px-2 py-1 rounded">
              {workout.exercises.length} Exercícios
            </span>
          </div>
        </div>
        <button 
          onClick={() => {
            if (workout.exercises.length === 0) {
              return;
            }
            if (isWorkoutActive) {
                setIsWorkoutActive(false);
                setCompletedExercises({});
            } else {
                setIsWorkoutActive(true);
            }
          }}
          disabled={workout.exercises.length === 0}
          className={`w-full sm:w-auto px-5 py-3 sm:py-2 rounded-full text-sm sm:text-xs font-bold transition-colors ${
              workout.exercises.length === 0 
                ? "bg-slate-700 text-slate-500 cursor-not-allowed" 
                : isWorkoutActive 
                  ? "bg-red-500 hover:bg-red-600 text-white" 
                  : "bg-ieadtam-DEFAULT hover:bg-ieadtam-dark text-slate-900"
          }`}
        >
          {isWorkoutActive ? "FINALIZAR TREINO" : "INICIAR TREINO"}
        </button>
      </div>

      <div className="space-y-3 mb-6">
        {workout.exercises.map((item, index) => {
          const isDone = completedExercises[item.id];
          return (
          <div key={item.id} className={`relative border p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-300 ${isDone ? "border-ieadtam-DEFAULT/50 bg-ieadtam-DEFAULT/10 opacity-70" : "border-white/5 bg-slate-800/20 hover:bg-slate-800/40"}`}>
            <div className="flex items-center gap-3 flex-1">
              <button 
                onClick={() => {
                  if (isWorkoutActive) {
                    setCompletedExercises(prev => ({ ...prev, [item.id]: !prev[item.id] }));
                  }
                }}
                className={`w-8 h-8 shrink-0 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                  isDone 
                    ? "bg-ieadtam-DEFAULT text-slate-900" 
                    : isWorkoutActive 
                      ? "bg-slate-700/50 hover:bg-ieadtam-DEFAULT/50 hover:text-slate-900 cursor-pointer text-slate-400" 
                      : "bg-slate-800/80 text-slate-400"
                  }`}
              >
                {isDone ? <Check className="w-5 h-5" /> : index + 1}
              </button>
              <div className={isDone ? "line-through decoration-slate-400/50" : ""}>
                <div className={`font-semibold text-sm sm:text-base leading-tight ${isDone ? "text-slate-400" : "text-slate-200"}`}>{item.exercise.name}</div>
                <div className="text-[11px] sm:text-xs text-ieadtam-light/70 mt-0.5">{item.exercise.muscleGroup}</div>
              </div>
            </div>
            
            <div className={`flex items-center justify-between gap-4 w-full sm:w-auto pl-11 sm:pl-0 pt-2 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0 transition-opacity ${isDone ? "border-ieadtam-DEFAULT/20 opacity-50" : "border-white/5"}`}>
              <div className="flex gap-4 sm:gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Séries</div>
                  <div className={`font-bold text-base sm:text-lg ${isDone ? "text-slate-400" : "text-slate-200"}`}>{item.sets}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Reps</div>
                  <div className={`font-medium text-sm sm:text-base mt-0.5 ${isDone ? "text-slate-400" : "text-slate-300"}`}>{item.reps}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Pausa</div>
                  <div className="italic text-slate-400 mt-0.5 text-sm sm:text-base">{item.restSeconds}s</div>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>

      {!isWorkoutActive && (
        <AnimatePresence mode="wait">
          {isAddingExercise ? (
            <motion.form 
              key="add-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddExercise}
              className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Exercício</label>
                <select 
                  required
                  value={selectedExerciseId}
                  onChange={e => setSelectedExerciseId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-ieadtam-DEFAULT"
                >
                  <option value="">Selecione um exercício...</option>
                  {Object.values(EXERCISES).map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name} ({ex.muscleGroup})</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Séries</label>
                  <input 
                    type="number" min="1" max="10" required
                    value={sets} onChange={e => setSets(parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-center text-slate-100 focus:outline-none focus:border-ieadtam-DEFAULT"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Reps</label>
                  <input 
                    type="text" required
                    value={reps} onChange={e => setReps(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-center text-slate-100 focus:outline-none focus:border-ieadtam-DEFAULT"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Pausa (s)</label>
                  <input 
                    type="number" step="15" min="0" max="300" required
                    value={rest} onChange={e => setRest(parseInt(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-center text-slate-100 focus:outline-none focus:border-ieadtam-DEFAULT"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 justify-end pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddingExercise(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider rounded-lg hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-ieadtam-DEFAULT text-slate-900 rounded-lg transition-colors hover:bg-ieadtam-dark shadow-sm uppercase tracking-wider flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.button
              key="add-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingExercise(true)}
              className="flex items-center justify-center gap-2 w-full p-4 border border-dashed border-slate-700 hover:border-ieadtam-DEFAULT/50 rounded-xl text-slate-500 hover:text-ieadtam-DEFAULT hover:bg-slate-800/30 transition-all font-medium text-sm"
            >
              <Plus className="w-4 h-4" /> Adicionar Exercício
            </motion.button>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {playingExercise && (
          <VideoModal exercise={playingExercise} onClose={() => setPlayingExercise(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function VideoModal({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="glass rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50">
          <div>
            <h3 className="font-heading font-semibold text-lg text-slate-50">{exercise.name}</h3>
            <span className="text-xs text-ieadtam-light">{exercise.muscleGroup}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="aspect-video bg-slate-950 relative group border-b border-white/5">
          <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />
            <Dumbbell className="w-16 h-16 text-slate-700 mb-4 animate-pulse duration-1000 z-10" />
            <p className="text-slate-300 font-medium z-10 flex items-center gap-2 bg-slate-900/60 px-4 py-2 rounded-full backdrop-blur-sm">
              <Play className="w-4 h-4 text-ieadtam-DEFAULT" /> Execução do Exercício
            </p>
            <p className="text-slate-400 text-xs mt-3 z-10">Duração estimada: ~{exercise.videoDurationSec || 45} segundos</p>
            
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: exercise.videoDurationSec || 45, ease: "linear" }}
                className="h-full bg-ieadtam-DEFAULT" 
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/30">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Instruções de Execução</h4>
          <p className="text-slate-300 leading-relaxed text-sm">
            {exercise.description} Mantenha a respiração constante e o abdômen contraído durante todo o movimento.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
