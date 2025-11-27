"use client";

import { useEffect, useState } from 'react';
import { getTransactions } from '@/lib/api/transaction';

export default function TransactionList() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error('Failed to fetch transactions', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (loading) return <p>Loading transactions...</p>;

    return (
        <div style={{ marginTop: '2rem' }}>
            <h3>Recent Transactions</h3>
            <button onClick={fetchTransactions} style={{ marginBottom: '1rem' }}>Refresh</button>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {transactions.map((t) => (
                        <li key={t.id} style={{ borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                            <strong>{t.item}</strong> ({t.category}) - {t.amount}원 <br />
                            <small>{t.store} | {new Date(t.date).toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
