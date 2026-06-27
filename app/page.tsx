'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Package,
    ShoppingCart,
    BarChart3,
    Smartphone,
    ArrowRight,
    DollarSign,
    Coffee,
    TrendingUp,
    AlertTriangle,
} from 'lucide-react';
import { useT } from '@/components/providers/language-provider';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconChip } from '@/components/ui/icon-chip';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/features/stat-card';
import { SalesChart } from '@/components/features/sales-chart';
import { ZerionLogo, ZerionTile } from '@/components/brand/zerion-logo';
import { STORE_NAME } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

// Static marketing data — kept in sync with the Café Aurora seed numbers so the
// landing reads as a real, deployed instance (not a faceless SaaS pitch).
const HERO_TREND = [
    { date: '2026-06-21', revenue: 3120, sales: 27 },
    { date: '2026-06-22', revenue: 3480, sales: 30 },
    { date: '2026-06-23', revenue: 2980, sales: 25 },
    { date: '2026-06-24', revenue: 3890, sales: 33 },
    { date: '2026-06-25', revenue: 3650, sales: 31 },
    { date: '2026-06-26', revenue: 4210, sales: 35 },
    { date: '2026-06-27', revenue: 4820, sales: 38 },
];

function HeroPreview() {
    const { t, lang } = useT();
    return (
        <div className="relative mx-auto w-full max-w-xl">
            {/* App window frame — the real product chrome */}
            <div className="overflow-hidden rounded-2xl border border-border bg-card elevation-4">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-3">
                    <span className="h-3 w-3 rounded-full bg-terracotta/70" />
                    <span className="h-3 w-3 rounded-full bg-warning/60" />
                    <span className="h-3 w-3 rounded-full bg-sage-400" />
                    <span className="ml-2 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <ZerionTile size="xs" />
                        {STORE_NAME} · {t('brand.name')}
                    </span>
                </div>

                {/* Body — built from the SAME components as /dashboard */}
                <div className="space-y-3 bg-background p-4">
                    <div className="grid grid-cols-2 gap-3">
                        <StatCard
                            title={t('landing.previewRevenue')}
                            value={formatCurrency(4820, lang)}
                            icon={DollarSign}
                            badge={{ text: t('common.today'), variant: 'default' }}
                            trend={{ value: '+18%', isPositive: true }}
                        />
                        <StatCard
                            title={t('landing.previewSales')}
                            value={38}
                            icon={BarChart3}
                            badge={{ text: t('common.today'), variant: 'terracotta' }}
                        />
                    </div>

                    <Card tone="inset" padding="md">
                        <div className="mb-1 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                <TrendingUp className="h-4 w-4 text-sage-600 dark:text-sage-400" />
                                {t('landing.previewTrend')}
                            </span>
                            <span className="text-sm font-semibold text-sage-600 dark:text-sage-400">+18%</span>
                        </div>
                        <SalesChart data={HERO_TREND} height={150} />
                    </Card>

                    <div className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3">
                        <div className="flex items-center gap-2.5">
                            <span className="grid h-9 w-9 place-items-center rounded-lg bg-sage-100 font-serif font-semibold text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">
                                L
                            </span>
                            <div>
                                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{t('landing.previewBestseller')}</p>
                                <p className="text-sm font-medium text-foreground">{t('landing.previewBestsellerName')}</p>
                            </div>
                        </div>
                        <Badge>142</Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniProductTile({ initial, name, price }: { initial: string; name: string; price: string }) {
    return (
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-3 py-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-sage-100 font-serif text-sm font-semibold text-sage-700 dark:bg-sage-900/30 dark:text-sage-300">{initial}</span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{name}</span>
            <span className="font-serif text-sm font-semibold text-foreground tabular-nums">{price}</span>
        </div>
    );
}

export default function LandingPage() {
    const { t, lang } = useT();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const smallFeatures = [
        { icon: Package, title: t('landing.featureInventoryTitle'), description: t('landing.featureInventoryDesc') },
        { icon: BarChart3, title: t('landing.featureAnalyticsTitle'), description: t('landing.featureAnalyticsDesc') },
        { icon: ShieldCheck, title: t('landing.featureAuthTitle'), description: t('landing.featureAuthDesc') },
        { icon: Smartphone, title: t('landing.featureMobileTitle'), description: t('landing.featureMobileDesc') },
    ];

    const metrics = [
        { value: formatCurrency(4820, lang), label: t('landing.metricRevenue') },
        { value: '38', label: t('landing.metricSales') },
        { value: '142', label: t('landing.metricBestseller') },
        { value: '32', label: t('landing.metricSkus') },
    ];

    const steps = [
        { n: '1', title: t('landing.step1Title'), description: t('landing.step1Desc'), icon: Package },
        { n: '2', title: t('landing.step2Title'), description: t('landing.step2Desc'), icon: ShoppingCart },
        { n: '3', title: t('landing.step3Title'), description: t('landing.step3Desc'), icon: BarChart3 },
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
                    <Link href="/" className="rounded-xl focus-ring">
                        <ZerionLogo size="sm" />
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
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh" />
                <div aria-hidden className="pointer-events-none absolute inset-0 noise-overlay" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                    {/* Copy */}
                    <div className="text-center lg:text-left">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50/80 px-4 py-1.5 text-sm font-medium text-sage-700 backdrop-blur dark:border-sage-900/40 dark:bg-sage-900/20 dark:text-sage-300">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-500 opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
                            </span>
                            {t('landing.liveBadge')}
                        </span>
                        <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl xl:text-7xl">
                            {t('landing.heroTitle')}
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl lg:mx-0">
                            {t('landing.heroSubtitle')}
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button size="lg" className="w-full sm:w-auto">
                                    {t('landing.ctaTry')}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/login" className="w-full sm:w-auto">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">{t('landing.ctaDashboard')}</Button>
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

            {/* Metrics band — real Café Aurora numbers */}
            <section className="px-6">
                <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
                    {metrics.map((m) => (
                        <div key={m.label} className="bg-card p-6 text-center">
                            <div className="font-serif text-2xl font-semibold text-foreground tabular-nums md:text-3xl">{m.value}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{m.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features — editorial bento */}
            <section id="features" className="px-6 py-20 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <h2 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">{t('landing.featuresTitle')}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{t('landing.featuresSubtitle')}</p>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        {/* Showcase cell — a true-to-product POS preview */}
                        <Card tone="feature" padding="lg" className="flex flex-col justify-between lg:col-span-2">
                            <div>
                                <IconChip icon={ShoppingCart} size="lg" tone="primary" className="mb-5" />
                                <h3 className="mb-2 font-serif text-2xl font-semibold">{t('landing.showcaseTitle')}</h3>
                                <p className="max-w-md text-muted-foreground">{t('landing.showcaseDesc')}</p>
                            </div>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                <MiniProductTile initial="C" name="Capuchino" price={formatCurrency(55, lang)} />
                                <MiniProductTile initial="L" name="Latte de vainilla" price={formatCurrency(65, lang)} />
                                <MiniProductTile initial="C" name="Croissant" price={formatCurrency(42, lang)} />
                                <MiniProductTile initial="C" name="Cold brew" price={formatCurrency(62, lang)} />
                            </div>
                        </Card>

                        {/* Inventory cell with a real low-stock chip */}
                        <Card tone="feature" padding="lg" className="flex flex-col">
                            <IconChip icon={Package} size="lg" tone="primary" className="mb-5" />
                            <h3 className="mb-2 font-serif text-xl font-semibold">{t('landing.featureInventoryTitle')}</h3>
                            <p className="text-muted-foreground">{t('landing.featureInventoryDesc')}</p>
                            <div className="mt-auto pt-5">
                                <div className="flex items-center gap-2 rounded-xl border border-warning/25 bg-warning-soft px-3 py-2 text-sm text-warning-soft-foreground">
                                    <AlertTriangle className="h-4 w-4 shrink-0" />
                                    <span className="font-medium">Croissant de almendra</span>
                                    <span className="ml-auto font-semibold tabular-nums">6</span>
                                </div>
                            </div>
                        </Card>

                        {/* Remaining feature cells */}
                        {smallFeatures.slice(1).map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <Card key={feature.title} tone="feature" padding="lg">
                                    <IconChip icon={Icon} size="lg" tone="primary" className="mb-5" />
                                    <h3 className="mb-2 font-serif text-xl font-semibold">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How it works — a day at Café Aurora */}
            <section id="how" className="border-y border-border bg-muted/40 px-6 py-20 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-sage-600 dark:text-sage-400">
                            <Coffee className="h-4 w-4" /> {STORE_NAME}
                        </span>
                        <h2 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">{t('landing.howTitle')}</h2>
                        <p className="mt-4 text-lg text-muted-foreground">{t('landing.howSubtitle')}</p>
                    </div>
                    <div className="relative grid gap-6 md:grid-cols-3">
                        {/* connecting rail */}
                        <div aria-hidden className="absolute left-0 right-0 top-12 hidden border-t border-dashed border-sage-300/60 dark:border-sage-700/60 md:block" />
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <Card key={step.n} tone="inset" padding="lg" className="relative">
                                    <div className="mb-4 flex items-center justify-between">
                                        <IconChip icon={Icon} size="lg" tone="sage" />
                                        <span className="font-serif text-3xl font-semibold text-sage-200 dark:text-sage-800">0{step.n}</span>
                                    </div>
                                    <h3 className="mb-1.5 font-serif text-xl font-semibold">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </Card>
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
                                            <IconChip icon={Icon} tone="primary" />
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
                        <div className="mt-8 flex justify-center">
                            <Link href="/login">
                                <Button size="lg">
                                    {t('landing.startTesting')}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="px-6 pb-24">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-sage-200 bg-gradient-to-br from-sage-50 to-warmth-50 p-10 text-center elevation-2 dark:border-sage-900/30 dark:from-sage-950/30 dark:to-warmth-900 md:p-16">
                    <div aria-hidden className="pointer-events-none absolute inset-0 noise-overlay" />
                    <div className="relative">
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
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border px-6 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <ZerionLogo size="sm" className="mb-4" />
                            <p className="max-w-md text-sm text-muted-foreground">{t('landing.footerTagline')}</p>
                            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-sage-500" />
                                {t('landing.footerStatus')}
                            </span>
                        </div>
                        <div>
                            <h4 className="mb-4 font-semibold">{t('landing.quickLinks')}</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/login" className="transition-colors hover:text-foreground">{t('landing.launchApp')}</Link></li>
                                <li><a href="#features" className="transition-colors hover:text-foreground">{t('landing.navFeatures')}</a></li>
                                <li><a href="#how" className="transition-colors hover:text-foreground">{t('landing.navHow')}</a></li>
                                <li><Link href="/backend" className="transition-colors hover:text-foreground">{t('landing.footerTech')}</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
                        <p>© {new Date().getFullYear()} {t('brand.name')}.</p>
                        <p>{t('landing.footerRights')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
