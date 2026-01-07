'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoTabs = () => {
    const [activeTab, setActiveTab] = useState('news');

    const tabs = [
        { id: 'news', label: '주요소식' },
        { id: 'edu', label: '교육일정' },
        { id: 'library', label: '최신자료' },
    ];

    const content: Record<string, { title: string; date: string; category: string }[]> = {
        news: [
            { title: 'KCA 제10회 자격증 수여식 성료', date: '2026.01.05', category: '행사' },
            { title: '신규 전문 강사 교육 과정 개설 안내', date: '2026.01.02', category: '교육' },
            { title: '우수 보청기사 회원 인터뷰: 최우석 원장', date: '2025.12.28', category: '소식' },
            { title: '협회 홈페이지 모바일 최적화 업데이트', date: '2025.12.20', category: '공지' },
        ],
        edu: [
            { title: '2026년 1회 정기 보청기사 시험 안내', date: 'D-30', category: '자격검정' },
            { title: '현장 실무 역량 강화 심화 과정', date: 'D-15', category: '기술교육' },
            { title: '디지털 청능 훈련 시스템 워크숍', date: 'D-7', category: '특강' },
        ],
        library: [
            { title: '2025년 산업 동향 리포트 (자격증 편)', date: '2026.01.01', category: '리포트' },
            { title: '윤리 규정 가이드북 PDF 다운로드', date: '2025.12.15', category: '규정' },
        ]
    };

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">KCA Information</h2>
                        <p className="text-slate-500">협회의 새로운 소식과 주요 일정을 확인하세요.</p>
                    </div>
                    <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-slate-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="wait">
                        {content[activeTab].map((item, idx) => (
                            <motion.div
                                key={`${activeTab}-${idx}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
                            >
                                <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-4 ${activeTab === 'news' ? 'bg-blue-50 text-blue-600' :
                                        activeTab === 'edu' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                                    }`}>
                                    {item.category}
                                </span>
                                <h4 className="text-lg font-bold text-slate-800 mb-6 leading-snug group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h4>
                                <div className="flex justify-between items-center text-sm text-slate-400 font-medium">
                                    <span>{item.date}</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600">→</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InfoTabs;
