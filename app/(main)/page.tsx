import NewHero from "@/components/home/NewHero";
import QuickMenu from "@/components/home/QuickMenu";
import InfoTabs from "@/components/home/InfoTabs";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* KWWA Style Hero Section */}
      <NewHero />

      {/* Quick Menu Icons */}
      <QuickMenu />

      {/* Information Tabs (News, Edu, Library) */}
      <InfoTabs />

      {/* Statistics Section (Re-styled to match) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-[40px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[120px] opacity-20 -mr-32 -mt-32"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
              <div>
                <h4 className="text-4xl md:text-5xl font-extrabold mb-3 text-blue-400">150+</h4>
                <p className="text-slate-400 font-medium">운영 자격증</p>
              </div>
              <div>
                <h4 className="text-4xl md:text-5xl font-extrabold mb-3 text-blue-400">50,000+</h4>
                <p className="text-slate-400 font-medium">누적 발급</p>
              </div>
              <div>
                <h4 className="text-4xl md:text-5xl font-extrabold mb-3 text-blue-400">120+</h4>
                <p className="text-slate-400 font-medium">교육 기관</p>
              </div>
              <div>
                <h4 className="text-4xl md:text-5xl font-extrabold mb-3 text-blue-400">98%</h4>
                <p className="text-slate-400 font-medium">합격률</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
