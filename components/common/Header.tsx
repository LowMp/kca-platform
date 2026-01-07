'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '@supabase/supabase-js';
import { logout } from '@/app/auth/actions';

interface HeaderProps {
    user: User | null;
}

const MENU_ITEMS = [
    {
        title: "협회소개",
        items: ["협회장인삿말", "연혁 및 비전", "조직 및 대의원", "협회정관", "보청기사 윤리규정"]
    },
    {
        title: "알림마당",
        items: ["공지사항", "contact", "자격검정원", "자격증유지 및 갱신", "자격증취득방법", "관련법규"]
    },
    {
        title: "회원안내",
        items: ["회원자격", "보청기사현황"]
    },
    {
        title: "교육안내",
        items: ["자격증수료교육", "현장보수교육", "동영상보수교육"]
    },
    {
        title: "정보안내",
        items: ["총회 및 이사회", "협회활동", "보청기사월간", "대학교/대학원", "유관기관"]
    },
    {
        title: "나눔마당",
        items: ["직원구인", "직원구직", "병원매매", "보청기점매매", "병원장비 및 청력장비 매매", "자료실"]
    }
];

const Header = ({ user }: HeaderProps) => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    return (
        <header
            className="fixed top-0 w-full z-50 bg-white shadow-sm"
            onMouseLeave={() => setActiveMenu(null)}
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between relative z-50 bg-white">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-slate-800">
                    KOREA<span className="text-blue-600">KCA</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center h-full">
                    <ul className="flex h-full">
                        {MENU_ITEMS.map((menu, index) => (
                            <li
                                key={index}
                                className="h-full flex items-center px-6 relative group cursor-pointer"
                                onMouseEnter={() => setActiveMenu(index)}
                            >
                                <span className={`text-base font-medium transition-colors ${activeMenu !== null ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'}`}>
                                    {menu.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login/Signup/Logout */}
                <div className="hidden lg:flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm font-medium text-slate-600">
                                {user.email?.split('@')[0]}님
                            </span>
                            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                                강의실 입장
                            </Link>
                            <form action={logout}>
                                <button className="text-sm font-medium text-slate-600 hover:text-red-600 ml-2">
                                    로그아웃
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                                로그인
                            </Link>
                            <Link href="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
                {activeMenu !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-0 w-full bg-slate-50 border-t border-slate-100 shadow-lg z-40 py-8"
                    >
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-6 gap-8">
                                {MENU_ITEMS.map((menu, index) => (
                                    <div key={index} className={`opacity-0 animate-fade-in-up ${activeMenu === index ? 'opacity-100 bg-blue-50/50 -m-4 p-4 rounded-xl' : 'opacity-50'}`} style={{ animationDelay: `${index * 50}ms` }}>
                                        <h4 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">{menu.title}</h4>
                                        <ul className="space-y-2">
                                            {menu.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>
                                                    <Link
                                                        href={item === "협회장인삿말" ? "/association/greeting" : "#"}
                                                        className="text-sm text-slate-600 hover:text-blue-600 hover:translate-x-1 block transition-all"
                                                    >
                                                        {item}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
