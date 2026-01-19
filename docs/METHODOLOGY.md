---
description: Metodología completa para desarrollo de MVPs - Build-Measure-Learn + Quality Excellence
---

# Metodología Profesional de Desarrollo de MVPs v2.0

Esta metodología combina principios de **Lean Startup**, **Shape Up** (Basecamp), **DevOps/CI/CD**, y estándares de calidad 2024 para garantizar MVPs production-ready que justifican $2,500 USD.

## 🎯 Filosofía Core

**Fixed Time, Variable Scope**: 2 semanas por MVP, ajustando alcance según necesidad.  
**Build-Measure-Learn**: Iteración rápida basada en feedback real.  
**Minimum Delightful Product**: No solo viable, sino delightful desde día 1.  
**Quality First**: Automated testing, CI/CD, y security desde día 1.

---

## Fase 0: EXCELLENCE SETUP (Día 1) - Foundation de Calidad

**NUEVA**: Setup de herramientas de calidad antes de escribir código.

### 0.1 Project Initialization
```bash
// turbo
npx create-next-app@latest ./ --typescript --tailwind --app
cd <project-name>
```

### 0.2 Quality Tools Setup

**TypeScript Strict Mode**:
```bash
# Copiar tsconfig.json desde _shared/QUALITY_STANDARDS.md
# Verificar strict: true y todas las opciones strict*
```

**ESLint + Prettier**:
```bash
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-security eslint-plugin-unused-imports
npm install -D eslint-config-prettier prettier

# Copiar .eslintrc.json y .prettierrc desde QUALITY_STANDARDS.md
```

**Git Hooks (Pre-commit)**:
```bash
npm install -D husky lint-staged
npx husky init

# Configurar pre-commit hook para lint + type-check
```

**Testing Framework**:
```bash
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Copiar vitest.config.ts desde QUALITY_STANDARDS.md
```

**Error Tracking**:
```bash
npx @sentry/wizard@latest -i nextjs
# Configurar Sentry DSN
```

### 0.3 CI/CD Setup

**GitHub Actions**:
```bash
# Crear .github/workflows/ci.yml
# Copiar desde CI_CD_GUIDE.md
```

**Vercel Integration**:  
- Conectar repo en Vercel dashboard
- Configurar environment variables
- Habilitar preview deployments

### 0.4 Project Structure
```bash
mkdir -p app components/{ui,features} lib hooks types tests docs/screenshots
touch lib/utils.ts lib/validations.ts
```

**Output**: 
- ✅ TypeScript strict mode configurado
- ✅ ESLint + Prettier + Git hooks funcionando
- ✅ Testing framework listo
- ✅ CI/CD pipeline configurado
- ✅ Error tracking activo

**Tiempo**: ~4 horas (Día 1 mañana)

---

## Fase 1: SHAPING (Día 1-2) - Definición del Problema

### 1.1 Definir el Problema
```
¿Qué problema específico resuelve este MVP?
¿Quién es el usuario objetivo?
¿Por qué las soluciones actuales fallan?
```

### 1.2 Establecer "Appetite" (Budget de Tiempo)
- **MVP Timeline**: 2 semanas máximo
- **Core Features**: Máximo 5 features críticos
- **Nice-to-have**: Documentar para roadmap futuro

### 1.3 Identificar Rabbit Holes (Riesgos)
Lista de potenciales bloqueadores:
- Integraciones de terceros complejas
- Features con UX ambigua
- Dependencias externas

### 1.4 Crear el "Pitch"
Documento de 1 página:
- Problema + Solución
- Core features (MoSCoW: Must/Should/Could/Won't)
- Wireframes básicos
- Tech stack propuesto
- **Security considerations** (OWASP checklist)

**Output**: `docs/PROJECT_PITCH.md`

---

## Fase 2: ARQUITECTURA (Día 2-3) - Technical Foundation

### 2.1 Tech Stack Decision
Usar stack estandarizado (ver `TECH_STACK.md`):
- **Frontend**: Next.js 14+ (App Router)
- **Backend**: Next.js API Routes / Supabase
- **Database**: PostgreSQL (via Supabase)
- **Styling**: Tailwind CSS + Design System compartido
- **Auth**: Supabase Auth / NextAuth
- **Deploy**: Vercel

### 2.2 Database Schema Design
- Diseñar schema completo en `docs/DATABASE_SCHEMA.md`
- Crear migraciones en `supabase/migrations/`
- **Configurar RLS policies** (Row Level Security)
- Generar TypeScript types automáticamente

### 2.3 Validation Schemas (Zod)
```typescript
// lib/validations.ts
import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  // ... otros campos
})

export type CreateUserInput = z.infer<typeof createUserSchema>
```

### 2.4 Design System Application
- Aplicar paleta de colores de `_shared/DESIGN_SYSTEM.md`
- Reutilizar componentes UI de `_shared/components/`
- Mantener consistencia visual

**Output**: 
- Architecture documentation
- Database migrations
- Zod schemas para validación

---

## Fase 3: BUILD (Día 3-11) - Development Sprint con TDD

### 3.1 Setup Inicial
```bash
// turbo
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs zod
npm install @supabase/auth-ui-react @supabase/auth-ui-shared
```

### 3.2 Orden de Desarrollo (Priorizado)

**Día 3-4: Foundation**
1. Database setup + migrations + RLS
2. Authentication flow **con tests**
3. Basic routing structure
4. Design system integration

**Día 5-8: Core Features (TDD)**
5. Feature #1 **con tests** - Red → Green → Refactor
6. Feature #2 **con tests** - Red → Green → Refactor
7. Feature #3 **con tests** - Red → Green → Refactor

**Día 9-10: Polish & Secondary Features**
8. Features secundarios (Should-have)
9. Error handling robusto **con Sentry**
10. Loading states & optimistic updates
11. Responsive design perfecto

**Día 11: Integration & Performance**
12. Integration testing
13. Cross-browser testing
14. Performance optimization (bundle analysis)

### 3.3 Development Principles

**Code Quality** (ENFORCEMENT AUTOMÁTICO):
- TypeScript strict mode → CI falla si hay errores
- ESLint + Prettier → Git hook rechaza commits sucios
- Zero warnings en build → CI falla

**Testing Strategy** (OBLIGATORIO):
- **Unit tests**: Utils, hooks, business logic (90% coverage)
- **Integration tests**: Components con estado (70% coverage)
- **API route tests**: Todas las endpoints (80% coverage)
- Run en CI: `npm run test:ci`

**Security** (CHECKLIST en cada PR):
- [ ] Input validation con Zod
- [ ] RLS policies activas en Supabase
- [ ] No secrets hardcoded
- [ ] XSS prevention (React escapes by default)
- [ ] CSRF protection configurado

**Performance**:
- Lighthouse score > 90 (enforced en CI)
- First Contentful Paint < 1.5s
- Images optimizadas (Next/Image)
- Bundle size monitored

**Output**: Functional, tested MVP code

---

## Fase 4: MEASURE (Día 12-13) - Quality Assurance

### 4.1 Automated Quality Gates (En CI)

**Pre-merge checks** (automáticos):
- ✅ TypeScript: 0 errors
- ✅ ESLint: 0 errors, 0 warnings
- ✅ Tests: All passing, coverage > threshold
- ✅ Build: Successful
- ✅ Security audit: No high vulnerabilities
- ✅ Lighthouse CI: Scores > 90

### 4.2 Pre-Launch Checklist Manual
Ejecutar checklist completo: `pre-launch-checklist.md`

**Critical items**:
- [ ] Flujo completo de usuario (happy path)
- [ ] Edge cases probados
- [ ] Responsive: Mobile, Tablet, Desktop
- [ ] Cross-browser: Chrome, Firefox, Safari
- [ ] Error tracking funciona (Sentry test)
- [ ] Performance en red lenta (throttling)

### 4.3 Security Scan Final
```bash
npm audit --audit-level=moderate
# Verificar OWASP Top 10 checklist
```

**Output**: Production-ready MVP que pasa TODOS los quality gates

---

## Fase 5: LEARN (Día 14) - Documentation & Demo

### 5.1 Documentation
Crear/actualizar:
- `README.md` - Setup instructions, features, tech stack
- `docs/USER_GUIDE.md` - Guía de usuario con screenshots
- `docs/TECHNICAL_NOTES.md` - Decisiones técnicas, trade-offs

### 5.2 Demo Materials
Para portfolio:
1. **Landing Page del Proyecto**: Explica problema + solución
2. **Video Walkthrough**: 2-3 min demo en español
3. **Live Demo**: Deploy a Vercel con datos de ejemplo
4. **Case Study**: Documento con métricas y value proposition

### 5.3 Deploy to Production
```bash
// turbo
vercel --prod
# Configurar environment variables
# Verificar Sentry está recibiendo events
```

### 5.4 Post-Launch Monitoring Setup
- Vercel Analytics activo
- Sentry Performance Monitoring configurado
- Uptime monitoring (opcional: UptimeRobot)

### 5.5 Post-Launch Review
Documentar para futuras iteraciones:
- ¿Qué funcionó bien?
- ¿Qué tomaría más tiempo de lo esperado?
- ¿Qué features recortamos? (Technical debt backlog)
- Lessons learned

**Output**: Deployed MVP + complete documentation + monitoring activo

---

## 📊 Success Criteria (Actualizado)

Un MVP está completo cuando cumple:
1. ✅ Resuelve el problema core de forma funcional
2. ✅ UI es premium y delightful (no se ve "MVP básico")
3. ✅ **Pasa TODOS los automated quality gates (CI)**
4. ✅ **Test coverage > 70% (enforced)**
5. ✅ **Security audit clean (no high/critical)**
6. ✅ **Lighthouse > 90 en todas las categorías**
7. ✅ **Error tracking configurado y funcionando**
8. ✅ Documentación completa
9. ✅ Deploy en producción funcionando
10. ✅ Demo materials listos para mostrar a clientes

---

## 🔄 Continuous Improvement

### Technical Debt Management
- Trackear en GitHub Issues con label `technical-debt`
- Priorizar en cada sprint
- Never let coverage drop below threshold

### Performance Monitoring
- Review Vercel Analytics semanalmente
- Monitor Sentry error rates
- Check Core Web Vitals trends

---

## 🎯 Diferencia vs Versión Anterior

| Aspecto | v1.0 (Anterior) | v2.0 (Actual) |
|---------|----------------|---------------|
| Testing | Manual + opcional | **Automated + obligatorio (70% coverage)** |
| CI/CD | Deploy manual | **GitHub Actions + automated deploys** |
| TypeScript | "Strict mode" mencionado | **Enforced en CI, pre-commit hooks** |
| Security | Checklist básico | **OWASP + automated scanning** |
| Error Tracking | Opcional | **Sentry obligatorio desde día 1** |
| Quality Gates | Manual checklist | **Automated + manual** |
| Code Review | No mencionado | **Mandatory con checklist** |

---

**Versión**: 2.0 - Excellence Standards  
**Última actualización**: 2026-01-13  
**Mantenedor**: Zerion MVP Studio

**Nota**: Esta metodología es más exigente que v1.0, pero justifica $2,500 USD con calidad verificable. Si un MVP específico requiere ajustes, documentar en `TECHNICAL_NOTES.md`.
