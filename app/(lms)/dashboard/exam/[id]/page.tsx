import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ExamForm from '@/components/lms/ExamForm';

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 1. Fetch Exam Details
    const { data: exam, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', id)
        .single();

    if (examError || !exam) {
        return <div className="p-10 text-center">시험 정보를 찾을 수 없습니다.</div>;
    }

    // 2. Fetch Questions (Order by index)
    const { data: questions, error: qError } = await supabase
        .from('questions')
        .select('id, question_text, option_1, option_2, option_3, option_4, order_index')
        .eq('exam_id', id)
        .order('order_index', { ascending: true });

    if (qError || !questions) {
        return <div className="p-10 text-center">시험 문제를 불러올 수 없습니다.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-10 text-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mb-3">
                    자격증 시험
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">{exam.title}</h1>
                <p className="text-slate-500 max-w-2xl mx-auto whitespace-pre-line">
                    {exam.description}
                </p>
                <div className="flex gap-4 justify-center mt-6 text-sm text-slate-600">
                    <p>⏱️ 제한시간: {exam.time_limit_minutes}분</p>
                    <p>🎯 합격기준: {exam.passing_score}점 이상</p>
                    <p>📝 문항수: {questions.length}문항</p>
                </div>
            </div>

            <ExamForm
                examId={exam.id}
                passingScore={exam.passing_score}
                questions={questions}
            />
        </div>
    );
}
