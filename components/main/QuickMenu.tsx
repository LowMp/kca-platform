import Link from 'next/link';
import { FaLaptopCode, FaUserGraduate, FaTruck, FaBullhorn, FaChalkboardTeacher } from 'react-icons/fa';

export default function QuickMenu() {
    const menus = [
        { icon: FaLaptopCode, label: '수강신청', href: '/dashboard', color: 'bg-blue-50 text-blue-600' },
        { icon: FaUserGraduate, label: '자격시험', href: '/dashboard/exam/599fa9b9-ac3d-4612-844b-2762e322a004', color: 'bg-indigo-50 text-indigo-600' }, // Link to specific exam or generic list
        { icon: FaChalkboardTeacher, label: '나의 강의실', href: '/dashboard', color: 'bg-purple-50 text-purple-600' },
        { icon: FaTruck, label: '자격증 배송', href: '/dashboard/certificates', color: 'bg-green-50 text-green-600' },
        { icon: FaBullhorn, label: '공지사항', href: '#', color: 'bg-slate-50 text-slate-600' },
    ];

    return (
        <section className="relative z-30 -mt-10 lg:-mt-16 px-4 mb-20">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 lg:p-10">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 divide-x-0 lg:divide-x divide-slate-100">
                    {menus.map((menu, idx) => (
                        <Link
                            key={idx}
                            href={menu.href}
                            className="group flex flex-col items-center justify-center text-center gap-4 p-2 hover:-translate-y-1 transition-transform"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md transition-shadow ${menu.color}`}>
                                <menu.icon />
                            </div>
                            <span className="font-bold text-slate-700 text-sm lg:text-base group-hover:text-blue-700 transition-colors">
                                {menu.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
