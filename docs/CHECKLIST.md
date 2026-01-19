---
description: Checklist de QA completo antes de marcar MVP como production-ready
---

# Pre-Launch Checklist - Quality Assurance

Este checklist DEBE completarse al 100% antes de considerar un MVP como terminado.

---

## 🏗️ TECHNICAL FOUNDATION

### Build & Dependencies
- [ ] `npm run build` ejecuta sin errores
- [ ] `npm run build` ejecuta sin warnings
- [ ] Todas las dependencias están en versiones estables (no @next, @beta)
- [ ] No hay dependencias sin usar en package.json
- [ ] `.env.example` incluye todas las variables necesarias

### Code Quality
- [ ] ESLint: 0 errores
- [ ] TypeScript: 0 errores de tipos
- [ ] No hay `console.log` olvidados en código de producción
- [ ] No hay `TODO` o `FIXME` críticos sin resolver
- [ ] Código comentado/muerto removido

---

## 🎨 UI/UX EXCELLENCE

### Responsive Design
- [ ] **Mobile (375px)**: Layout perfecto, no overflow
- [ ] **Tablet (768px)**: Layout optimizado
- [ ] **Desktop (1440px)**: Aprovecha espacio disponible
- [ ] **Large Desktop (1920px)**: No se ve "estirado"
- [ ] Imágenes responsive (no pixeladas en ninguna resolución)

### Visual Quality
- [ ] Paleta de colores consistente (del Design System)
- [ ] Tipografía consistente (fuentes, tamaños, weights)
- [ ] Spacing consistente (no valores mágicos random)
- [ ] Estados hover en TODOS los elementos interactivos
- [ ] Estados focus visibles para accesibilidad
- [ ] Micro-animaciones suaves (transitions en buttons, links)

### User Feedback
- [ ] Loading states en todas las operaciones async
- [ ] Skeleton loaders donde aplique
- [ ] Success messages después de acciones importantes
- [ ] Error messages claros y user-friendly (no stack traces)
- [ ] Disabled states claros en buttons/inputs
- [ ] Empty states con CTAs claros

---

## ⚡ PERFORMANCE

### Lighthouse Scores (Production Build)
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Core Web Vitals
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Input Delay (FID) < 100ms

### Optimizations
- [ ] Todas las imágenes usan Next/Image
- [ ] Imágenes en formato moderno (WebP/AVIF)
- [ ] Fonts optimizados (subset, preload)
- [ ] No hay recursos bloqueantes innecesarios
- [ ] Code splitting implementado correctamente

---

## 🔐 SECURITY & DATA

### Authentication & Authorization
- [ ] Rutas protegidas funcionan correctamente
- [ ] Redirects a login funcionan
- [ ] Session persistence funciona
- [ ] Logout limpia session completamente
- [ ] No hay datos sensibles en localStorage sin encriptar

### Data Validation
- [ ] Cliente: Validación en formularios (required fields, formats)
- [ ] Servidor: Validación en API routes (nunca confiar en cliente)
- [ ] SQL injection protegido (usando ORM/prepared statements)
- [ ] XSS protegido (sanitización de inputs)

### Error Handling
- [ ] Errores de API manejados gracefully
- [ ] Errores de red manejados (offline, timeout)
- [ ] 404 page personalizada
- [ ] 500 error page personalizada
- [ ] No se exponen detalles sensibles en mensajes de error

---

## ✅ FUNCTIONALITY

### Core Features (Must-Haves)
- [ ] Feature #1: Funciona en happy path
- [ ] Feature #1: Maneja edge cases correctamente
- [ ] Feature #2: Funciona en happy path
- [ ] Feature #2: Maneja edge cases correctamente
- [ ] Feature #3: Funciona en happy path
- [ ] Feature #3: Maneja edge cases correctamente

### Forms & Inputs
- [ ] Validación en tiempo real (inline errors)
- [ ] Submit disabled mientras procesa
- [ ] Loading state durante submit
- [ ] Success/Error feedback después de submit
- [ ] Forms se resetean después de success (si aplica)

### Data Persistence
- [ ] Datos se guardan correctamente en DB
- [ ] Datos se recuperan correctamente de DB
- [ ] Updates funcionan sin perder datos
- [ ] Deletes funcionan (soft delete si aplica)
- [ ] No hay race conditions en writes

---

## 🌐 CROSS-BROWSER & COMPATIBILITY

### Browser Testing
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Device Testing
- [ ] iPhone (Safari)
- [ ] Android Phone (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop (3 browsers mínimo)

---

## 🔗 NAVIGATION & LINKS

### Links & Routes
- [ ] No hay broken links (internos o externos)
- [ ] Todos los links tienen `href` correcto
- [ ] External links abren en nueva tab (`target="_blank" rel="noopener"`)
- [ ] Navigation es intuitiva
- [ ] Breadcrumbs funcionan (si aplican)

### Back Button & History
- [ ] Browser back button funciona correctamente
- [ ] No hay loops infinitos en redirects
- [ ] Estado se preserva al navegar back (si aplica)

---

## 📱 MOBILE-SPECIFIC

### Touch & Gestures
- [ ] Tap targets > 44x44px (accesibilidad)
- [ ] No hover-only interactions (usar touch events)
- [ ] Scroll suave en mobile
- [ ] No horizontal scroll involuntario

### Mobile UX
- [ ] Keyboard aparece correctamente en inputs
- [ ] Input types correctos (`email`, `tel`, `number`)
- [ ] Orientación portrait funciona
- [ ] Orientación landscape funciona (si tiene sentido)

---

## 📄 CONTENT & SEO

### Meta Tags
- [ ] `<title>` descriptivo en cada página
- [ ] Meta description única por página
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags
- [ ] Favicon configurado

### Content
- [ ] No hay "Lorem ipsum" placeholder text
- [ ] Spelling correcto (español latinoamericano)
- [ ] Imágenes tienen `alt` text descriptivo
- [ ] Headings en orden correcto (h1 > h2 > h3)

---

## 🚀 DEPLOYMENT

### Environment Variables
- [ ] Variables de producción configuradas en Vercel
- [ ] API keys no están hardcoded en código
- [ ] URLs de API apuntan a producción (no localhost)

### Deploy Verification
- [ ] Deploy exitoso en Vercel
- [ ] URL personalizada configurada (si aplica)
- [ ] HTTPS funcionando correctamente
- [ ] DNS configurado correctamente (si aplica)

### Post-Deploy Checks
- [ ] Homepage carga correctamente
- [ ] Auth flow funciona en producción
- [ ] Database connections funcionan
- [ ] API calls funcionan (no CORS issues)

---

## 📚 DOCUMENTATION

### README.md
- [ ] Descripción clara del proyecto
- [ ] Screenshots del MVP
- [ ] Instrucciones de setup (local development)
- [ ] Instrucciones de deploy
- [ ] Tech stack listado
- [ ] Environment variables documentadas

### Code Documentation
- [ ] Funciones complejas tienen comentarios
- [ ] Components principales tienen descripción
- [ ] API routes documentadas (inputs/outputs)

---

## 🎬 DEMO MATERIALS

### Portfolio Assets
- [ ] Landing page del proyecto creada
- [ ] Video walkthrough grabado (2-3 min)
- [ ] Screenshots de calidad (1920x1080 min)
- [ ] Live demo funciona sin setup adicional
- [ ] Datos de ejemplo poblados

### Case Study
- [ ] Problema claramente definido
- [ ] Solución explicada
- [ ] Features key listados
- [ ] Tech stack explicado
- [ ] Métricas de impacto (ficticias pero realistas)

---

## ✨ FINAL POLISH

### "Wow Factor" Check
- [ ] Primera impresión es "premium", no "básico"
- [ ] Animaciones son suaves (no janky)
- [ ] Colores son vibrantes y modernos
- [ ] Typography es profesional
- [ ] Layout es balanceado y espaciado

### Usability Testing
- [ ] Un usuario no-técnico puede usar el MVP sin instrucciones
- [ ] Flujo principal es obvio e intuitivo
- [ ] No hay dead ends (siempre hay CTA claro)

---

## 🎯 FINAL SIGN-OFF

Solo marca como DONE cuando:
- [ ] **100% de este checklist está completo**
- [ ] Al menos 2 personas han probado el MVP
- [ ] Estás orgulloso de mostrarlo a un cliente potencial
- [ ] Justifica el precio de $2,500 USD

---

**Nota**: Si algún item no aplica a tu MVP específico, documentar por qué en `docs/TECHNICAL_NOTES.md`.
