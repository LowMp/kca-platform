'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaBell } from 'react-icons/fa';

export default function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-slate-900">
            {/* Background Gradient & Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between py-20 lg:py-32 gap-12">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8 animate-fade-in-up">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-800/50 border border-blue-700 text-blue-200 text-sm font-semibold mb-4">
                            2026년도 신규 과정 개강 🎓
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
                            미래를 여는 <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                                전문 상담 심리 교육
                            </span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            한국상담심리교육원(KCA)은 체계적인 커리큘럼과 실무 중심 교육으로<br className="hidden lg:block" />
                            최고의 전문 상담사를 양성합니다. 지금 바로 시작하세요.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 group">
                                수강신청 바로가기
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="#info" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-sm border border-white/10 flex items-center justify-center">
                                교육과정 안내
                            </Link>
                        </div>
                    </div>

                    {/* Right: Floating Notice Card (Automated Slider) */}
                    <div className="flex-1 w-full max-w-md lg:max-w-lg lg:translate-x-10">
                        <NoticeSlider />
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 w-full leading-none z-20">
                <svg className="block w-full h-12 lg:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
                </svg>
            </div>
        </section>
    );
}

function NoticeSlider() {
    const notices = [
        { id: 1, type: '공지', title: '2026년 1학기 수강생 모집 안내', date: '2026.01.05' },
        { id: 2, type: '시험', title: '제45회 심리상담사 1급 자격시험 일정', date: '2026.01.12' },
        { id: 3, type: '행사', title: '신년맞이 무료 특강: 현대인의 우울', date: '2026.01.20' },
    ];

    // Simple auto-slide logic could go here, for now static or CSS animated
    // For MVP, just showing a list card looks cleaner than a moving carousel sometimes

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 relative animate-float">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <FaBell className="text-blue-500" />
                    주요 공지사항
                </h3>
                <Link href="/notices" className="text-xs text-slate-500 hover:text-blue-600 font-medium">
                    전체보기 +
                </Link>
            </div>
            <ul className="space-y-4">
                {notices.map((notice) => (
                    <li key={notice.id} className="group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${notice.type === '공지' ? 'bg-blue-100 text-blue-600' :
                                    notice.type === '시험' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                }`}>
                                {notice.type}
                            </span>
                            <span className="text-slate-700 text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-1 flex-1">
                                {notice.title}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 pl-11">{notice.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
