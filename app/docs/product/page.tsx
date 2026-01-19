import Link from 'next/link';

export default function ProductSpecPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">Product Specification - MVP #1</h1>

                    <div className="prose prose-slate max-w-none">
                        <h2>Overview</h2>
                        <p>
                            A complete inventory management and point-of-sale system built for small businesses.
                            This MVP enables store owners to manage products, process sales, and view analytics.
                        </p>

                        <h2>Target Users</h2>
                        <ul>
                            <li><strong>Store Owners</strong>: Full access to inventory, sales, and analytics</li>
                            <li><strong>Cashiers</strong>: Access to POS system only</li>
                        </ul>

                        <h2>Features (MoSCoW)</h2>

                        <h3>✅ MUST HAVE (All Implemented)</h3>
                        <ul>
                            <li>Authentication with role-based access (Owner/Cashier)</li>
                            <li>Product CRUD with SKU, prices, stock tracking</li>
                            <li>Point of Sale with cart management</li>
                            <li>Low stock alerts (threshold: {'<'} 10)</li>
                            <li>Sales analytics dashboard</li>
                        </ul>

                        <h3>✅ SHOULD HAVE (Implemented)</h3>
                        <ul>
                            <li>7-day sales trend chart</li>
                            <li>Total stock valuation</li>
                            <li>Top selling products</li>
                            <li>Mock backend visualization</li>
                        </ul>

                        <h3>Could Have (Future)</h3>
                        <ul>
                            <li>Supplier management</li>
                            <li>Category filters</li>
                            <li>Advanced reporting</li>
                            <li>Multi-store support</li>
                        </ul>

                        <h2>Technical Stack</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 rounded p-4">
                                <h4 className="font-semibold mb-2">Frontend</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• Next.js 14 (App Router)</li>
                                    <li>• TypeScript (Strict Mode)</li>
                                    <li>• Tailwind CSS</li>
                                    <li>• Recharts</li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 rounded p-4">
                                <h4 className="font-semibold mb-2">Backend</h4>
                                <ul className="text-sm space-y-1">
                                    <li>• Mock DB (LocalStorage)</li>
                                    <li>• Ready for Supabase</li>
                                    <li>• Generic CRUD layer</li>
                                    <li>• Simulated latency</li>
                                </ul>
                            </div>
                        </div>

                        <h2>Demo Credentials</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-blue-50 border border-blue-200 rounded p-4">
                                <h4 className="font-semibold text-blue-900">Owner Account</h4>
                                <div className="text-sm mt-2 font-mono">
                                    <div>Email: admin@demo.com</div>
                                    <div>Password: demo123</div>
                                </div>
                            </div>
                            <div className="bg-purple-50 border border-purple-200 rounded p-4">
                                <h4 className="font-semibold text-purple-900">Cashier Account</h4>
                                <div className="text-sm mt-2 font-mono">
                                    <div>Email: cashier@demo.com</div>
                                    <div>Password: demo123</div>
                                </div>
                            </div>
                        </div>

                        <h2>Quick Links</h2>
                        <div className="flex gap-4">
                            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Try Demo
                            </Link>
                            <Link href="/backend" className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-900">
                                View Backend
                            </Link>
                            <Link href="/docs/api" className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-50">
                                API Docs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
