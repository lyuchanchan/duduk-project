"use client";

import { ShoppingBag, Coffee, ChevronRight, MapPin, Droplets, Zap } from 'lucide-react';

const cards = [
    {
        id: 1,
        icon: <ShoppingBag size={20} color="#2f855a" />,
        tag: "키워드 기반 대안",
        title: "온라인 쇼핑몰 할인 활용",
        description: "Find the best deals for your favorite online stores...",
    },
    {
        id: 2,
        icon: <MapPin size={20} color="#2f855a" />,
        tag: "위치 기반",
        title: "근처 마트 할인 정보",
        description: "Check out the latest discounts at local supermarkets...",
    },
    {
        id: 3,
        icon: <Droplets size={20} color="#2f855a" />,
        tag: "누수 소비",
        title: "불필요한 구독 취소",
        description: "Identify and cancel subscriptions you no longer use...",
    },
    {
        id: 4,
        icon: <Zap size={20} color="#2f855a" />,
        tag: "행동 변화 제안",
        title: "일주일 무지출 챌린지",
        description: "Challenge yourself to spend nothing for a week...",
    }
];

export default function CoachingCardList() {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                paddingLeft: '1.5rem',
                color: 'var(--text-main)'
            }}>
                AI 코칭 카드
            </h3>
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                padding: '0 1.5rem',
                gap: '1rem',
                paddingBottom: '1rem',
                scrollbarWidth: 'none', // Firefox
                msOverflowStyle: 'none' // IE/Edge
            }}>
                <style jsx>{`
                    div::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {cards.map((card) => (
                    <div key={card.id} style={{
                        minWidth: '280px',
                        backgroundColor: 'var(--card-bg)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '320px'
                    }}>
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '1rem'
                            }}>
                                {card.icon}
                                <span style={{
                                    marginLeft: '0.5rem',
                                    backgroundColor: '#e6fffa',
                                    color: '#2f855a',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '999px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {card.tag}
                                </span>
                            </div>
                            <h4 style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                marginBottom: '1rem',
                                color: 'var(--text-main)',
                                lineHeight: '1.4'
                            }}>
                                {card.title}
                            </h4>
                            <p style={{
                                color: 'var(--text-sub)',
                                fontSize: '0.95rem',
                                lineHeight: '1.5'
                            }}>
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
