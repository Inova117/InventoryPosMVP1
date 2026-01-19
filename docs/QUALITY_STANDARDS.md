# Estándares de Calidad - Zerion MVP Studio

Configuraciones y prácticas obligatorias para garantizar excelencia en código.

---

## 🎯 Filosofía

**"Production-Ready desde Día 1"**

No aceptamos atajos que generen deuda técnica. Cada MVP debe justificar $2,500 USD con calidad verificable.

---

## ⚙️ TypeScript Configuration

### tsconfig.json (OBLIGATORIO)

```json
{
  "compilerOptions": {
    // Strict Type Checking (NON-NEGOTIABLE)
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
    "noPropertyAccessFromIndexSignature": true,
    
    // Module & Resolution
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "jsx": "preserve",
    
    // Emit
    "noEmit": true,
    "incremental": true,
    
    // Interop
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    
    // Next.js
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Reglas**:
- ❌ CERO `any` permitidos (usar `unknown` con type guards)
- ✅ Todos los parámetros de función deben tener tipos explícitos
- ✅ Todas las funciones deben tener tipo de retorno explícito

---

## 🔍 ESLint Configuration

### .eslintrc.json (OBLIGATORIO)

```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:security/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "security", "unused-imports"],
  "rules": {
    // TypeScript
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    
    // Security
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn",
    
    // Code Quality
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "unused-imports/no-unused-imports": "error",
    "prefer-const": "error",
    "no-var": "error",
    
    // React
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-no-target-blank": "error"
  }
}
```

**Instalación**:
```bash
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-security eslint-plugin-unused-imports
npm install -D eslint-config-prettier
```

---

## 🎨 Prettier Configuration

### .prettierrc (OBLIGATORIO)

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

## 🪝 Git Hooks (Pre-commit)

### Husky + lint-staged Setup

**Instalación**:
```bash
npm install -D husky lint-staged
npx husky init
```

**package.json**:
```json
{
  "scripts": {
    "prepare": "husky install"
  },
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

**.husky/pre-commit**:
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run type-check
```

**package.json scripts**:
```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\""
  }
}
```

---

## 🧪 Testing Standards

### Framework: Vitest + React Testing Library

**Instalación**:
```bash
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**vitest.config.ts**:
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
        '**/types/**'
      ],
      // Coverage thresholds
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './')
    }
  }
})
```

**vitest.setup.ts**:
```typescript
import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Auto cleanup after each test
afterEach(() => {
  cleanup()
})
```

### Testing Requirements

**Mínimo Coverage**:
- ✅ Utility functions: 90%+
- ✅ Business logic: 80%+
- ✅ UI Components (critical paths): 70%+
- ✅ API routes: 80%+

**Test Categories**:
1. **Unit Tests** - funciones puras, utils, hooks
2. **Integration Tests** - componentes con estado, API calls
3. **E2E Tests** (opcional para MVP) - user flows críticos

**Ejemplo de test**:
```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatCurrency } from './utils'

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000, 'USD')).toBe('$1,000.00')
  })
  
  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00')
  })
  
  it('handles negative numbers', () => {
    expect(formatCurrency(-500, 'USD')).toBe('-$500.00')
  })
})
```

---

## 🔒 Security Standards

### OWASP Top 10 Checklist (OBLIGATORIO)

**En cada feature, verificar**:
- [ ] **Injection**: Input sanitization (Zod schemas)
- [ ] **Broken Auth**: Supabase RLS policies activas
- [ ] **Sensitive Data**: No secrets en código, usar env vars
- [ ] **XML External Entities**: N/A (no usamos XML)
- [ ] **Broken Access Control**: Validar permisos en API routes
- [ ] **Security Misconfig**: Headers de seguridad configurados
- [ ] **XSS**: React escapa por defecto, evitar `dangerouslySetInnerHTML`
- [ ] **Insecure Deserialization**: Validar JSON inputs
- [ ] **Components with Known Vulnerabilities**: `npm audit` en CI
- [ ] **Insufficient Logging**: Error tracking configurado

### Dependency Scanning

**npm audit en CI**:
```yaml
# .github/workflows/security.yml
- name: Security Audit
  run: npm audit --audit-level=moderate
```

**Herramientas recomendadas**:
- Snyk (gratis para open source)
- npm audit (built-in)
- Dependabot (GitHub, gratis)

---

## 📊 Performance Budgets

### Lighthouse CI

**.lighthouserc.json**:
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

### Bundle Size Monitoring

**package.json**:
```json
{
  "scripts": {
    "analyze": "ANALYZE=true next build"
  }
}
```

**next.config.js**:
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ... other config
})
```

---

## 🐛 Error Tracking

### Sentry Setup (OBLIGATORIO para producción)

**Instalación**:
```bash
npx @sentry/wizard@latest -i nextjs
```

**sentry.client.config.ts**:
```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% de transacciones
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, // 100% cuando hay error
})
```

**Structured Logging**:
```typescript
// lib/logger.ts
export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    console.info(message, meta)
    // En producción, enviar a servicio de logging
  },
  error: (message: string, error: Error, meta?: Record<string, unknown>) => {
    console.error(message, error, meta)
    Sentry.captureException(error, { extra: meta })
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    console.warn(message, meta)
  }
}
```

---

## 📝 Code Review Checklist

Antes de marcar PR como "ready for review":

### Functionality
- [ ] Feature funciona según specs
- [ ] Edge cases manejados
- [ ] Tests escritos y passing

### Code Quality
- [ ] No code smells (funciones > 50 líneas, clases God object)
- [ ] DRY - no duplicación
- [ ] SOLID principles aplicados
- [ ] Naming descriptivo (no `data`, `temp`, `x`)

### TypeScript
- [ ] Zero `any` types
- [ ] Tipos explícitos en funciones
- [ ] No errores de tipo
- [ ] Exhaustive checks en switches

### Security
- [ ] Input validation con Zod
- [ ] No secrets hardcoded
- [ ] RLS policies activas (Supabase)
- [ ] No XSS vulnerabilities

### Performance
- [ ] Images optimizadas (Next/Image)
- [ ] No N+1 queries
- [ ] Lazy loading donde aplique
- [ ] No blocking scripts

### Testing
- [ ] Unit tests para lógica
- [ ] Coverage > threshold
- [ ] No console.logs olvidados

### Documentation
- [ ] Comentarios en lógica compleja
- [ ] Tipos documentados (JSDoc si necesario)
- [ ] README actualizado si aplica

---

## ✅ Quality Gates

**Antes de merge a main**:
1. ✅ All tests passing
2. ✅ ESLint: 0 errors, 0 warnings
3. ✅ TypeScript: 0 errors
4. ✅ Code review approved
5. ✅ Coverage threshold met
6. ✅ Security audit passed
7. ✅ Build successful

**Antes de deploy a producción**:
1. ✅ Lighthouse CI passed
2. ✅ E2E tests passed (si existen)
3. ✅ No high-severity npm audit issues
4. ✅ Sentry configurado
5. ✅ Environment variables verificadas

---

**Última actualización**: 2026-01-13  
**Versión**: 2.0 (Excellence Standards)
