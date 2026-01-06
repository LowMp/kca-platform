import MainSlider from "@/components/home/MainSlider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Slider */}
      <MainSlider />

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">공신력 있는 기관</h3>
            <p className="text-slate-600">등록된 민간자격을 정식으로<br />관리 및 발급하는 협회입니다.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">체계적인 교육</h3>
            <p className="text-slate-600">온라인 및 오프라인을 아우르는<br />전문적인 커리큘럼을 제공합니다.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">간편한 발급</h3>
            <p className="text-slate-600">신청부터 발급까지<br />원스톱 시스템을 운영합니다.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section (Parallax visual) */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold mb-2">150+</h4>
              <p className="text-blue-100">운영 자격증</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">50,000+</h4>
              <p className="text-blue-100">누적 발급</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">120+</h4>
              <p className="text-blue-100">교육 기관</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">98%</h4>
              <p className="text-blue-100">합격률</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
