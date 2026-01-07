'use client';

import { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';

interface Profile {
    id: string;
    email: string;
    name: string;
    phone: string;
    birthdate: string;
    address: string;
    joined_at: string;
    role: string;
}

interface UserTableProps {
    users: Profile[];
}

export default function UserTable({ users }: UserTableProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            user.name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.phone?.includes(term)
        );
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Search Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <FaUser className="text-blue-500" />
                        전체 회원 명부
                        <span className="text-sm font-normal text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                            총 {filteredUsers.length}명
                        </span>
                    </h2>
                </div>
                <div className="relative w-full md:w-80">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="이름, 전화번호, 이메일 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 font-bold">이름 / 이메일</th>
                            <th className="px-6 py-4 font-bold">전화번호</th>
                            <th className="px-6 py-4 font-bold">생년월일</th>
                            <th className="px-6 py-4 font-bold">주소</th>
                            <th className="px-6 py-4 font-bold">가입일</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{user.name || '-'}</div>
                                        <div className="text-slate-500 text-xs">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {user.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {user.birthdate || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 max-w-xs truncate" title={user.address}>
                                        {user.address || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-xs">
                                        {user.joined_at ? new Date(user.joined_at).toLocaleDateString() : '-'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                    검색 결과가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
