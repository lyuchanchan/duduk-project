"use client";

import SavingsSummary from '@/components/coaching/SavingsSummary';
import CoachingCardList from '@/components/coaching/CoachingCardList';
import CompletedCoachingList from '@/components/coaching/CompletedCoachingList';

export default function CoachingPage() {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--background-light)',
            paddingBottom: '6rem'
        }}>
            <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary)',
                padding: '1rem 1.5rem 0.5rem 1.5rem'
            }}>
                AI 코칭
            </h1>
            <main>
                <SavingsSummary />
                <CoachingCardList />
                <CompletedCoachingList />
            </main>
        </div >
    );
}
