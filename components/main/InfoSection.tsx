'use client';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function InfoSection() {
    const [activeTab, setActiveTab] = useState<'news' | 'notices' | 'gallery'>('news');

    const posts = {
        news: [
            { id: 1, title: 'KCA, 2025년도 우수 교육기관 선정', date: '2025.12.20' },
            { id: 2, title: '심리상담센터 MOU 체결 안내', date: '2025.12.15' },
            { id: 3, title: '제10회 학술 세미나 개최 결과 보고', date: '2025.12.10' },
            { id: 4, title: '동계 방학 기간 행정실 단축 근무 안내', date: '2025.12.01' },
            { id: 5, title: '홈페이지 서버 점검 사전 안내', date: '2025.11.28' },
        ],
        notices: [
            { id: 1, title: '[필독] 회원가입 시스템 개편 안내', date: '2026.01.02' },
            { id: 2, title: '자격증 발급 비용 조정 안내', date: '2025.12.30' },
            { id: 3, title: '강의 저작권 관련 주의사항', date: '2025.12.25' },
            { id: 4, title: '모바일 수강 환경 최적화 업데이트', date: '2025.12.20' },
            { id: 5, title: '1월 신규 강좌 오픈 일정', date: '2025.12.15' },
        ],
        gallery: []
    };

    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left: Tabbed Board */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-96">
                        <div className="flex border-b border-slate-100">
                            {['news', 'notices'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`flex-1 py-4 text-center font-bold text-lg transition-colors ${activeTab === tab
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    {tab === 'news' ? 'KCA 소식' : '공지사항'}
                                </button>
                            ))}
                        </div>
                        <div className="p-6 relative h-full">
                            <ul className="space-y-4">
                                {posts[activeTab as keyof typeof posts].map((post) => (
                                    <li key={post.id} className="flex justify-between items-center group cursor-pointer border-b border-slate-50 pb-2 last:border-0 hover:bg-slate-50 rounded px-2 transition-colors">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors shrink-0"></span>
                                            <span className="text-slate-700 group-hover:text-blue-700 truncate text-sm lg:text-base">
                                                {post.title}
                                            </span>
                                        </div>
                                        <span className="text-xs text-slate-400 shrink-0 ml-4 font-mono">{post.date}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="absolute top-6 right-6 text-slate-400 hover:text-blue-600">
                                <FaPlus />
                            </button>
                        </div>
                    </div>

                    {/* Right: Promotional Video */}
                    <div className="flex-1 h-96 bg-black rounded-2xl overflow-hidden shadow-lg relative group">
                        <img
                            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop"
                            alt="Lecture"
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer border border-white/50">
                                <svg className="w-6 h-6 ml-1 fill-white" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold">KCA 아카데미 소개영상</h3>
                            <p className="text-sm text-white/80 mt-2">꿈을 향한 도전, KCA가 함께합니다.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
