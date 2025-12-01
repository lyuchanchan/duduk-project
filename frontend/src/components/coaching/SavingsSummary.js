"use client";

export default function SavingsSummary() {
    return (
        <div style={{
            textAlign: 'center',
            padding: '2rem 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            <span style={{
                fontSize: '0.9rem',
                color: 'var(--text-sub)'
            }}>
                예상 절약액
            </span>
            <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                fontFamily: 'var(--font-mono)' // Assuming we might want a mono font for numbers, or just inherit
            }}>
                ₩25,000
            </h2>
            <p style={{
                fontSize: '1rem',
                color: 'var(--text-sub)'
            }}>
                넷플릭스 2개월 구독료와 같아요
            </p>
        </div>
    );
}
