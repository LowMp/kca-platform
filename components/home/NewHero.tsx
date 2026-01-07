'use client';

import { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

const NewHero = () => {
    const [activeTab, setActiveTab] = useState('notice');

    const tabs = [
        { id: 'notice', label: '공지사항' },
        { id: 'bid', label: '입찰정보' },
        { id: 'news', label: '보도자료' },
    ];

    const dummyData: Record<string, string[]> = {
        notice: ['[공지] 2026년도 상반기 자격검정 일정 안내', '[안내] 설 연휴 기간 고객센터 운영 시간 변경', '제15회 보청기사 보수교육 수강 안내'],
        bid: ['[입찰] 2026년 홍보용 홍보물 제작 업체 선정', '[공고] 시스템 유지보수 용역 업체 입찰'],
        news: ['[뉴스] KCA, 산업인력공단과 업무협약 체결', '[기사] 보청기사 자격증, 취업 시장에서 주목'],
    };

    return (
        <section className="relative w-full min-h-[600px] flex items-center overflow-hidden kwwa-pattern">
            {/* Animated Wave Background Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none">
                <svg className="absolute bottom-0 w-[200%] h-full animate-wave" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#003399"></path>
                </svg>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Slogan Section */}
                <div className="text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mb-6">
                            대한민국 자격 검정의 표준
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                            상하수도 서비스<br />
                            선진화를 통한<br />
                            국민 삶의 질 향상
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 max-w-lg">
                            KCA는 공정한 평가와 체계적인 교육으로<br />
                            산업 현장의 최고의 전문가를 육성합니다.
                        </p>
                        <div className="flex space-x-4">
                            <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                                교육 신청하기
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-700 rounded-xl font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                                자격증 안내
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Floating Info Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass rounded-3xl shadow-2xl overflow-hidden border border-white/40 max-w-lg mx-auto lg:ml-auto w-full"
                >
                    <div className="flex border-b border-slate-100 bg-white/50">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-5 text-sm font-bold transition-all ${activeTab === tab.id
                                        ? 'text-blue-600 bg-white border-b-2 border-blue-600'
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="p-8 bg-white/80 min-h-[300px]">
                        <ul className="space-y-4">
                            {dummyData[activeTab].map((item, idx) => (
                                <li key={idx} className="group cursor-pointer">
                                    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all">
                                        <span className="text-slate-700 font-medium truncate pr-4 group-hover:text-blue-700">
                                            {item}
                                        </span>
                                        <span className="text-xs text-slate-400 whitespace-nowrap">2026.01.07</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-8 py-3 text-sm font-bold text-slate-500 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all">
                            더 보기 +
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default NewHero;
