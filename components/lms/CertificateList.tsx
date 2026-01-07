'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import { createOrder, completePayment } from '@/app/payment/actions';
import { useRouter } from 'next/navigation';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import CertificateTemplate from './CertificateTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
    isPassed: boolean;
    isPaid: boolean;
    userName: string;
    email: string;
}

declare global {
    interface Window {
        IMP: any;
    }
}

export default function CertificateList({ isPassed, isPaid, userName, email }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const certificateRef = useRef<HTMLDivElement>(null);

    // Generate Certificate Number (Mock: YYYY-MM-RAND)
    const today = new Date();
    const certNum = `2026-01-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const issueDateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const handlePayment = async () => {
        if (!isPassed) {
            alert('먼저 자격시험에 합격해야 합니다.');
            return;
        }

        if (!confirm('자격증 발급비용 50,000원을 결제하시겠습니까?')) return;

        setIsLoading(true);

        try {
            // 1. Create Order
            const orderRes = await createOrder('심리상담사 1급 자격증', 50000);
            if (!orderRes.success) {
                throw new Error(orderRes.message);
            }

            const { merchant_uid } = orderRes;

            // 2. Request Payment via Portone
            const { IMP } = window;
            IMP.init('imp14397622'); // Test Merchant ID

            IMP.request_pay({
                pg: 'html5_inicis',
                pay_method: 'card',
                merchant_uid: merchant_uid,
                name: '심리상담사 1급 자격증 발급',
                amount: 50000,
                buyer_email: email,
                buyer_name: userName,
                buyer_tel: '010-0000-0000',
            }, async (rsp: any) => {
                if (rsp.success) {
                    // 3. Complete Payment
                    const completeRes = await completePayment(merchant_uid!, rsp.imp_uid);
                    if (completeRes.success) {
                        alert('결제가 완료되었습니다! 자격증이 발급됩니다.');
                        window.location.reload();
                    } else {
                        alert('결제 처리 중 오류가 발생했습니다.');
                    }
                } else {
                    alert(`결제에 실패하였습니다. (${rsp.error_msg})`);
                }
                setIsLoading(false);
            });

        } catch (error) {
            console.error(error);
            alert('오류가 발생했습니다.');
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!certificateRef.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2, // Higher resolution
                useCORS: true,
                logging: false,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape, A4
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${userName}_자격증.pdf`);

        } catch (err) {
            console.error(err);
            alert('자격증 생성 중 오류가 발생했습니다.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <Script src="https://cdn.iamport.kr/v1/iamport.js" strategy="lazyOnload" />

            {/* Hidden Certificate Template for Capture */}
            {isPaid && (
                <CertificateTemplate
                    ref={certificateRef}
                    certificateNumber={certNum}
                    userName={userName}
                    courseTitle="심리상담사 1급"
                    issueDate={issueDateStr}
                />
            )}

            <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-3xl">
                        📜
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">심리상담사 1급 자격증</h3>
                        <p className="text-slate-500 text-sm">한국심리상담협회 인증</p>
                        {!isPassed && (
                            <span className="inline-block mt-2 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                                시험 미응시/불합격
                            </span>
                        )}
                        {isPassed && !isPaid && (
                            <span className="inline-block mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                발급 가능
                            </span>
                        )}
                        {isPaid && (
                            <span className="inline-block mt-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                발급 완료 (배송대기)
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    {isPaid ? (
                        <button
                            onClick={handleDownload}
                            disabled={isGenerating}
                            className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                        >
                            {isGenerating ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                            {isGenerating ? '생성 중...' : 'PDF 다운로드 (출력용)'}
                        </button>
                    ) : (
                        <button
                            onClick={handlePayment}
                            disabled={!isPassed || isLoading}
                            className={`px-6 py-3 font-bold rounded-lg transition-all shadow-md ${!isPassed
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200'
                                }`}
                        >
                            {isLoading ? '신청 중...' : '자격증 발급 신청 (50,000원)'}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
