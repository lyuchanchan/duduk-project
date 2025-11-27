"use client";

import { useEffect, useState } from 'react';
import { getCoachingAdvice } from '@/lib/api/coaching';

export default function CoachingView() {
    const [advice, setAdvice] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                const data = await getCoachingAdvice();
                setAdvice(data.message);
            } catch (error) {
                console.error('Failed to fetch advice', error);
                setAdvice('조언을 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdvice();
    }, []);

    if (loading) return <p>AI 코치가 데이터를 분석 중입니다...</p>;

    return (
        <div style={{ padding: '2rem', border: '1px solid #0070f3', borderRadius: '8px', background: '#f0f9ff' }}>
            <h2>🤖 AI 소비 코치</h2>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {advice}
            </div>
        </div>
    );
}
