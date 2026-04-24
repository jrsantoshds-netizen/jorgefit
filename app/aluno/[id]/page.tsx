'use client';

import { useState, use } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, HeartPulse, Calendar, Dumbbell, ArrowLeft, Target, Check } from 'lucide-react';
import { MOCK_STUDENTS, DAYS_ORDER, DayOfWeek, Exercise, DailyWorkout, Student } from '@/lib/data';
import Link from 'next/link';

function Header({ studentName }: { studentName: string }) {
  return (
    <header className="sticky top-0 z-10 w-full glass border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/aluno" className="text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 p-2 rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <img src="/logo_aluno.png" alt="Jorge Fit Aluno Logo" className="w-auto h-12 object-contain rounded-xl shadow-md border border-white/10" />
        </div>
        <div className="flex items-center gap-x-4 text-sm text-slate-400">
          <span>Olá, {studentName}</span>
        </div>
      </div>
    </header>
  );
}

export default function StudentDashboard({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const student = MOCK_STUDENTS.find(s => s.id === resolvedParams.id);

  if (!student) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 font-sans items-center justify-center text-slate-400">
        <p>Aluno não encontrado.</p>
        <Link href="/aluno" className="mt-4 text-ieadtam-light hover:underline">Voltar para o login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
      <Header studentName={student.name.split(' ')[0]} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6"
        >
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

          <div>
            <h3 className="font-heading text-xl font-bold mb-4 text-slate-50 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-ieadtam-DEFAULT" /> Meu Treino Semanal
            </h3>
            <WeeklyPlanReadOnlyView student={student} />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function WeeklyPlanReadOnlyView({ student }: { student: Student }) {
  const defaultDay = DAYS_ORDER[0];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(defaultDay);
  
  const currentWorkout = student.weeklyPlan.find(w => w.day === selectedDay);

  return (
    <div className="space-y-6">
      <div className="flex sm:grid sm:grid-cols-7 gap-2 md:gap-3 overflow-x-auto pb-2 snap-x scrollbar-hide">
        {DAYS_ORDER.map((day) => {
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
            <DailyWorkoutReadOnlyView key={currentWorkout.id} workout={currentWorkout} />
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
              <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm">Aproveite para recuperar as energias!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function DailyWorkoutReadOnlyView({ workout }: { workout: DailyWorkout }) {
  const [playingExercise, setPlayingExercise] = useState<Exercise | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

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
            if (workout.exercises.length === 0) return;
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
          {isWorkoutActive ? "FINALIZAR TREINO" : "COMEÇAR TREINO"}
        </button>
      </div>

      <div className="space-y-3">
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
                <button 
                  onClick={() => setPlayingExercise(item.exercise)}
                  className={`font-semibold text-sm sm:text-base leading-tight hover:text-ieadtam-light text-left transition-colors flex items-center gap-2 ${isDone ? "text-slate-400" : "text-slate-200"}`}
                >
                  {item.exercise.name}
                  <Play className="w-3 h-3 text-slate-500" />
                </button>
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
