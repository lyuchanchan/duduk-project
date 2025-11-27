"use client";

import { useState } from 'react';
import { parseTransaction, createTransaction } from '@/lib/api/transaction';

export default function QuickAddInput() {
    const [text, setText] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [message, setMessage] = useState('');

    const handleParse = async () => {
        try {
            setMessage('Parsing...');
            const data = await parseTransaction(text);
            setParsedData(data);
            setMessage('Parsed successfully. Please confirm.');
        } catch (error) {
            setMessage('Error parsing transaction.');
        }
    };

    const handleCreate = async () => {
        try {
            setMessage('Saving...');
            await createTransaction(parsedData);
            setMessage('Transaction Created!');
            setParsedData(null);
            setText('');
        } catch (error) {
            setMessage('Error creating transaction.');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
            <h3>Quick Add</h3>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="예: 스타벅스 5000원"
                style={{ marginRight: '0.5rem', padding: '0.5rem' }}
            />
            <button onClick={handleParse} style={{ padding: '0.5rem' }}>
                전송
            </button>

            {message && <p>{message}</p>}

            {parsedData && (
                <div style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>
                    <pre>{JSON.stringify(parsedData, null, 2)}</pre>
                    <button onClick={handleCreate} style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
                        확인 (저장)
                    </button>
                </div>
            )}
        </div>
    );
}
