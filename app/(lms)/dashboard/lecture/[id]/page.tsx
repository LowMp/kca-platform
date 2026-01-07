import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import VideoPlayer from '@/components/lms/VideoPlayer';
import { FaCheckCircle, FaPlayCircle, FaList } from 'react-icons/fa';

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 1. Fetch current lecture details
    const { data: lecture, error } = await supabase
        .from('lectures')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !lecture) {
        return <div className="p-10 text-center">강의를 찾을 수 없습니다.</div>;
    }

    // 2. Fetch user's progress for THIS lecture
    const { data: progress } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('lecture_id', id)
        .single();

    // 3. Fetch ALL lectures for the sidebar list (ordered)
    const { data: allLectures } = await supabase
        .from('lectures')
        .select('*')
        .order('order_index', { ascending: true });

    // 4. Check progress for ALL lectures (to show checkmarks in sidebar)
    const { data: allProgress } = await supabase
        .from('learning_progress')
        .select('lecture_id, is_completed')
        .eq('user_id', user.id);

    // Helper to check if a specific lecture is completed
    const isLectureCompleted = (lectId: string) => {
        return allProgress?.some((p) => p.lecture_id === lectId && p.is_completed) || false;
    };

    return (
        <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-100px)]">
            {/* Main Video Area (Left/Top) */}
            <div className="flex-1 overflow-y-auto pr-2">
                <VideoPlayer
                    lectureId={lecture.id}
                    videoUrl={lecture.video_url}
                    title={lecture.title}
                    description={lecture.description}
                    isCompletedBase={progress?.is_completed || false}
                />
            </div>

            {/* Curriculum Sidebar (Right/Bottom) */}
            <div className="w-full xl:w-96 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <FaList className="text-blue-500" />
                        강의 목차
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                        총 {allLectures?.length}강
                    </span>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-1">
                    {allLectures?.map((item) => {
                        const isActive = item.id === id;
                        const isDone = isLectureCompleted(item.id);
                        return (
                            <Link
                                key={item.id}
                                href={`/dashboard/lecture/${item.id}`}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-50 border border-blue-200'
                                    : 'hover:bg-slate-50 border border-transparent'
                                    }`}
                            >
                                <div className="flex-shrink-0">
                                    {isDone ? (
                                        <FaCheckCircle className="text-green-500 text-lg" />
                                    ) : (
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-blue-500' : 'border-slate-300'}`}>
                                            {isActive && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-slate-700'}`}>
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {item.duration_minutes}분
                                    </p>
                                </div>
                                {isActive && <FaPlayCircle className="text-blue-500 text-sm animate-pulse" />}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
