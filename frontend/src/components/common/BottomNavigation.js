"use client";

import { Bot, Plus } from 'lucide-react';
import Link from 'next/link';

export default function BottomNavigation({ onQuickAddClick }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTop: '1px solid #eee',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            height: '60px',
            maxWidth: '430px',
            margin: '0 auto',
            zIndex: 100,
            paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
            {/* Left Spacer */}
            <div></div>

            {/* Quick Add Button (Center) */}
            <button
                onClick={onQuickAddClick}
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transform: 'translateY(-20px)',
                    margin: '0 auto' // Ensure it's centered in the grid cell
                }}
            >
                <Plus size={32} />
            </button>

            {/* AI Coaching Button (Right) */}
            <Link href="/coaching" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'var(--text-sub)',
                textDecoration: 'none',
                fontSize: '0.75rem',
                gap: '4px',
                justifySelf: 'center' // Center in the right column
            }}>
                <Bot size={24} />
                <span>코칭</span>
            </Link>
        </div>
    );
}
