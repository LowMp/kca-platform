import { forwardRef } from 'react';

interface CertificateProps {
    certificateNumber: string;
    userName: string;
    courseTitle: string;
    issueDate: string;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateProps>(({ certificateNumber, userName, courseTitle, issueDate }, ref) => {
    return (
        <div className="fixed top-0 left-0 -z-50 overflow-hidden">
            {/* 
               A4 Landscape Size at 96 DPI: ~1123px x 794px 
               We set a fixed width container for consistent PDF generation.
            */}
            <div
                ref={ref}
                className="w-[1123px] h-[794px] bg-white relative p-12 text-slate-900 font-serif"
                style={{ fontFamily: '"Noto Serif KR", serif' }} // Ensure font is loaded or use system serif
            >
                {/* Outer Border (Gold) */}
                <div className="w-full h-full border-[20px] border-double border-yellow-600 relative p-8">
                    {/* Inner Decorative Corner (CSS Simulation) */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-8 border-l-8 border-yellow-700"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-8 border-r-8 border-yellow-700"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-8 border-l-8 border-yellow-700"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-8 border-r-8 border-yellow-700"></div>

                    <div className="w-full h-full flex flex-col items-center justify-between py-16 text-center">

                        {/* Header */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
                                {/* Logo Placeholder */}
                                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    KCA
                                </div>
                                <span className="text-xl font-bold tracking-widest text-slate-600">한국자격증협회</span>
                            </div>

                            <h1 className="text-6xl font-black text-slate-900 tracking-widest mb-2" style={{ fontFamily: 'serif' }}>
                                자 격 증
                            </h1>
                            <p className="text-slate-500 font-medium">CERTIFICATE OF QUALIFICATION</p>
                        </div>

                        {/* Info Block */}
                        <div className="w-full max-w-2xl text-left space-y-2 mt-8 text-lg">
                            <div className="flex">
                                <span className="w-32 font-bold text-slate-500">자격번호 :</span>
                                <span className="font-bold">{certificateNumber}</span>
                            </div>
                            <div className="flex">
                                <span className="w-32 font-bold text-slate-500">성　　명 :</span>
                                <span className="font-bold text-2xl">{userName}</span>
                            </div>
                            <div className="flex">
                                <span className="w-32 font-bold text-slate-500">자격종목 :</span>
                                <span className="font-bold text-2xl text-blue-900">{courseTitle}</span>
                            </div>
                        </div>

                        {/* Main Text */}
                        <div className="my-10 space-y-4 max-w-3xl leading-relaxed text-xl">
                            <p>
                                위 사람은 본 협회가 주관하는 소정의 교육과정을 <br />
                                성실히 이수하고 자격검정에 합격하였으므로 <br />
                                이 증서를 수여합니다.
                            </p>
                            <p className="text-sm text-slate-400 mt-4 italic font-sans">
                                This is to certify that the above person has successfully completed <br />
                                the training course and passed the qualification test.
                            </p>
                        </div>

                        {/* Footer & Seal */}
                        <div className="w-full flex flex-col items-center gap-8 mt-4">
                            <p className="text-xl font-bold">{issueDate}</p>

                            <div className="relative">
                                <h2 className="text-4xl font-bold tracking-widest z-10 relative px-8">
                                    한국자격증협회장
                                </h2>
                                {/* Red Seal (Stamp) */}
                                <div className="absolute -top-6 -right-12 w-24 h-24 border-4 border-red-600 rounded opacity-80 rotate-12 flex items-center justify-center text-red-600 font-black text-xs shadow-sm bg-white/50 backdrop-blur-sm pointer-events-none mix-blend-multiply">
                                    <div className="border border-red-600 w-[90%] h-[90%] flex items-center justify-center text-center leading-none p-1">
                                        한국<br />자격<br />협회인
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

CertificateTemplate.displayName = 'CertificateTemplate';
export default CertificateTemplate;
