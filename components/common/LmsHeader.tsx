'use client';

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { logout } from '@/app/auth/actions';

interface LmsHeaderProps {
    user: User | null;
}

const LmsHeader = ({ user }: LmsHeaderProps) => {
    return (
        <header className="bg-slate-900 text-white h-16 fixed top-0 w-full z-50">
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter hover:text-blue-400 transition-colors">
                        KCA <span className="text-blue-500">ACADEMY</span>
                    </Link>
                    <nav className="hidden md:block">
                        <ul className="flex space-x-6 text-sm font-medium text-slate-400">
                            <li><Link href="/dashboard" className="hover:text-white transition-colors">내 강의실</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">시험센터</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">학습문의</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-xs text-slate-400 hidden sm:inline">{user.email}님</span>
                            <form action={logout}>
                                <button className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
                                    로그아웃
                                </button>
                            </form>
                            <Link href="/mypage" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold hover:ring-2 hover:ring-white transition-all">
                                {user.email?.[0].toUpperCase()}
                            </Link>
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm bg-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            로그인
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default LmsHeader;
