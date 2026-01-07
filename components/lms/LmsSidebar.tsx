'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface LmsSidebarProps {
    user: User | null;
    profile?: any;
}

const MENU_ITEMS = [
    { title: '수강중인 과정', href: '/dashboard' },
    { title: '자격증 발급', href: '/dashboard/certificates' },
    { title: '나의 합격후기', href: '/dashboard/reviews' },
];

export default function LmsSidebar({ user, profile }: LmsSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block h-[calc(100vh-64px)] fixed top-16 left-0 overflow-y-auto">
            {/* User Profile */}
            <div className="p-6 border-b border-slate-100">
                <div className="flex items-center space-x-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                        {profile?.name?.[0] || user?.email?.[0].toUpperCase()}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">{profile?.name || '회원'} 님</h2>
                        <span className="text-xs text-slate-500">나의 강의실</span>
                    </div>
                </div>
                <div className="flex mt-3 text-xs text-slate-400 space-x-2">
                    <Link href="/mypage" className="flex-1 py-1.5 text-center bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors">
                        정보수정
                    </Link>
                    <button className="flex-1 py-1.5 text-center bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 transition-colors">
                        로그아웃
                    </button>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4">
                <ul className="space-y-1">
                    {MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Customer Center Widget */}
            <div className="p-4 mt-auto">
                <div className="bg-slate-800 rounded-xl p-5 text-white bg-[url('https://korea-kca.com/img/main/customer_icon.png')] bg-no-repeat bg-[right_10px_bottom_10px] bg-[length:40px]">
                    <h3 className="text-xs text-slate-400 mb-1">고객지원센터</h3>
                    <p className="text-xl font-bold mb-3">1600-6735</p>
                    <div className="text-[10px] text-slate-400 space-y-0.5 mb-4">
                        <p>평일 09:00 ~ 18:00</p>
                        <p>점심 12:00 ~ 13:00</p>
                        <p>(토/일/공휴일 휴무)</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="py-1.5 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors">
                            1:1 상담
                        </button>
                        <button className="py-1.5 text-xs bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition-colors">
                            수강 FAQ
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
