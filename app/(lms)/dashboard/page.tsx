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

    // Mock Data for demonstration
    const courses = [
        {
            id: 'mw-level1',
            title: '심리상담사 1급',
            period: '2025-12-29 ~ 2026-01-26',
            progress: 0,
            status: 'learning' as const,
        },
        {
            id: 'safety-edu',
            title: '안전교육 지도사 과정',
            period: '2025-01-10 ~ 2025-02-10',
            progress: 45,
            status: 'learning' as const,
        }
    ];

    return (
        <div className="container mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center text-xs text-slate-500 mb-6">
                <Link href="/" className="hover:text-blue-600">홈</Link>
                <span className="mx-2">&gt;</span>
                <span className="text-slate-800 font-medium">나의 강의실</span>
                <span className="mx-2">&gt;</span>
                <span className="text-blue-600 font-bold">수강중인 과정</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-slate-900 mb-6">수강중인 과정</h1>

            {/* Notice Box */}
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full mr-2"></span>
                    수강 시 학습자 유의사항
                </h3>
                <ul className="text-sm text-slate-600 space-y-1 pl-4 list-disc marker:text-slate-400">
                    <li>시험응시는 진도율 60% 이상 시 가능합니다.</li>
                    <li>자격증 발급 신청은 시험 합격 후 가능합니다.</li>
                    <li>수강기간이 만료되면 강의를 들으실 수 없습니다.</li>
                </ul>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200 mb-8 flex space-x-8">
                <button className="py-3 text-sm font-bold border-b-2 border-blue-600 text-blue-600">
                    강의 신청내역 ({courses.length})
                </button>
                <button className="py-3 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-slate-600 transition-colors">
                    마감된 강의 (0)
                </button>
            </div>

            {/* Course List */}
            <div className="space-y-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <LectureCard key={course.id} {...course} />
                    ))
                ) : (
                    <div className="text-center py-20 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
                        수강중인 강의가 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
