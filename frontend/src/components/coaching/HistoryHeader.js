"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function HistoryHeader() {
    return (
        <header style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'var(--background-light)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <Link href="/coaching" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                marginRight: '0.5rem',
                color: 'var(--text-main)'
            }}>
                <ChevronLeft size={24} />
            </Link>
            <h1 style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: 'var(--text-main)'
            }}>
                실천한 AI 코칭
            </h1>
        </header>
    );
}
