import Link from 'next/link';

export default function ApiSpecPage() {
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
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">API Specification</h1>

                    <div className="prose prose-slate max-w-none">
                        <h2>Product API Endpoints</h2>

                        <h3>GET /api/products</h3>
                        <p>Retrieve all products for the authenticated user's store.</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                            <div>Response: 200 OK</div>
                            <pre>{`{
  "products": [
    {
      "id": "prod-1",
      "sku": "DEMO-001",
      "name": "Wireless Mouse",
      "category": "Electronics",
      "stock": 45,
      "buy_price": 15.00,
      "sell_price": 29.99
    }
  ]
}`}</pre>
                        </div>

                        <h3>POST /api/products</h3>
                        <p>Create a new product.</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                            <div>Request Body:</div>
                            <pre>{`{
  "sku": "PROD-123",
  "name": "Product Name",
  "category": "Category",
  "stock": 100,
  "buy_price": 10.00,
  "sell_price": 20.00
}`}</pre>
                        </div>

                        <h3>PATCH /api/products/:id</h3>
                        <p>Update an existing product.</p>

                        <h3>DELETE /api/products/:id</h3>
                        <p>Delete a product.</p>

                        <h2>Validation Rules</h2>
                        <ul>
                            <li><strong>SKU</strong>: Required, must be unique</li>
                            <li><strong>Name</strong>: Required, min 3 characters</li>
                            <li><strong>Stock</strong>: Required, must be ≥ 0</li>
                            <li><strong>Buy Price</strong>: Required, must be {'>'} 0</li>
                            <li><strong>Sell Price</strong>: Required, must be {'>'} 0</li>
                            <li><strong>Warning</strong>: If sell_price ≤ buy_price, warning is logged</li>
                        </ul>

                        <h2>Sales API</h2>
                        <h3>POST /api/sales</h3>
                        <p>Create a new sale transaction.</p>
                        <div className="bg-slate-900 text-green-400 p-4 rounded font-mono text-sm mb-4">
                            <pre>{`{
  "items": [
    {
      "product_id": "prod-1",
      "quantity": 2,
      "unit_price": 29.99
    }
  ],
  "amount_received": 100.00
}`}</pre>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                            <h4 className="font-semibold text-blue-900 mb-2">Note</h4>
                            <p className="text-blue-800 text-sm">
                                This MVP uses a mock backend with LocalStorage. All endpoints are simulated client-side.
                                For production, migrate to Supabase following the migration path in the{' '}
                                <Link href="/backend" className="text-blue-600 hover:underline">
                                    Backend Documentation
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
