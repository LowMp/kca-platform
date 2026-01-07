import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CertificateList from '@/components/lms/CertificateList';

export default async function CertificatesPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 1. Check if Exam passed (Psychology Level 1)
    // In a real app, we check specific exam IDs. Here checking ANY pass for simplicity or find by Title.
    const { data: results } = await supabase
        .from('exam_results')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_passed', true);

    const isPassed = results && results.length > 0;

    // 2. Check if Paid
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'paid');

    const isPaid = orders && orders.length > 0;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">자격증 발급 신청</h1>
                <p className="text-slate-500 text-sm mt-1">
                    시험에 합격하신 후 자격증 발급을 신청할 수 있습니다.
                </p>
            </div>

            <CertificateList
                isPassed={isPassed}
                isPaid={isPaid}
                userName={user.user_metadata.name || '회원'}
                email={user.email || ''}
            />

            <div className="mt-8 p-6 bg-slate-50 rounded-xl text-sm text-slate-600 space-y-2">
                <h4 className="font-bold text-slate-800 mb-2">📌 발급 안내</h4>
                <p>• 자격증은 상장형(종이)과 카드형이 패키지로 발송됩니다.</p>
                <p>• 발급 신청 후 배송까지 영업일 기준 3~5일이 소요됩니다.</p>
                <p>• 이미 발급 신청된 자격증은 취소/환불이 불가능할 수 있습니다.</p>
            </div>
        </div>
    );
}
