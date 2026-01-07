import Link from 'next/link';
import { login } from '@/app/auth/actions';

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const params = await searchParams;
    const errorMessage = params?.error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">로그인</h1>
                    <p className="text-slate-500 mt-2">KCA 서비스 이용을 위해 로그인해주세요.</p>
                </div>

                <form action={login} className="space-y-6">
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

                    {errorMessage && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                            {errorMessage === 'true' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-200"
                    >
                        로그인하기
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    아직 회원이 아니신가요?{' '}
                    <Link href="/signup" className="text-blue-600 hover:underline font-medium">
                        회원가입
                    </Link>
                </div>
            </div>
        </div>
    );
}
