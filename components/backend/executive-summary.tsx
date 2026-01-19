// Executive Summary Component
'use client'

export function ExecutiveSummary() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Executive Summary</h2>
                <p className="text-slate-300">Project Status & Key Deliverables</p>
            </div>

            <div className="p-8">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="text-sm text-green-700 font-medium mb-1">Project Status</div>
                        <div className="text-2xl font-bold text-green-800">Production Ready</div>
                        <div className="text-xs text-green-600 mt-1">Ready for deployment</div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-sm text-blue-700 font-medium mb-1">Time to Market</div>
                        <div className="text-2xl font-bold text-blue-800">2 Weeks</div>
                        <div className="text-xs text-blue-600 mt-1">vs 3-4 months avg</div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="text-sm text-purple-700 font-medium mb-1">Scalability</div>
                        <div className="text-2xl font-bold text-purple-800">Auto-Scaling</div>
                        <div className="text-xs text-purple-600 mt-1">Serverless architecture</div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="text-sm text-orange-700 font-medium mb-1">Compliance</div>
                        <div className="text-2xl font-bold text-orange-800">Standard</div>
                        <div className="text-xs text-orange-600 mt-1">GDPR & SOC2 ready</div>
                    </div>
                </div>

                {/* Competitive Advantage */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Feature</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-slate-900 uppercase tracking-wider bg-blue-50">Our Solution</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">Traditional Dev</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-slate-400 uppercase tracking-wider">No-Code Tools</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {[
                                { name: 'Source Code Ownership', us: '100% Owned', trad: '100% Owned', nc: '0% (Locked)' },
                                { name: 'Scalability', us: 'Enterprise', trad: 'Manual Scale', nc: 'Limited' },
                                { name: 'Running Costs', us: 'Low (Serverless)', trad: 'High (Servers)', nc: 'Medium/High' },
                                { name: 'Customization', us: 'Unlimited', trad: 'Unlimited', nc: 'Restricted' },
                                { name: 'Delivery Time', us: '2 Weeks', trad: '3-6 Months', nc: '1 Month' },
                            ].map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold text-blue-700 bg-blue-50/50">{row.us}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-500">{row.trad}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-slate-500">{row.nc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
