'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

const PROFESSOR_EMAIL = 'jorge@jorgefit';
const PROFESSOR_PASS = '152230@@';

export async function loginProfessor(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === PROFESSOR_EMAIL && password === PROFESSOR_PASS) {
    const cookieStore = await cookies();
    cookieStore.set('jorgefit_prof_auth', 'authenticated', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });
    return { success: true };
  }
  
  return { success: false, error: 'Credenciais inválidas' };
}

export async function logoutProfessor() {
  const cookieStore = await cookies();
  cookieStore.delete('jorgefit_prof_auth');
  revalidatePath('/professor');
}

export async function getStudents() {
  const students = await prisma.student.findMany({
    include: {
      progress: true,
      weeklyPlan: {
        include: {
          exercises: true
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  });
  return students;
}

export async function saveStudent(data: any) {
  // If id is provided and exists, update. Otherwise create.
  const existing = await prisma.student.findUnique({ where: { id: data.id } });
  
  if (existing) {
    await prisma.student.update({
      where: { id: data.id },
      data: {
        name: data.name,
        level: data.level,
        goal: data.goal,
      }
    });
  } else {
    await prisma.student.create({
      data: {
        id: data.id,
        name: data.name,
        level: data.level,
        goal: data.goal,
      }
    });
  }
  revalidatePath('/professor');
  revalidatePath('/aluno');
}

export async function deleteStudent(id: string) {
  await prisma.student.delete({ where: { id } });
  revalidatePath('/professor');
  revalidatePath('/aluno');
}

export async function saveWorkout(studentId: string, workout: any) {
  const existing = await prisma.dailyWorkout.findUnique({ where: { id: workout.id } });
  
  if (existing) {
    // delete old exercises
    await prisma.dailyWorkoutExercise.deleteMany({ where: { workoutId: workout.id } });
    
    await prisma.dailyWorkout.update({
      where: { id: workout.id },
      data: {
        title: workout.title,
        day: workout.day,
        focus: workout.focus,
        exercises: {
          create: workout.exercises.map((ex: any) => ({
            id: ex.id,
            exerciseId: ex.exerciseId || ex.exercise.id,
            sets: ex.sets,
            reps: ex.reps,
            restSeconds: ex.restSeconds
          }))
        }
      }
    });
  } else {
    await prisma.dailyWorkout.create({
      data: {
        id: workout.id,
        studentId,
        title: workout.title,
        day: workout.day,
        focus: workout.focus,
        exercises: {
          create: workout.exercises.map((ex: any) => ({
            id: ex.id,
            exerciseId: ex.exerciseId || ex.exercise.id,
            sets: ex.sets,
            reps: ex.reps,
            restSeconds: ex.restSeconds
          }))
        }
      }
    });
  }
  revalidatePath('/professor');
  revalidatePath(`/aluno/${studentId}`);
}
