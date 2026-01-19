import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function DatabaseSchemaPage() {
    const filePath = path.join(process.cwd(), 'docs', 'DATABASE_SCHEMA.md');
    const content = fs.readFileSync(filePath, 'utf8');

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
                    <article className="prose prose-slate max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}
