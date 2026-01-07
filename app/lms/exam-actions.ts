'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface SubmitExamResult {
    success: boolean;
    score?: number;
    isPassed?: boolean;
    message?: string;
    totalQuestions?: number;
    correctCount?: number;
}

export async function submitExam(examId: string, answers: Record<string, number>): Promise<SubmitExamResult> {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { success: false, message: '로그인이 필요합니다.' }
    }

    // 1. Fetch Exam Meta & Questions (Correct Answers)
    const { data: exam } = await supabase
        .from('exams')
        .select('passing_score')
        .eq('id', examId)
        .single();

    const { data: questions } = await supabase
        .from('questions')
        .select('id, correct_option')
        .eq('exam_id', examId);

    if (!exam || !questions || questions.length === 0) {
        return { success: false, message: '시험 정보를 찾을 수 없습니다.' }
    }

    // 2. Calculate Score
    let correctCount = 0;
    const totalQuestions = questions.length;

    questions.forEach((q) => {
        if (answers[q.id] === q.correct_option) {
            correctCount++;
        }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = score >= exam.passing_score;

    // 3. Save Result
    const { error } = await supabase
        .from('exam_results')
        .upsert(
            {
                user_id: user.id,
                exam_id: examId,
                score: score,
                is_passed: isPassed,
                completed_at: new Date().toISOString(),
            },
            { onConflict: 'user_id, exam_id' }
        );

    if (error) {
        console.error('Error saving exam result:', error);
        return { success: false, message: '결과 저장에 실패했습니다.' }
    }

    revalidatePath('/dashboard');
    return {
        success: true,
        score,
        isPassed,
        totalQuestions,
        correctCount
    };
}
