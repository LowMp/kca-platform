'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const MainSlider = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
            title: "대한민국의 미래를 여는",
            subtitle: "한국자격증협회",
            desc: "전문적인 자격 관리와 인재 양성을 선도합니다"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
            title: "꿈을 향한 첫걸음",
            subtitle: "자격증 취득",
            desc: "당신의 새로운 도전을 KCA가 응원합니다"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
            title: "최고의 교육 파트너",
            subtitle: "전문가 양성",
            desc: "체계적인 커리큘럼으로 전문가를 배출합니다"
        }
    ];

    return (
        <section className="relative w-full h-[600px] md:h-[700px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
                            </div>

                            {/* Content */}
                            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white">
                                <span className="inline-block px-4 py-2 border border-white/50 rounded-full text-sm mb-4 w-fit animate-fade-in-up">
                                    {slide.subtitle}
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in-up delay-100">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-slate-200 animate-fade-in-up delay-200">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default MainSlider;
