'use client';

import { useState } from 'react';
import { submitExam } from '@/app/lms/exam-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
    id: string;
    question_text: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    order_index: number;
}

interface ExamFormProps {
    examId: string;
    passingScore: number;
    questions: Question[];
}

export default function ExamForm({ examId, passingScore, questions }: ExamFormProps) {
    const router = useRouter();
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ score: number; isPassed: boolean } | null>(null);

    const handleOptionChange = (questionId: string, optionIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length < questions.length) {
            alert('모든 문제에 답을 선택해주세요.');
            return;
        }

        // if (!confirm('정말 제출하시겠습니까?')) return; // Removed for better UX

        setIsSubmitting(true);
        try {
            const res = await submitExam(examId, answers);
            if (res.success) {
                setResult({ score: res.score!, isPassed: res.isPassed! });
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error(error);
            alert('제출 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (result) {
        return (
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-10 text-center border border-slate-200 mt-10">
                <div className="text-6xl mb-6">{result.isPassed ? '🎉' : '😢'}</div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {result.isPassed ? '합격입니다!' : '아쉽게도 불합격입니다.'}
                </h2>
                <div className="text-5xl font-black text-blue-600 my-6">
                    {result.score}점
                </div>
                <p className="text-slate-500 mb-8">
                    합격 기준: {passingScore}점 이상
                </p>

                <div className="flex gap-3 justify-center">
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        대시보드로 이동
                    </Link>
                    {!result.isPassed && (
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            재응시하기
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {questions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 mb-6 shadow-sm">
                    <div className="flex items-start gap-4 mb-6">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
                            {idx + 1}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug pt-0.5">
                            {q.question_text}
                        </h3>
                    </div>

                    <div className="space-y-3 pl-12">
                        {[q.option_1, q.option_2, q.option_3, q.option_4].map((opt, optIdx) => (
                            <label
                                key={optIdx}
                                className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${answers[q.id] === optIdx + 1
                                    ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                                    : 'hover:bg-slate-50 border-slate-200'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={`q_${q.id}`}
                                    value={optIdx + 1}
                                    checked={answers[q.id] === optIdx + 1}
                                    onChange={() => handleOptionChange(q.id, optIdx + 1)}
                                    className="w-5 h-5 text-blue-600 border-slate-300 focus:ring-blue-500"
                                />
                                <span className={`text-slate-700 ${answers[q.id] === optIdx + 1 ? 'font-bold text-blue-900' : ''}`}>
                                    {opt}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <div className="text-center py-6">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-12 py-4 bg-slate-900 text-white font-bold text-lg rounded-xl hover:bg-slate-800 transition-transform active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? '채점 중...' : '답안 제출하기'}
                </button>
            </div>
        </div>
    );
}
