import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LectureCard from '@/components/lms/LectureCard';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 1. Fetch Lectures
    const { data: lectures } = await supabase
        .from('lectures')
        .select('*')
        .order('order_index', { ascending: true });

    // 2. Fetch User Progress
    const { data: progressList } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id);

    // Helper: Calculate progress for a specific lecture (simple completed check)
    // For now, we just pass whether it is completed. 
    // If you want % per lecture (e.g. video position), that's more complex.
    // Here we will calculate the *COURSE* progress overall.
    const totalLectures = lectures?.length || 0;
    const completedLectures = progressList?.filter(p => p.is_completed).length || 0;
    const overallProgress = totalLectures > 0 ? Math.round((completedLectures / totalLectures) * 100) : 0;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Breadcrumb / Title */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">수강중인 과정</h1>
                <p className="text-slate-500 text-sm mt-1">나의 학습 현황을 한눈에 확인하세요.</p>
            </div>

            {/* Notice Box */}
            <div className="bg-slate-100 border border-slate-200 rounded-lg p-5 mb-8 text-sm text-slate-700">
                <strong className="text-slate-900 block mb-2">📢 수강 시 학습자 유의사항</strong>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                    <li>진도율 <strong>100%</strong> 달성 시 자격증 발급이 가능합니다.</li>
                    <li>시험은 진도율 80% 이상부터 응시 가능합니다.</li>
                    <li>모바일에서도 수강 가능하며, 이어보기 기능이 제공됩니다.</li>
                </ul>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
                <button className="px-6 py-3 text-blue-600 font-bold border-b-2 border-blue-600">
                    강의 신청내역
                </button>
                <button className="px-6 py-3 text-slate-500 font-medium hover:text-slate-700">
                    마감된 강의
                </button>
            </div>

            {/* Overall Course Progress Card (Optional sweetener) */}
            <div className="mb-8 p-6 bg-white rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">심리상담사 1급 과정</h2>
                    <p className="text-slate-500 text-sm">수강기간: 2024.01.01 ~ 2024.12.31 (무제한)</p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
                    <div className="text-xs text-slate-400">총 진도율</div>
                </div>
            </div>

            {/* Lecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lectures?.map((lecture) => {
                    const isCompleted = progressList?.find(p => p.lecture_id === lecture.id)?.is_completed || false;
                    const progressValue = isCompleted ? 100 : 0; // Simple logic for MVP

                    return (
                        <div key={lecture.id} className="relative">
                            <LectureCard
                                id={lecture.id}
                                title={lecture.title}
                                period={`${lecture.duration_minutes}분`}
                                progress={progressValue}
                                status={isCompleted ? 'completed' : 'learning'}
                            />
                            {isCompleted && (
                                <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                    ✅ 완료
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {(!lectures || lectures.length === 0) && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">등록된 강의가 없습니다.</p>
                </div>
            )}

            {/* Exam Section */}
            <div className="mt-12 pt-12 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">🏆 자격증 시험 응시</h2>
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">심리상담사 1급 자격시험</h3>
                        <p className="text-slate-500 text-sm">진도율 60% 이상 시 응시 가능</p>
                    </div>
                    {/* For MVP, we fetch the first exam ID dynamically or hardcode the link if we know it. 
                        Ideally we fetch exams here. Let's assume we want to link to the first exam found. 
                        Since this is a server component, we can fetch it. */}
                    <ExamLinkPlaceholder />
                </div>
            </div>
        </div>
    );
}

// Temporary internal component to fetch exam ID (colocated for speed)
async function ExamLinkPlaceholder() {
    const supabase = await createClient();
    const { data: exams } = await supabase.from('exams').select('id').limit(1).single();

    if (!exams) return <span className="text-slate-400">시험 준비중</span>;

    return (
        <Link
            href={`/dashboard/exam/${exams.id}`}
            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
            시험 응시하기
        </Link>
    );
}
