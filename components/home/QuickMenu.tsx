'use client';

import { motion } from 'framer-motion';

const QUICK_MENUS = [
    { title: '회원라운지', icon: '👤', color: 'bg-blue-50 text-blue-600' },
    { title: '협회교육', icon: '🎓', color: 'bg-indigo-50 text-indigo-600' },
    { title: '자격증안내', icon: '📜', color: 'bg-cyan-50 text-cyan-600' },
    { title: '자료실', icon: '📂', color: 'bg-emerald-50 text-emerald-600' },
    { title: '공지사항', icon: '📢', color: 'bg-amber-50 text-amber-600' },
    { title: '고객상담', icon: '📞', color: 'bg-rose-50 text-rose-600' },
];

const QuickMenu = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
                    {QUICK_MENUS.map((menu, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group"
                        >
                            <div className={`w-16 h-16 md:w-20 md:h-20 ${menu.color} rounded-3xl flex items-center justify-center text-3xl md:text-4xl mb-4 shadow-sm group-hover:shadow-xl transition-all duration-300`}>
                                {menu.icon}
                            </div>
                            <span className="text-sm md:text-base font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                {menu.title}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickMenu;
