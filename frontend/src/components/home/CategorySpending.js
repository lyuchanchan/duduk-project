"use client";

export default function CategorySpending() {
    // Mock Data
    const data = [
        { name: '식비', amount: 67500, color: '#2f855a', percent: 45 },
        { name: '쇼핑', amount: 30000, color: '#48bb78', percent: 20 },
        { name: '교통', amount: 37500, color: '#ecc94b', percent: 25 },
        { name: '기타', amount: 15000, color: '#f56565', percent: 10 },
    ];

    // SVG Calculation
    let cumulativePercent = 0;
    const getCoordinatesForPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem 1.5rem',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '2.5rem'
        }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '2rem' }}>카테고리별 소비</h2>

            {/* Donut Chart */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', position: 'relative' }}>
                <svg viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)', width: '200px', height: '200px' }}>
                    {data.map((slice, index) => {
                        const start = cumulativePercent;
                        cumulativePercent += slice.percent / 100;
                        const end = cumulativePercent;

                        const [startX, startY] = getCoordinatesForPercent(start);
                        const [endX, endY] = getCoordinatesForPercent(end);

                        const largeArcFlag = slice.percent > 50 ? 1 : 0;

                        const pathData = [
                            `M ${startX} ${startY}`,
                            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                            `L 0 0`,
                        ].join(' ');

                        return (
                            <path
                                key={index}
                                d={pathData}
                                fill={slice.color}
                                stroke="white"
                                strokeWidth="0.08"
                            />
                        );
                    })}
                    {/* Center Hole for Donut Effect */}
                    <circle cx="0" cy="0" r="0.7" fill="white" />
                </svg>

                {/* Center Text */}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', fontWeight: '500' }}>Total</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>₩15만</p>
                </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.map((item, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        borderBottom: index < data.length - 1 ? '1px solid #f7fafc' : 'none'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
                            <span style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{item.name}</span>
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            ₩{item.amount.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
