# CI/CD Pipeline Guide - Zerion MVP Studio

Configuración de integración y deployment continuo para garantizar calidad automatizada.

---

## 🎯 Objetivo

**Automatizar** build, test, security, y deployment para detectar issues antes de producción.

---

## 🔧 GitHub Actions Workflow

### Estructura de Workflows

```
.github/
└── workflows/
    ├── ci.yml              # CI: Tests, Lint, Build
    ├── deploy-preview.yml  # Preview deploys (Vercel)
    └── deploy-prod.yml     # Production deploys
```

---

## 📋 Workflow: Continuous Integration

**.github/workflows/ci.yml**:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  quality-checks:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npx prettier --check "**/*.{ts,tsx,json,md}"
      
      - name: Run tests
        run: npm run test:ci
        env:
          NODE_ENV: test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: true
  
  security-audit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Security Audit
        run: npm audit --audit-level=moderate
      
      - name: Check for outdated dependencies
        run: npm outdated || true
  
  lighthouse:
    runs-on: ubuntu-latest
    needs: quality-checks
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: true
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
  
  e2e-tests:
    runs-on: ubuntu-latest
    needs: quality-checks
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

**Agregar scripts a package.json**:
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

**Configuración Playwright**:
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

**Instalación**:
```bash
npm install -D @playwright/test
npx playwright install
```

**Ejemplo test**:
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('complete signup flow', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Sign Up')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('input[name="password"]', 'SecurePass123!')
  await page.click('button[type="submit"]')
  
  await expect(page).toHaveURL('/dashboard')
  await expect(page.locator('h1')).toContainText('Welcome')
})
```

---

## 🚀 Workflow: Vercel Deployment

### Preview Deployments (automático en PRs)

Vercel detecta PRs automáticamente y crea preview deployments.

**Configuración en Vercel Dashboard**:
1. Conectar repo de GitHub
2. Environment Variables configuradas
3. Preview deployments: Enabled

### Production Deployment

**.github/workflows/deploy-prod.yml**:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
      
      - name: Notify Sentry of deployment
        run: |
          curl https://sentry.io/api/0/organizations/${{ secrets.SENTRY_ORG }}/releases/ \
            -X POST \
            -H 'Authorization: Bearer ${{ secrets.SENTRY_AUTH_TOKEN }}' \
            -H 'Content-Type: application/json' \
            -d '{"version": "${{ github.sha }}", "projects": ["${{ secrets.SENTRY_PROJECT }}"]}'
```

---

## 📦 package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,json,md}\"",
    "test": "vitest",
    "test:ci": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "analyze": "ANALYZE=true next build",
    "prepare": "husky install"
  }
}
```

### .nvmrc File

Crear en raíz del proyecto:
```
20.11.0
```

---

## 🔐 Secrets Configuration

### GitHub Secrets (Configurar en Settings > Secrets):

```
VERCEL_TOKEN              # Token de Vercel
VERCEL_ORG_ID             # Organization ID de Vercel
VERCEL_PROJECT_ID         # Project ID de Vercel
SENTRY_AUTH_TOKEN         # Token de Sentry
SENTRY_ORG                # Organization de Sentry
SENTRY_PROJECT            # Project de Sentry
LHCI_GITHUB_APP_TOKEN     # Token para Lighthouse CI (opcional)
```

### Vercel Environment Variables:

**Development**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

**Production**:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## 🛡️ Branch Protection Rules

### Configurar en GitHub (Settings > Branches):

**Branch**: `main`

**Protection rules**:
- ✅ Require pull request reviews before merging (1 approval)
- ✅ Require status checks to pass before merging:
  - `quality-checks`
  - `security-audit`
  - `lighthouse` (opcional)
- ✅ Require branches to be up to date before merging
- ✅ Require conversation resolution before merging
- ✅ Do not allow bypassing the above settings

---

## 📊 Status Badges

Agregar a README.md:

```markdown
[![CI](https://github.com/username/repo/workflows/CI/badge.svg)](https://github.com/username/repo/actions)
[![codecov](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/username/repo)
```

---

## 🎯 Quality Gates Summary

**Antes de merge**:
1. ✅ All CI checks passing
2. ✅ Code review approved
3. ✅ No merge conflicts

**CI checks automáticos**:
- Type checking (TypeScript)
- Linting (ESLint)
- Format checking (Prettier)
- Unit tests + coverage
- E2E tests (Playwright)
- Security audit
- Build successful
- Lighthouse (opcional)

**Deployment automático**:
- Preview en cada PR
- Production en merge a `main`

---

## 🚨 Troubleshooting

### "npm audit" falla con vulnerabilidades

**Solución**:
```bash
# Ver detalles
npm audit

# Intentar fix automático
npm audit fix

# Si no se puede fix (breaking changes)
npm audit fix --force  # CUIDADO: puede romper cosas

# O agregar a allowlist temporal (no recomendado)
```

### Tests fallan en CI pero pasan local

**Causas comunes**:
- Diferencia en Node version → fijar en `.nvmrc`
- Environment variables faltantes → verificar GitHub Secrets
- Timezone differences → usar UTC en tests

### Lighthouse CI falla

**Solución**:
- Verificar que `npm run start` funciona
- Ajustar thresholds en `.lighthouserc.json` si es primera vez
- Deshabilitar temporalmente hasta after deploy inicial

---

**Última actualización**: 2026-01-13  
**Versión**: 2.0
