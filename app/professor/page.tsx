import { cookies } from 'next/headers';
import LoginForm from './LoginForm';
import DashboardClient from './DashboardClient';
import { getStudents } from '../actions';

export default async function ProfessorPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('jorgefit_prof_auth');
  
  if (!auth || auth.value !== 'authenticated') {
    return <LoginForm />;
  }

  const students = await getStudents();

  return <DashboardClient initialStudents={students} />;
}
