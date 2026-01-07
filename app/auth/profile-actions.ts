'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const updates = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        birthdate: formData.get('birthdate') as string,
        address: formData.get('address') as string,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

    if (error) {
        console.error('Profile Update Error:', error)
        return { error: '프로필 수정 중 오류가 발생했습니다.' }
    }

    revalidatePath('/mypage')
    return { success: '프로필이 성공적으로 수정되었습니다.' }
}
