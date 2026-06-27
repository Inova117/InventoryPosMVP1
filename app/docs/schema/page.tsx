import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function DatabaseSchemaPage() {
    const filePath = path.join(process.cwd(), 'docs', 'DATABASE_SCHEMA.md');
    const content = fs.readFileSync(filePath, 'utf8');

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-5xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>

                <div className="bg-card text-foreground rounded-2xl elevation-1 border border-border p-8">
                    <article className="prose prose-slate max-w-none">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </article>
                </div>
            </div>
        </div>
    );
}
