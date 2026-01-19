# Setup Inicial - Paso a Paso (Fase 0)

**Este documento contiene TODOS los archivos de configuración exactos que necesitas crear.**

---

## 📋 Flujo de Documentación

**Orden para empezar un nuevo MVP**:

1. Lee `README.md` del MVP → Contexto general
2. Lee `docs/CONTEXT.md` → Problema, solución, features
3. **Lee este documento** → Setup inicial (Fase 0)
4. Lee `docs/METHODOLOGY.md` → Proceso completo (Fases 1-5)
5. Consulta `../_shared/QUALITY_STANDARDS.md` → Configs específicas cuando las necesites
6. Consulta `../_shared/DESIGN_SYSTEM.md` → UI/UX patterns
7. Consulta `../_shared/TECH_STACK.md` → Librerías y servicios

---

## 🎯 Checklist Fase 0 (Día 1, ~4 horas)

Ejecuta EN ORDEN:

- [ ] 1. Inicializar proyecto Next.js
- [ ] 2. Crear todos los archivos de configuración
- [ ] 3. Instalar dependencias base
- [ ] 4. Configurar Supabase
- [ ] 5. Setup Git hooks (Husky)
- [ ] 6. Configurar CI/CD (GitHub Actions)
- [ ] 7. Verificar que todo funciona

---

## 1️⃣ Inicializar Proyecto

```bash
# En la carpeta del MVP (ej: mvp-01-inventory-pos/)
npx create-next-app@latest ./ \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

# Responder prompts:
# - TypeScript: Yes
# - ESLint: Yes
# - Tailwind: Yes
# - App Router: Yes
# - Customize import alias: Yes (@/*)
```

---

## 2️⃣ Crear Archivos de Configuración

### 📄 .nvmrc
**Ubicación**: Raíz del proyecto  
```
20.11.0
```

---

### 📄 tsconfig.json
**Ubicación**: Raíz del proyecto  
**Acción**: REEMPLAZAR el contenido generado con:

```json
{
  "compilerOptions": {
    // Strict Type Checking (OBLIGATORIO)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    // Additional Checks
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    
    // Module & Resolution
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "jsx": "preserve",
    
    // Next.js
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }],
    
    // Emit
    "noEmit": true,
    "incremental": true,
    
    // Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### 📄 .eslintrc.json
**Ubicación**: Raíz del proyecto  
**Acción**: REEMPLAZAR con:

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:security/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "security", "unused-imports"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "unused-imports/no-unused-imports": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

---

### 📄 .prettierrc
**Ubicación**: Raíz del proyecto  
**Acción**: CREAR archivo nuevo:

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

---

### 📄 .env.example
**Ubicación**: Raíz del proyecto  
**Acción**: CREAR archivo nuevo:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Sentry (opcional en dev, obligatorio en prod)
NEXT_PUBLIC_SENTRY_DSN=

# OpenAI (solo si MVP usa IA)
OPENAI_API_KEY=

# Pinecone (solo si MVP usa IA)
PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
```

---

### 📄 .env.local
**Ubicación**: Raíz del proyecto  
**Acción**: COPIAR .env.example y rellenar con tus valores reales

---

### 📄 .gitignore
**Ubicación**: Raíz del proyecto  
**Acción**: AGREGAR estas líneas al .gitignore existente:

```
# Environment variables
.env.local
.env*.local

# Testing
coverage/
playwright-report/
test-results/

# Misc
.DS_Store
*.pem
```

---

### 📄 tailwind.config.js
**Ubicación**: Raíz del proyecto  
**Acción**: REEMPLAZAR con:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design System colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        // CSS variables para dark mode
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'primary': '0 10px 25px -5px rgb(14 165 233 / 0.3)',
        'secondary': '0 10px 25px -5px rgb(217 70 239 / 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

---

### 📄 app/globals.css
**Ubicación**: `app/globals.css`  
**Acción**: REEMPLAZAR con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode */
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --border: 240 5.9% 90%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
  }

  .dark {
    /* Dark mode */
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
}
```

---

### 📄 vitest.config.ts
**Ubicación**: Raíz del proyecto  
**Acción**: CREAR archivo nuevo:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'vitest.setup.ts',
        '**/*.config.{ts,js}',
        '**/types/**',
        'tests/**',
      ],
      // Thresholds
      lines: 85,
      functions: 85,
      branches: 80,
      statements: 85,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

---

### 📄 vitest.setup.ts
**Ubicación**: Raíz del proyecto  
**Acción**: CREAR archivo nuevo:

```typescript
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})
```

---

### 📄 playwright.config.ts
**Ubicación**: Raíz del proyecto  
**Acción**: CREAR archivo nuevo:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

---

### 📄 next.config.js
**Ubicación**: Raíz del proyecto  
**Acción**: AGREGAR bundle analyzer:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
```

---

### 📄 .lighthouserc.json
**Ubicación**: Raíz del proyecto  
**Acción**: CREAR archivo nuevo:

```json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run start",
      "url": ["http://localhost:3000"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

---

### 📄 package.json scripts
**Ubicación**: Raíz del proyecto  
**Acción**: AGREGAR estos scripts al package.json existente:

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

---

### 📄 .github/workflows/ci.yml
**Ubicación**: `.github/workflows/ci.yml`  
**Acción**: CREAR carpeta `.github/workflows/` y archivo `ci.yml`:

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
          node-version-file: '.nvmrc'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Build
        run: npm run build
        env:
          SKIP_ENV_VALIDATION: true
  
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
```

---

## 3️⃣ Instalar Dependencias

```bash
# Dependencias de producción
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
npm install zod react-hook-form @hookform/resolvers
npm install date-fns
npm install lucide-react
npm install clsx tailwind-merge
npm install next-themes

# Tailwind plugins
npm install -D @tailwindcss/forms

# Dev dependencies - Quality tools
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-security eslint-plugin-unused-imports
npm install -D eslint-config-prettier prettier

# Dev dependencies - Testing
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test

# Dev dependencies - Otros
npm install -D husky lint-staged
npm install -D @next/bundle-analyzer

# Sentry (obligatorio)
npx @sentry/wizard@latest -i nextjs

# Si el MVP usa IA (solo MVP #6)
npm install ai openai
npm install @ai-sdk/openai
npm install @pinecone-database/pinecone
```

---

## 4️⃣ Configurar Supabase

```bash
# Inicializar Supabase en el proyecto
npx supabase init

# Crear archivo lib/supabase.ts
mkdir -p lib
```

**Crear `lib/supabase.ts`**:
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()
```

**Crear `lib/utils.ts`**:
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Crear estructura de carpetas**:
```bash
mkdir -p components/ui
mkdir -p components/features
mkdir -p hooks
mkdir -p types
mkdir -p tests/e2e
mkdir -p docs/screenshots
```

---

## 5️⃣ Setup Git Hooks (Husky)

```bash
npx husky init
```

**Crear `.husky/pre-commit`**:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run type-check
```

**Agregar a `package.json`**:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

---

## 6️⃣ Configurar Supabase Project

1. Ir a https://supabase.com
2. Crear nuevo proyecto
3. Copiar URL y ANON_KEY a `.env.local`
4. Linkar proyecto local:

```bash
npx supabase link --project-ref your-project-ref
```

---

## 7️⃣ Verificar Setup

```bash
# 1. Type check debe pasar
npm run type-check

# 2. Lint debe pasar (0 errores, 0 warnings)
npm run lint

# 3. Format debe pasar
npm run format:check

# 4. Tests deben pasar (aunque esté vacío)
npm run test

# 5. Build debe funcionar
npm run build

# 6. Dev server debe iniciar
npm run dev
```

Si TODO pasa → **Fase 0 completa** ✅

---

## 📊 Checklist Final Fase 0

- [ ] `.nvmrc` creado
- [ ] `tsconfig.json` configurado (strict mode)
- [ ] `.eslintrc.json` configurado
- [ ] `.prettierrc` creado
- [ ] `tailwind.config.js` con Design System
- [ ] `globals.css` con dark mode
- [ ] `vitest.config.ts` + `vitest.setup.ts`
- [ ] `playwright.config.ts`
- [ ] `.github/workflows/ci.yml`
- [ ] Todas las dependencias instaladas
- [ ] Supabase configurado
- [ ] Git hooks funcionando
- [ ] Todos los checks pasan

---

## ⏭️ Próximo Paso

**Ir a** `docs/METHODOLOGY.md` → **Fase 1: Shaping**

---

**Última actualización**: 2026-01-13  
**Versión**: 2.0
