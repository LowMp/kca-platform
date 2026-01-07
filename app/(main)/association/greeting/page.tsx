import SubSidebar from '@/components/common/SubSidebar';
import Image from 'next/image';

const GreetingPage = () => {
    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Page Banner */}
            <div className="bg-slate-900 py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white mb-4">협회소개</h1>
                    <p className="text-slate-400">대한민국 자격증의 표준, KCA가 만들어갑니다.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
                {/* Sidebar */}
                <SubSidebar
                    title="협회소개"
                    items={["협회장인삿말", "연혁 및 비전", "조직 및 대의원", "협회정관", "보청기사 윤리규정"]}
                    activeItem="협회장인삿말"
                />

                {/* Main Content */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-200">
                        협회장 인삿말
                    </h2>

                    <div className="prose max-w-none text-slate-600">
                        {/* President Image */}
                        <div className="mb-8 relative w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden shadow-md">
                            {/* Placeholder for President's Image */}
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                                <span className="text-slate-500 font-medium text-lg">[협회장 사진 영역]</span>
                            </div>
                        </div>

                        <div className="space-y-6 text-lg leading-relaxed">
                            <p className="font-bold text-2xl text-slate-800">
                                "새로운 도전을 꿈꾸는 여러분의 동반자가 되겠습니다."
                            </p>
                            <p>
                                안녕하십니까? 한국자격증협회(KCA) 협회장입니다.
                            </p>
                            <p>
                                급변하는 시대적 흐름 속에서 평생교육과 자기개발의 중요성은 날로 커지고 있습니다.
                                우리 협회는 이러한 시대적 요구에 부응하여 투명하고 공정한 자격 검정을 통해
                                대한민국 산업 발전에 기여할 수 있는 전문 인재를 양성하는 데 앞장서고 있습니다.
                            </p>
                            <p>
                                KCA는 단순한 자격증 발급을 넘어, 여러분의 꿈과 미래를 함께 설계하는
                                든든한 파트너가 되고자 합니다. 체계적인 교육 시스템과 엄격한 자격 관리,
                                그리고 회원 여러분을 위한 다양한 지원 프로그램을 통해 최고의 가치를 제공하겠습니다.
                            </p>
                            <p>
                                여러분의 끊임없는 도전과 열정을 응원하며,
                                한국자격증협회가 그 여정에 함께하겠습니다.
                            </p>
                            <p>
                                감사합니다.
                            </p>

                            <div className="mt-12 text-right">
                                <p className="text-xl font-bold text-slate-800">한국자격증협회 회장</p>
                                <div className="text-4xl font-serif text-blue-600 mt-2 font-bold opacity-80 decoration-slice">K C A</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GreetingPage;
