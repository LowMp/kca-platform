import HeroSection from '@/components/main/HeroSection';
import QuickMenu from '@/components/main/QuickMenu';
import InfoSection from '@/components/main/InfoSection';
import FloatingSidebar from '@/components/main/FloatingSidebar';

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Hybrid Hero Section */}
            <HeroSection />

            {/* 2. Quick Access Menu (Overlapping) */}
            <QuickMenu />

            {/* 3. Tabbed Info & Video Section */}
            <InfoSection />

            {/* 4. Floating Tools */}
            <FloatingSidebar />

            {/* Footer is handled by layout.tsx, but let's add some bottom spacing or extra content if needed */}
        </main>
    );
}
