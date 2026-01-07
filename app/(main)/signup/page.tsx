import Link from 'next/link';
import { signup } from '@/app/auth/actions';

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const params = await searchParams;
    const isError = params?.error === 'true';

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">회원가입</h1>
                    <p className="text-slate-500 mt-2">KCA의 새로운 회원이 되어주세요.</p>
                </div>

                <form action={signup} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                            이름
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="홍길동"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                            휴대폰 번호
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="010-1234-5678"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                            이메일
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                            비밀번호
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {isError && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                            회원가입 중 오류가 발생했습니다. 다시 시도해주세요.
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-200"
                    >
                        가입하기
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    이미 계정이 있으신가요?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}
