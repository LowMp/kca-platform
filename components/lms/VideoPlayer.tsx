'use client';

import { useState } from 'react';
import { updateProgress } from '@/app/lms/actions';
import { useRouter } from 'next/navigation';

interface VideoPlayerProps {
    lectureId: string;
    videoUrl: string;
    title: string;
    description: string | null;
    isCompletedBase: boolean;
}

export default function VideoPlayer({
    lectureId,
    videoUrl,
    title,
    description,
    isCompletedBase,
}: VideoPlayerProps) {
    const [isCompleted, setIsCompleted] = useState(isCompletedBase);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleComplete = async () => {
        setIsLoading(true);
        try {
            await updateProgress(lectureId, true);
            setIsCompleted(true);
            // Optional: alert('학습이 완료되었습니다!'); 
        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Video Area */}
            <div className="aspect-video bg-black w-full relative">
                <iframe
                    src={videoUrl}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            {/* Info Area */}
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    <button
                        onClick={handleComplete}
                        disabled={isCompleted || isLoading}
                        className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md active:scale-95 ${isCompleted
                            ? 'bg-green-100 text-green-700 border border-green-200 cursor-default'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                            }`}
                    >
                        {isLoading ? '처리중...' : isCompleted ? '✅ 학습 완료' : '수강 완료 체크'}
                    </button>
                </div>

                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {description || '강의 설명이 없습니다.'}
                </p>
            </div>
        </div>
    );
}
