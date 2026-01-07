'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { updateProfile } from '@/app/auth/profile-actions';

interface MyPageFormProps {
    user: User;
    profile: any;
}

export default function MyPageForm({ user, profile }: MyPageFormProps) {
    const [activeTab, setActiveTab] = useState('info');
    const [message, setMessage] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        const result = await updateProfile(formData);
        if (result?.error) setMessage(result.error);
        if (result?.success) setMessage(result.success);
    }

    return (
        <div>
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-8">
                {['info', 'password', 'delete'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setMessage(null); }}
                        className={`px-6 py-3 font-bold text-sm transition-colors border-b-2 ${activeTab === tab
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab === 'info' && '회원정보 수정'}
                        {tab === 'password' && '비밀번호 변경'}
                        {tab === 'delete' && '회원 탈퇴'}
                    </button>
                ))}
            </div>

            {message && (
                <div className={`p-4 mb-6 rounded-lg text-sm font-bold ${message.includes('오류') ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {message}
                </div>
            )}

            {/* Info Tab */}
            {activeTab === 'info' && (
                <form action={handleSubmit} className="max-w-xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                            <input name="name" type="text" defaultValue={profile?.name || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">생년월일</label>
                            <input name="birthdate" type="date" defaultValue={profile?.birthdate || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">아이디 (이메일)</label>
                        <input type="text" value={user.email} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" />
                        <p className="text-xs text-slate-400 mt-1">* 아이디는 변경할 수 없습니다.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">휴대폰 번호</label>
                        <input name="phone" type="tel" defaultValue={profile?.phone || ''} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all" />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">주소</label>
                        <input name="address" type="text" defaultValue={profile?.address || ''} placeholder="상세 주소를 입력해주세요" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-all" />
                    </div>

                    <div className="pt-4">
                        <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            정보 수정 저장
                        </button>
                    </div>
                </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
                <div className="max-w-xl text-center py-12">
                    <p className="text-slate-500 mb-4">비밀번호 변경 기능은 보안을 위해 별도의 이메일 인증이 필요할 수 있습니다.</p>
                    <button className="px-6 py-3 border border-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                        비밀번호 재설정 메일 발송
                    </button>
                </div>
            )}

            {/* Delete Tab */}
            {activeTab === 'delete' && (
                <div className="max-w-xl">
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100 mb-6">
                        <h4 className="font-bold text-red-600 mb-2">⚠ 회원 탈퇴 시 유의사항</h4>
                        <ul className="list-disc list-inside text-sm text-red-500 space-y-1">
                            <li>모든 수강 내역과 자격증 발급 기록이 삭제됩니다.</li>
                            <li>삭제된 계정은 복구할 수 없습니다.</li>
                        </ul>
                    </div>
                    <button className="px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors">
                        회원 탈퇴 신청
                    </button>
                </div>
            )}
        </div>
    );
}
