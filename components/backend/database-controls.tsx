'use client';

import { useState } from 'react';

export function DatabaseControls() {
    const [resetting, setResetting] = useState(false);
    const [message, setMessage] = useState('');

    const handleReset = () => {
        if (!confirm('⚠️ This will delete all data and reset to initial seed data. Continue?')) {
            return;
        }

        setResetting(true);
        setMessage('');

        try {
            // Clear localStorage
            localStorage.removeItem('mvp_inventory_pos_db_v1');

            setMessage('✅ Database reset successfully! Please refresh the page.');

            // Auto refresh after 2 seconds
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            setMessage('❌ Error resetting database. Please try manually: localStorage.clear()');
            setResetting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Database Controls</h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-4">
                <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Reset Database</h3>
                <p className="text-sm text-yellow-800 mb-4">
                    This will delete all current data and reinitialize with fresh seed data including:
                </p>
                <ul className="text-sm text-yellow-800 space-y-1 mb-4 ml-4">
                    <li>• 2 demo users (admin + cashier)</li>
                    <li>• 3 demo products</li>
                    <li>• <strong>3 sample sales</strong> with items</li>
                </ul>

                {message && (
                    <div className={`p-3 rounded mb-4 ${message.includes('✅')
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                        {message}
                    </div>
                )}

                <button
                    onClick={handleReset}
                    disabled={resetting}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {resetting ? 'Resetting...' : 'Reset Database Now'}
                </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Manual Reset (Alternative)</h4>
                <p className="text-sm text-blue-800 mb-2">
                    Open browser DevTools (F12) → Console → Run:
                </p>
                <code className="block bg-slate-900 text-green-400 p-2 rounded text-xs font-mono">
                    localStorage.removeItem('mvp_inventory_pos_db_v1'); location.reload();
                </code>
            </div>
        </div>
    );
}
