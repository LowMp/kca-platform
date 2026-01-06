'use client';

import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-slate-800">
                    KOREA<span className="text-blue-600">KCA</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">협회소개</Link>
                    <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">자격증안내</Link>
                    <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">교육센터</Link>
                    <Link href="#" className="text-slate-600 hover:text-blue-600 transition-colors">커뮤니티</Link>
                </nav>

                {/* Login/Signup */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                        로그인
                    </Link>
                    <Link href="#" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                        회원가입
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
