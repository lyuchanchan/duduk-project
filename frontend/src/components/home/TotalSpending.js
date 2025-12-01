"use client";

export default function TotalSpending() {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-sub)', marginBottom: '0.5rem', fontWeight: '500' }}>이번 달 총 소비</p>
                <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                    ₩150,000
                </h2>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-sub)', fontWeight: '500' }}>남은 예산: ₩850,000</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)' }}>15%</span>
                </div>

                <div style={{ width: '100%', height: '12px', backgroundColor: '#edf2f7', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: '15%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '6px' }}></div>
                </div>
            </div>
        </div>
    );
}
