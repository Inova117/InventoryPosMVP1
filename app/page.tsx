'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: '🔐',
            title: 'Secure Authentication',
            description: 'Role-based access control with Owner and Cashier roles. Demo accounts ready for testing.',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: '📦',
            title: 'Inventory Management',
            description: 'Complete CRUD operations with SKU validation, stock tracking, and low-stock alerts.',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: '💰',
            title: 'Point of Sale',
            description: 'Fast checkout with cart management, change calculator, and automatic stock updates.',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: '📊',
            title: 'Analytics Dashboard',
            description: 'Real-time metrics, sales trends, stock valuation, and top products insights.',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: '🔧',
            title: 'Backend Visualization',
            description: 'Live data inspector, architecture diagrams, and complete mock database documentation.',
            color: 'from-indigo-500 to-purple-500',
        },
        {
            icon: '⚡',
            title: 'Production Ready',
            description: 'TypeScript strict mode, Grade A code quality, zero ESLint errors, and optimized build.',
            color: 'from-yellow-500 to-orange-500',
        },
    ];

    const stats = [
        { value: '100%', label: 'Type Safety' },
        { value: '5/5', label: 'Features Complete' },
        { value: 'Grade A', label: 'Code Quality' },
        { value: '<210KB', label: 'Bundle Size' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50'
                        : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">IP</span>
                            </div>
                            <div>
                                <h1 className="text-white font-bold text-lg">InventoryPOS</h1>
                                <p className="text-slate-400 text-xs">MVP #1 Demo</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-slate-300 hover:text-white transition">
                                Features
                            </a>
                            <a href="#demo" className="text-slate-300 hover:text-white transition">
                                Demo
                            </a>
                            <a href="#tech" className="text-slate-300 hover:text-white transition">
                                Tech Stack
                            </a>
                            <Link
                                href="/login"
                                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Launch App
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block mb-4">
                            <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                                🎉 Production Ready MVP
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            Modern Inventory &
                            <br />
                            POS System
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                            Complete point-of-sale solution with real-time inventory tracking, analytics
                            dashboard, and mock backend. Built with Next.js 14, TypeScript, and Tailwind CSS.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/login"
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                Try Demo Now →
                            </Link>
                            <Link
                                href="/backend"
                                className="px-8 py-4 bg-slate-800/50 backdrop-blur border border-slate-700 text-white rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all"
                            >
                                View Backend
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
                            {stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-sm text-slate-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Powerful Features
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Everything you need to manage inventory and process sales efficiently
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="group bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-slate-600 hover:bg-slate-800/70 transition-all hover:scale-105"
                            >
                                <div
                                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
                                >
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo Access Section */}
            <section id="demo" className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-12">
                        <h2 className="text-4xl font-bold text-white mb-6 text-center">
                            🚀 Test the Application
                        </h2>
                        <p className="text-slate-300 text-center mb-8 text-lg">
                            Demo accounts are ready to use. No signup required.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">👤</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Owner Account</h3>
                                        <p className="text-sm text-slate-400">Full Access</p>
                                    </div>
                                </div>
                                <div className="space-y-2 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Email:</span>
                                        <span className="text-blue-400">admin@demo.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Password:</span>
                                        <span className="text-blue-400">demo123</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">💼</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Cashier Account</h3>
                                        <p className="text-sm text-slate-400">POS Only</p>
                                    </div>
                                </div>
                                <div className="space-y-2 font-mono text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Email:</span>
                                        <span className="text-purple-400">cashier@demo.com</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Password:</span>
                                        <span className="text-purple-400">demo123</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/login"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                Start Testing →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section id="tech" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Tech Stack</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Built with modern, production-ready technologies
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Frontend</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-400">▸</span> Next.js 14 (App Router)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-400">▸</span> TypeScript (Strict Mode)
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-400">▸</span> Tailwind CSS
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-400">▸</span> Recharts (Analytics)
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Backend (Mock)</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">▸</span> LocalStorage Persistence
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">▸</span> Generic CRUD Operations
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">▸</span> Simulated 600ms Latency
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-400">▸</span> Ready for Supabase
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                            <h3 className="text-xl font-bold text-white mb-4">Quality</h3>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">▸</span> ESLint + Prettier
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">▸</span> Vitest + Playwright
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">▸</span> GitHub Actions CI/CD
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-green-400">▸</span> Grade A Code Quality
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-800 bg-slate-900/50 backdrop-blur py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">IP</span>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold">InventoryPOS</h3>
                                    <p className="text-slate-400 text-sm">MVP #1 Demo</p>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm max-w-md">
                                A complete inventory management and point-of-sale system built with modern web
                                technologies. Production-ready with Grade A code quality.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li>
                                    <Link href="/login" className="hover:text-white transition">
                                        Launch App
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/backend" className="hover:text-white transition">
                                        Backend Docs
                                    </Link>
                                </li>
                                <li>
                                    <a href="#features" className="hover:text-white transition">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#demo" className="hover:text-white transition">
                                        Demo Access
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Documentation</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li>
                                    <span className="hover:text-white transition cursor-pointer">API Spec</span>
                                </li>
                                <li>
                                    <span className="hover:text-white transition cursor-pointer">
                                        Database Schema
                                    </span>
                                </li>
                                <li>
                                    <span className="hover:text-white transition cursor-pointer">
                                        Product Spec
                                    </span>
                                </li>
                                <li>
                                    <span className="hover:text-white transition cursor-pointer">
                                        Code Quality Report
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            © 2026 InventoryPOS MVP. Built with Next.js 14 & TypeScript.
                        </p>
                        <div className="flex items-center gap-6 text-slate-500 text-sm">
                            <span>Status: Production Ready ✓</span>
                            <span>Build: v1.0.0</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
