import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';

interface LectureCardProps {
    id: string;
    title: string;
    period: string;
    progress: number;
    status: 'learning' | 'completed' | 'expired';
    thumbnail?: string;
}

export default function LectureCard({ id, title, period, progress, status, thumbnail }: LectureCardProps) {
    const isLearning = status === 'learning';

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col md:flex-row items-center gap-6">
            {/* Thumbnail / Icon area */}
            <div className="w-full md:w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                {thumbnail ? (
                    <img src={thumbnail} alt={title} className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <FaPlayCircle className="text-4xl" />
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2">
                    {isLearning && (
                        <span className="px-2.5 py-0.5 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 rounded">
                            학습중
                        </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{title}</h3>
                </div>

                <div className="text-sm text-slate-500 space-y-1 mb-4">
                    <p>수강기간: <span className="text-slate-700">{period}</span></p>
                    <p className="text-xs text-slate-400">진도율 60% 이상 시 시험응시 가능</p>
                </div>

                {/* Progress Bar (Mobile only, or if desired) */}
                <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Right Action Area */}
            <div className="flex flex-col items-center justify-center w-full md:w-auto gap-3 shrink-0">
                <div className="text-center">
                    <p className="text-xs text-slate-400 mb-1">출석률</p>
                    <p className="text-3xl font-bold text-blue-600">{progress}%</p>
                </div>
                <Link
                    href={`/dashboard/lecture/${id}`}
                    className="w-full md:w-auto px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors text-center"
                >
                    강의실 입장
                </Link>
            </div>
        </div>
    );
}
