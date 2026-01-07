import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import MyPageForm from './MyPageForm';

export default async function MyPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">마이페이지</h1>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <MyPageForm user={user} profile={profile} />
                </div>
            </div>
        </div>
    );
}
