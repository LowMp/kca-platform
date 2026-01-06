import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">KOREA<span className="text-blue-500">KCA</span></h3>
                        <p className="text-sm leading-relaxed mb-4 text-slate-400">
                            한국자격증협회는 다양한 민간자격의 관리 및 발급을 통해<br />
                            전문 인력 양성과 직무 능력 향상에 기여하고 있습니다.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">바로가기</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">협회소개</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">자격증 조회</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">자주 묻는 질문</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">오시는 길</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">고객센터</h4>
                        <p className="text-2xl font-bold text-white mb-2">1588-0000</p>
                        <p className="text-sm text-slate-400">평일 09:00 - 18:00</p>
                        <p className="text-sm text-slate-400">(점심시간 12:00 - 13:00)</p>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} 한국자격증협회. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
                        <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
