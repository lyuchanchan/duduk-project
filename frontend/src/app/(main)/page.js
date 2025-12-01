"use client";

import { useState } from 'react';
import Header from '@/components/common/Header';
import QuickAddPopup from '@/components/home/QuickAddPopup';
import ChallengeList from '@/components/home/ChallengeList';
import TotalSpending from '@/components/home/TotalSpending';
import CategorySpending from '@/components/home/CategorySpending';
import RecentTransactions from '@/components/home/RecentTransactions';
import { Plus } from 'lucide-react';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background-light)', position: 'relative' }}>
      <Header />

      <main style={{ padding: '1.5rem', paddingBottom: '6rem' }}>
        <ChallengeList />
        <TotalSpending />
        <CategorySpending />
        <RecentTransactions />
      </main>

      {/* Quick Add Popup */}
      {isPopupOpen && <QuickAddPopup onClose={() => setIsPopupOpen(false)} />}

      {/* Floating Action Button */}
      {!isPopupOpen && (
        <button
          onClick={() => setIsPopupOpen(true)}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '1.5rem',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}
        >
          <Plus size={32} />
        </button>
      )}
    </div>
  );
}
