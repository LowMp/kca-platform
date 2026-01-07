'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProgress(lectureId: string, isCompleted: boolean = true) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User not authenticated')
    }

    // Upsert progress: if exists update, if not insert
    const { error } = await supabase
        .from('learning_progress')
        .upsert(
            {
                user_id: user.id,
                lecture_id: lectureId,
                is_completed: isCompleted,
                last_watched_at: new Date().toISOString(),
            },
            { onConflict: 'user_id, lecture_id' }
        )

    if (error) {
        console.error('Error updating progress:', error)
        throw new Error('Failed to update progress')
    }

    revalidatePath('/dashboard')
    revalidatePath(`/dashboard/lecture/${lectureId}`)
}
