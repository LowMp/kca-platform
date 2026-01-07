'use client';

import Link from 'next/link';
import { signup } from '@/app/auth/actions';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

declare global {
    interface Window {
        daum: any;
    }
}

export default function SignupPage() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const isError = error === 'true';
    const errorMessage = error && error !== 'true' ? error : '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.';

    const [address, setAddress] = useState('');
    const [zonecode, setZonecode] = useState('');

    const handleComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setAddress(fullAddress);
        setZonecode(data.zonecode);
    };

    const openAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: handleComplete,
        }).open();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12">
            <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="lazyOnload" />

            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">회원가입</h1>
                    <p className="text-slate-500 mt-2">KCA의 새로운 회원이 되어주세요.</p>
                </div>

                <form action={signup} className="space-y-5">
                    {/* 이름 */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">
                            이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="홍길동"
                        />
                    </div>

                    {/* 휴대폰 번호 */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">
                            휴대폰 번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="010-1234-5678"
                        />
                    </div>

                    {/* 생년월일 */}
                    <div>
                        <label htmlFor="birthdate" className="block text-sm font-bold text-slate-700 mb-1">
                            생년월일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* 주소 */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">
                            주소 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                value={zonecode}
                                readOnly
                                placeholder="우편번호"
                                className="w-24 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 outline-none"
                            />
                            <button
                                type="button"
                                onClick={openAddressSearch}
                                className="px-4 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors text-sm whitespace-nowrap"
                            >
                                주소 찾기
                            </button>
                        </div>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            readOnly
                            required
                            placeholder="기본 주소"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 outline-none mb-2"
                        />
                        <input
                            type="text"
                            name="address_detail"
                            required
                            placeholder="상세 주소를 입력해주세요"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        {/* Hidden input to submit full address string if needed, currently we might combine them in action or just save address */}
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">
                            이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="name@example.com"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1">
                            비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* 에러 메시지 */}
                    {(isError || error) && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg font-medium">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-200 mt-4"
                    >
                        가입하기
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    이미 계정이 있으신가요?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-bold">
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}
