"use client";

import { useState } from 'react';
import { ShoppingBag, Coffee, ChevronRight, MapPin, Droplets, Zap, ThumbsUp, ThumbsDown } from 'lucide-react';
import DislikeReasonPopup from './DislikeReasonPopup';

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
    const [likedCards, setLikedCards] = useState(new Set());
    const [dislikedCards, setDislikedCards] = useState(new Set());
    const [showDislikePopup, setShowDislikePopup] = useState(null); // Stores card ID

    const handleLike = (id) => {
        setLikedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
                // Remove from dislikes if present
                setDislikedCards(d => {
                    const newDislikes = new Set(d);
                    newDislikes.delete(id);
                    return newDislikes;
                });
            }
            return newSet;
        });
    };

    const handleDislikeClick = (id) => {
        if (dislikedCards.has(id)) {
            // Toggle off
            setDislikedCards(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        } else {
            // Open popup
            setShowDislikePopup(id);
        }
    };

    const handleDislikeSubmit = (reason) => {
        if (showDislikePopup) {
            console.log(`Disliked card ${showDislikePopup} reason: ${reason}`);
            setDislikedCards(prev => {
                const newSet = new Set(prev);
                newSet.add(showDislikePopup);
                return newSet;
            });
            // Remove from likes if present
            setLikedCards(l => {
                const newLikes = new Set(l);
                newLikes.delete(showDislikePopup);
                return newLikes;
            });
            setShowDislikePopup(null);
        }
    };

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
                {cards.map((card) => {
                    const isLiked = likedCards.has(card.id);
                    const isDisliked = dislikedCards.has(card.id);

                    return (
                        <div key={card.id} style={{
                            minWidth: '280px',
                            backgroundColor: 'var(--card-bg)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '320px',
                            position: 'relative'
                        }}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
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

                                    {/* Feedback Buttons */}
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => handleLike(card.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '4px',
                                                color: isLiked ? 'var(--primary)' : 'var(--text-sub)'
                                            }}
                                        >
                                            <ThumbsUp
                                                size={20}
                                                fill={isLiked ? 'currentColor' : 'none'}
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleDislikeClick(card.id)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                padding: '4px',
                                                color: isDisliked ? 'var(--primary)' : 'var(--text-sub)'
                                            }}
                                        >
                                            <ThumbsDown
                                                size={20}
                                                fill={isDisliked ? 'currentColor' : 'none'}
                                            />
                                        </button>
                                    </div>
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
                    );
                })}
            </div>

            {showDislikePopup && (
                <DislikeReasonPopup
                    onClose={() => setShowDislikePopup(null)}
                    onSubmit={handleDislikeSubmit}
                />
            )}
        </div>
    );
}
