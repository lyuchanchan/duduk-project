"use client";

import { Coffee, ShoppingBag, Bus, Film, Utensils, ChevronRight } from 'lucide-react';

export default function RecentTransactions() {
    const transactions = [
        { id: 1, name: '스타벅스', date: '4월 15일', amount: -6500, icon: Coffee, color: '#e6fffa', iconColor: '#2f855a' },
        { id: 2, name: '올리브영', date: '4월 14일', amount: -24000, icon: ShoppingBag, color: '#e6fffa', iconColor: '#2f855a' },
        { id: 3, name: '티머니 충전', date: '4월 14일', amount: -10000, icon: Bus, color: '#e6fffa', iconColor: '#2f855a' },
        { id: 4, name: 'CGV', date: '4월 12일', amount: -15000, icon: Film, color: '#e6fffa', iconColor: '#2f855a' },
        { id: 5, name: '김밥천국', date: '4월 12일', amount: -8000, icon: Utensils, color: '#e6fffa', iconColor: '#2f855a' },
    ];

    return (
        <div style={{ paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>최근 내역</h2>
                <button style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.9rem',
                    color: 'var(--text-sub)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    더보기 <ChevronRight size={16} />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {transactions.map((t) => (
                    <div key={t.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.1s ease',
                        cursor: 'pointer'
                    }}>
                        <div style={{
                            backgroundColor: t.color,
                            padding: '0.85rem',
                            borderRadius: '50%',
                            marginRight: '1.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <t.icon size={22} color={t.iconColor} strokeWidth={2} />
                        </div>

                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>{t.name}</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', fontWeight: '500' }}>{t.date}</p>
                        </div>

                        <span style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                            {t.amount.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
