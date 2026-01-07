import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import UserTable from '@/components/admin/UserTable';

export default async function AdminUsersPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 1. Fetch current user role to check permissions
    const { data: currentUserProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    // 2. Security Check: Redirect if not admin
    if (currentUserProfile?.role !== 'admin') {
        redirect('/dashboard');
    }

    // 3. Fetch all profiles for the list
    const { data: displayedUsers, error } = await supabase
        .from('profiles')
        .select('*')
        .order('joined_at', { ascending: false }); // Newest members first

    if (error) {
        console.error('Error fetching users:', error);
        return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <div className="container mx-auto max-w-7xl">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">회원 관리</h1>
                <p className="text-slate-500 text-sm">
                    전체 등록된 회원 목록을 조회하고 관리할 수 있습니다.
                </p>
            </div>

            {/* User Table Component */}
            <UserTable users={displayedUsers || []} />
        </div>
    );
}
