'use client';

import Link from 'next/link';

interface SubSidebarProps {
    title: string;
    items: string[];
    activeItem: string;
}

const SubSidebar = ({ title, items, activeItem }: SubSidebarProps) => {
    return (
        <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden sticky top-24">
                {/* Title */}
                <div className="bg-blue-600 text-white p-6">
                    <h3 className="text-xl font-bold">{title}</h3>
                </div>

                {/* Menu Items */}
                <ul className="divide-y divide-slate-100">
                    {items.map((item, index) => (
                        <li key={index}>
                            <Link
                                href="#"
                                className={`block px-6 py-4 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${item === activeItem ? 'bg-blue-50 text-blue-600 font-bold border-l-4 border-blue-600' : ''
                                    }`}
                            >
                                {item}
                                <span className="float-right text-slate-400">&gt;</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SubSidebar;
