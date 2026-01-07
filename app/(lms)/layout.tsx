import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import LmsHeader from "@/components/common/LmsHeader";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "KCA 아카데미 | 내 강의실",
    description: "KCA 자격증 교육 플랫폼",
};

import LmsSidebar from "@/components/lms/LmsSidebar";

export default async function LmsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch profile data if user exists
    let profile = null;
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
        profile = data;
    }

    return (
        <html lang="ko">
            <body className={`${inter.className} bg-slate-50`}>
                <LmsHeader user={user} />
                <div className="flex pt-16 min-h-screen">
                    {/* Sidebar: hidden on mobile, fixed on desktop */}
                    <LmsSidebar user={user} profile={profile} />

                    {/* Main Content Area: Adjusts margin for sidebar on desktop */}
                    <main className="flex-1 lg:ml-64 p-6 lg:p-10 w-full overflow-x-hidden">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}
