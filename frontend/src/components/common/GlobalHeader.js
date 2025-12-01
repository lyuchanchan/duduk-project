"use client";

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, Menu, Bell } from 'lucide-react';

export default function GlobalHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === '/';

    if (isHome) {
        return (
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: 'var(--background-light)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <Menu color="var(--text-main)" size={24} />
                <h1 style={{
                    color: 'var(--primary)',
                    fontSize: '1.5rem',
                    fontWeight: 'bold'
                }}>
                    Duduk
                </h1>
                <Bell color="var(--text-main)" size={24} />
            </header>
        );
    }

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
            <button
                onClick={() => router.back()}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    marginRight: '0.5rem',
                    color: 'var(--text-main)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                <ChevronLeft size={24} />
            </button>
            {/* Optional: Add title based on route if needed, or keep it generic */}
        </header>
    );
}
