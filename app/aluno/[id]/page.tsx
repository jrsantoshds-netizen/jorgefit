import { getStudents } from '../../actions';
import AlunoDashboardClient from './AlunoDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AlunoDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const students = await getStudents();
  const student = students.find((s: any) => s.id === id);

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Aluno não encontrado</h1>
        </div>
      </div>
    );
  }

  return <AlunoDashboardClient initialStudent={student} />;
}
