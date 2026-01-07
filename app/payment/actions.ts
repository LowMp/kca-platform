'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface CreateOrderResult {
    success: boolean;
    merchant_uid?: string;
    message?: string;
}

export async function createOrder(productName: string, amount: number): Promise<CreateOrderResult> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: '로그인이 필요합니다.' };
    }

    // Generate unique order ID (time + random)
    const merchant_uid = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const { error } = await supabase
        .from('orders')
        .insert({
            user_id: user.id,
            merchant_uid,
            product_name: productName,
            amount,
            status: 'ready',
        });

    if (error) {
        console.error('Order creation failed:', error);
        return { success: false, message: '주문 생성 실패' };
    }

    return { success: true, merchant_uid };
}

export async function completePayment(merchant_uid: string, imp_uid: string): Promise<{ success: boolean; message?: string }> {
    const supabase = await createClient();

    // In a real world, we MUST verify the payment with Portone REST API using `imp_uid`
    // For MVP/Test mode, we skip the server-side verification with Portone API
    // and just update the status assuming client-side success is true (NOT SECURE for production)
    // TODO: Add Portone API Verification logic

    const { error } = await supabase
        .from('orders')
        .update({
            status: 'paid',
            imp_uid: imp_uid,
            paid_at: new Date().toISOString(),
        })
        .eq('merchant_uid', merchant_uid);

    if (error) {
        console.error('Payment completion failed:', error);
        return { success: false, message: '결제 처리 중 오류 발생' };
    }

    revalidatePath('/dashboard/certificates');
    return { success: true };
}

// TEMPORARY: For Dev Verification Only
export async function forcePayOrder() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, message: '로그인 필요' };

    const { error } = await supabase.from('orders').insert({
        user_id: user.id,
        merchant_uid: `dev_${Date.now()}`,
        product_name: '심리상담사 1급 자격증',
        amount: 50000,
        status: 'paid',
        paid_at: new Date().toISOString(),
    });

    if (error) return { success: false, message: error.message };
    revalidatePath('/dashboard/certificates');
    return { success: true };
}
