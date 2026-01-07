'use client';

import Link from 'next/link';
import { FaArrowUp, FaCommentDots, FaTv } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function FloatingSidebar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`fixed bottom-8 right-6 lg:right-10 z-50 flex flex-col gap-3 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            {/* Chatbot / Consultation */}
            <Link href="#" className="w-12 h-12 lg:w-14 lg:h-14 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-full shadow-lg shadow-yellow-400/30 flex items-center justify-center transition-transform hover:scale-110" title="상담톡">
                <FaCommentDots className="text-xl lg:text-2xl" />
            </Link>

            {/* My Classroom */}
            <Link href="/dashboard" className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-transform hover:scale-110" title="나의 강의실">
                <FaTv className="text-lg lg:text-xl" />
            </Link>

            {/* Scroll Top */}
            <button
                onClick={scrollToTop}
                className="w-12 h-12 lg:w-14 lg:h-14 bg-white border border-slate-200 text-slate-600 hover:text-black hover:border-slate-300 rounded-full shadow-md flex items-center justify-center transition-transform hover:-translate-y-1"
                title="맨 위로"
            >
                <FaArrowUp className="text-lg" />
            </button>
        </div>
    );
}
