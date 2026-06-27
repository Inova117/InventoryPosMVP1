'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Package,
    ShoppingCart,
    LineChart,
    Smartphone,
    Database,
    ArrowRight,
    Store,
    TrendingUp,
} from 'lucide-react';
import { useT } from '@/components/providers/language-provider';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';

function HeroPreview() {
    const { t } = useT();
    return (
        <div className="relative mx-auto w-full max-w-xl">
            {/* App window frame */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-4">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-terracotta/70" />
                    <span className="h-3 w-3 rounded-full bg-sage-300" />
                    <span className="h-3 w-3 rounded-full bg-warmth-300" />
                    <span className="ml-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Store className="h-3.5 w-3.5" /> Café Aurora · {t('brand.name')}
                    </span>
                </div>

                {/* Body */}
                <div className="space-y-4 p-5">
                    {/* KPI tiles */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="rounded-xl border border-border bg-background p-3">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t('landing.previewRevenue')}</p>
                            <p className="mt-1 font-serif text-lg font-semibold text-foreground">$4,820</p>
                        </div>
                        <div className="rounded-xl border border-border bg-background p-3">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t('landing.previewSales')}</p>
                            <p className="mt-1 font-serif text-lg font-semibold text-foreground">38</p>
                        </div>
                        <div className="rounded-xl border border-border bg-background p-3">
                            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{t('landing.previewStock')}</p>
                            <p className="mt-1 font-serif text-lg font-semibold text-foreground">$86.4k</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="rounded-xl border border-border bg-background p-4">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                                <TrendingUp className="h-3.5 w-3.5 text-sage-600 dark:text-sage-400" />
                                {t('landing.previewTrend')}
                            </span>
                            <span className="text-xs font-semibold text-sage-600 dark:text-sage-400">+18%</span>
                        </div>
                        <svg viewBox="0 0 320 90" className="h-24 w-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="heroSage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7B896F" stopOpacity="0.30" />
                                    <stop offset="100%" stopColor="#7B896F" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0,68 L40,60 L80,63 L120,46 L160,50 L200,33 L240,38 L280,20 L320,26 L320,90 L0,90 Z" fill="url(#heroSage)" />
                            <path d="M0,68 L40,60 L80,63 L120,46 L160,50 L200,33 L240,38 L280,20 L320,26" fill="none" stroke="#7B896F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Bestseller row */}
                    <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                                <ShoppingCart className="h-4 w-4" />
                            </span>
                            <div>
                                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{t('landing.previewBestseller')}</p>
                                <p className="text-sm font-medium text-foreground">Latte de vainilla</p>
                            </div>
                        </div>
                        <span className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">142</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LandingPage() {
    const { t } = useT();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        { icon: ShieldCheck, title: t('landing.featureAuthTitle'), description: t('landing.featureAuthDesc') },
        { icon: Package, title: t('landing.featureInventoryTitle'), description: t('landing.featureInventoryDesc') },
        { icon: ShoppingCart, title: t('landing.featurePosTitle'), description: t('landing.featurePosDesc') },
        { icon: LineChart, title: t('landing.featureAnalyticsTitle'), description: t('landing.featureAnalyticsDesc') },
        { icon: Smartphone, title: t('landing.featureMobileTitle'), description: t('landing.featureMobileDesc') },
        { icon: Database, title: t('landing.featureBackendTitle'), description: t('landing.featureBackendDesc') },
    ];

    const stats = [
        { value: t('landing.statFastCheckout'), label: t('landing.statFastCheckoutLabel') },
        { value: t('landing.statNoStockouts'), label: t('landing.statNoStockoutsLabel') },
        { value: t('landing.statRealtime'), label: t('landing.statRealtimeLabel') },
        { value: t('landing.statMobile'), label: t('landing.statMobileLabel') },
    ];

    const steps = [
        { n: '1', title: t('landing.step1Title'), description: t('landing.step1Desc'), icon: Package },
        { n: '2', title: t('landing.step2Title'), description: t('landing.step2Desc'), icon: ShoppingCart },
        { n: '3', title: t('landing.step3Title'), description: t('landing.step3Desc'), icon: LineChart },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    scrolled ? 'border-b border-border bg-background/85 backdrop-blur-lg' : 'border-b border-transparent bg-transparent'
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-warm">
                            <Store className="h-5 w-5" />
                        </span>
                        <span className="font-serif text-xl font-semibold tracking-tight">{t('brand.name')}</span>
                    </Link>

                    <div className="hidden items-center gap-7 md:flex">
                        <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t('landing.navFeatures')}</a>
                        <a href="#how" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t('landing.navHow')}</a>
                        <a href="#demo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t('landing.navDemo')}</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <LanguageToggle />
                        <Link href="/login" className="hidden sm:block">
                            <Button size="sm">{t('landing.launchApp')}</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 left-1/3 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-sage-200/40 blur-3xl dark:bg-sage-900/20" />
                    <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-terracotta/10 blur-3xl" />
                </div>

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    {/* Copy */}
                    <div className="text-center lg:text-left">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50 px-4 py-1.5 text-sm font-medium text-sage-700 dark:border-sage-900/40 dark:bg-sage-900/20 dark:text-sage-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                            {t('landing.badge')}
                        </span>
                        <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">
                            {t('landing.heroTitle')}
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl lg:mx-0">
                            {t('landing.heroSubtitle')}
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto">
                                    {t('landing.ctaTry')}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/backend" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">{t('landing.ctaBackend')}</Button>
                            </Link>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">{t('landing.heroNote')}</p>
                    </div>

                    {/* Product preview */}
                    <div className="relative">
                        <HeroPreview />
                    </div>
                </div>
            </section>

            {/* Trust band */}
            <section className="px-6">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-card p-6 text-center">
                            <div className="font-serif text-lg font-semibold text-foreground md:text-xl">{stat.value}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="px-6 py-20 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <h2 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">{t('landing.featuresTitle')}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{t('landing.featuresSubtitle')}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.title} className="group rounded-2xl border border-border bg-card p-8 elevation-1 transition-all hover:-translate-y-1 hover:elevation-3">
                                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sage-100 text-sage-700 transition-transform group-hover:scale-105 dark:bg-sage-900/30 dark:text-sage-300">
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    <h3 className="mb-2 font-serif text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="border-y border-border bg-muted/40 px-6 py-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <h2 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">{t('landing.howTitle')}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{t('landing.howSubtitle')}</p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.n} className="relative rounded-2xl border border-border bg-card p-7 elevation-1">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                                            <Icon className="h-5 w-5" />
                                        </span>
                                        <span className="font-serif text-4xl font-semibold text-warmth-200 dark:text-warmth-700">{step.n}</span>
                                    </div>
                                    <h3 className="mb-1.5 font-serif text-xl font-semibold">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Demo access */}
            <section id="demo" className="px-6 py-20 md:py-28">
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-3xl border border-border bg-card p-8 elevation-2 md:p-12">
                        <div className="mx-auto mb-10 max-w-xl text-center">
                            <h2 className="font-serif text-4xl font-semibold tracking-tight">{t('landing.demoTitle')}</h2>
                            <p className="mt-3 text-lg text-muted-foreground">{t('landing.demoSubtitle')}</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                            {[
                                { title: t('landing.ownerAccount'), access: t('landing.ownerAccess'), email: 'admin@demo.com', icon: ShieldCheck },
                                { title: t('landing.cashierAccount'), access: t('landing.cashierAccess'), email: 'cashier@demo.com', icon: ShoppingCart },
                            ].map((acct) => {
                                const Icon = acct.icon;
                                return (
                                    <div key={acct.email} className="rounded-2xl border border-border bg-background p-6">
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <div>
                                                <h3 className="font-semibold">{acct.title}</h3>
                                                <p className="text-sm text-muted-foreground">{acct.access}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 font-mono text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{t('landing.email')}</span>
                                                <span className="text-foreground">{acct.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{t('landing.password')}</span>
                                                <span className="text-foreground">demo123</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="px-6 pb-24">
                <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-10 text-center elevation-2 dark:border-sage-900/30 dark:from-sage-950/30 dark:to-warmth-900 md:p-16">
                    <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold tracking-tight md:text-5xl">{t('landing.ctaTitle')}</h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{t('landing.ctaSubtitle')}</p>
                    <div className="mt-8 flex justify-center">
                        <Link href="/login">
                            <Button size="lg">
                                {t('landing.startTesting')}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-6 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <div className="mb-4 flex items-center gap-2.5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                    <Store className="h-5 w-5" />
                                </span>
                                <span className="font-serif text-lg font-semibold">{t('brand.name')}</span>
                            </div>
                            <p className="max-w-md text-sm text-muted-foreground">{t('landing.footerTagline')}</p>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">{t('landing.quickLinks')}</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/login" className="transition-colors hover:text-foreground">{t('landing.launchApp')}</Link></li>
                                <li><Link href="/backend" className="transition-colors hover:text-foreground">{t('landing.ctaBackend')}</Link></li>
                                <li><a href="#features" className="transition-colors hover:text-foreground">{t('landing.navFeatures')}</a></li>
                                <li><a href="#how" className="transition-colors hover:text-foreground">{t('landing.navHow')}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
                        <p>© 2026 {t('brand.name')}.</p>
                        <p>{t('landing.footerRights')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
