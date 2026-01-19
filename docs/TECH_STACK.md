# Tech Stack Estandarizado - Zerion MVP Studio

Stack tecnológico pre-aprobado para desarrollo rápido, escalable y mantenible de MVPs profesionales.

---

## 🎯 Filosofía de Selección

**Criterios**:
1. **Velocidad de desarrollo** - Time to market crítico
2. **Escalabilidad** - Debe soportar crecimiento futuro
3. **Developer Experience** - Productividad máxima
4. **Costo** - Tier gratuito generoso, pricing predecible
5. **Integración** - Ecosistema cohesivo

---

## 🏗️ Core Stack

### Frontend Framework
**Next.js 14+ (App Router)**
- ✅ React framework más completo
- ✅ Server Components + Client Components
- ✅ File-based routing
- ✅ Built-in optimizations (images, fonts, code splitting)
- ✅ API routes integrados
- ✅ Deploy fácil en Vercel
- ✅ TypeScript first-class support

```bash
npx create-next-app@latest ./ \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

**Alternativa**: Vite + React (solo si el proyecto es SPA puro sin SSR)

---

### Styling
**Tailwind CSS 3+**
- ✅ Utility-first CSS
- ✅ Desarrollo rapidísimo
- ✅ Purge automático (bundle pequeño)
- ✅ Responsive design fácil
- ✅ Dark mode built-in
- ✅ Customizable (Design System)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Complementos**:
- `@tailwindcss/forms` - Estilos de formularios
- `@tailwindcss/typography` - Prose styling
- `clsx` / `cn` - Conditional classes utility

---

### Language
**TypeScript**
- ✅ Type safety = menos bugs
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Refactoring seguro
- ✅ Next.js integration perfecta

**tsconfig.json strict mode**: SIEMPRE activado

---

## 🗄️ Backend & Database

### Backend-as-a-Service (BaaS)
**Supabase**
- ✅ PostgreSQL hosted (database real, no NoSQL)
- ✅ Authentication built-in (email, OAuth, magic links)
- ✅ Row Level Security (RLS) para permisos granulares
- ✅ Real-time subscriptions
- ✅ Storage para archivos
- ✅ Edge Functions (serverless)
- ✅ Auto-generated TypeScript types
- ✅ Tier gratuito generoso (500MB DB, 50k MAU)

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npx supabase init
```

**Alternativa**: 
- Firebase (si se necesita NoSQL o integración Google)
- Vercel Postgres + Vercel KV (para proyectos muy simples)

---

### ORM (si se usa Supabase)
**Supabase Client (nativo)**
- ✅ No necesitas ORM adicional
- ✅ Type-safe queries con generated types
- ✅ Integration perfecta con RLS

**Alternativa**: Prisma (si backend es custom Node.js)

---

## 🔐 Authentication

**Supabase Auth**
- ✅ Email/Password
- ✅ Magic Links (passwordless)
- ✅ OAuth (Google, GitHub, etc.)
- ✅ Session management
- ✅ Email verification
- ✅ Password reset flows

**Setup básico**:
```tsx
// lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()
```

**Alternativa**: NextAuth.js (si ya tienes backend custom)

---

## 💳 Payments (si aplica)

### Para LATAM
**MercadoPago**
- ✅ Dominante en LATAM
- ✅ Integración simple
- ✅ Checkout prefabricado
- ✅ Webhooks para confirmaciones

**Setup**:
```bash
npm install mercadopago
```

### Para USA/Global
**Stripe**
- ✅ Mejor developer experience
- ✅ Checkout Sessions
- ✅ Subscriptions built-in
- ✅ Extensive documentation

---

## 📧 Email & Notifications

### Transactional Emails
**Resend**
- ✅ Modern API (mejor que SendGrid)
- ✅ React Email templates
- ✅ 3,000 emails/month gratis
- ✅ Next.js integration perfecta

```bash
npm install resend react-email
```

**Alternativa**: 
- SendGrid (más maduro)
- Postmark (transactional focus)

### WhatsApp (muy importante LATAM)
**Twilio WhatsApp API**
- ✅ Confirmaciones de reservas/pedidos
- ✅ Notificaciones importantes
- ✅ Mejor engagement que email en LATAM

---

## 🖼️ Media & Storage

### File Storage
**Supabase Storage**
- ✅ S3-compatible
- ✅ CDN integrado
- ✅ Image transformations
- ✅ RLS policies

**Alternativa**:
- Cloudinary (si necesitas transformaciones avanzadas)
- Vercel Blob (simple file storage)

### Image Optimization
**Next.js Image Component**
- ✅ Lazy loading automático
- ✅ Responsive images
- ✅ WebP/AVIF automático
- ✅ Blur placeholder

```tsx
import Image from 'next/image'

<Image 
  src="/hero.jpg" 
  alt="Hero" 
  width={1920} 
  height={1080}
  priority
/>
```

---

## 📊 Analytics & Monitoring

### Analytics
**Vercel Analytics** (básico, incluido)
- ✅ Web Vitals
- ✅ Performance metrics
- ✅ Cero configuración

**Alternativa**:
- Google Analytics 4 (más completo, pero más setup)
- Plausible (privacy-focused)

### Error Tracking
**Sentry**
- ✅ Error monitoring
- ✅ Performance monitoring
- ✅ Source maps support
- ✅ 5k errors/month gratis

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 🚀 Deployment & Hosting

### Frontend Hosting
**Vercel**
- ✅ Zero-config Next.js deploy
- ✅ Preview deployments automáticos
- ✅ Edge Network global
- ✅ Analytics incluido
- ✅ Tier gratuito perfecto para MVPs

```bash
npm install -g vercel
vercel --prod
```

**Alternativa**:
- Netlify (si no usas Next.js)
- Railway (full-stack con DB incluida)

### Database Hosting
**Supabase Cloud**
- ✅ Tier gratuito generoso
- ✅ Backups automáticos
- ✅ Global CDN

---

## 🛠️ Developer Tools

### Package Manager
**npm** (default, suficiente)
- Alternativa: `pnpm` (más rápido, usa menos espacio)

### Code Quality
**ESLint + Prettier**
```bash
npm install -D eslint prettier eslint-config-prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Git Hooks
**Husky + lint-staged** (opcional, pero recomendado)
```bash
npm install -D husky lint-staged
npx husky-init
```

---

## 📦 Essential Libraries

### UI Components (opcional)
**shadcn/ui** (copy-paste components)
- ✅ Tailwind-based
- ✅ Fully customizable
- ✅ Accessible (Radix UI)
- ✅ No dependency bloat

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
```

**Alternativa**: Headless UI (Tailwind Labs)

### Forms
**React Hook Form**
- ✅ Minimal re-renders
- ✅ Easy validation
- ✅ TypeScript support

```bash
npm install react-hook-form
npm install zod @hookform/resolvers # para validation schema
```

### Date Handling
**date-fns**
- ✅ Lightweight (vs moment.js)
- ✅ Immutable
- ✅ Tree-shakeable

```bash
npm install date-fns
```

### State Management
**Zustand** (si se necesita global state)
- ✅ Minimal boilerplate
- ✅ TypeScript-friendly
- ✅ Tiny bundle size

```bash
npm install zustand
```

**Note**: React Server Components + useState reduce necesidad de state management complejo

### Icons
**Lucide React** (fork de Feather Icons)
- ✅ 1000+ icons
- ✅ Consistent design
- ✅ Tree-shakeable

```bash
npm install lucide-react
```

### Charts (para dashboards)
**Recharts**
- ✅ Composable React charts
- ✅ Responsive
- ✅ Customizable

```bash
npm install recharts
```

---

## 🤖 AI/ML Stack (Para MVP #6: CRM con IA)

### Core AI Services

**Vercel AI SDK**
- ✅ React hooks: `useChat`, `useCompletion`
- ✅ Streaming responses
- ✅ Integration perfecta con Next.js
- ✅ Framework-agnostic (funciona con OpenAI, Anthropic, etc.)

```bash
npm install ai
```

**OpenAI API**
- ✅ GPT-4o para features complejas
- ✅ GPT-4o-mini para tareas simples (más barato)
- ✅ Embeddings para búsqueda semántica
- **Costo**: ~$0.01-0.03 per 1K tokens (GPT-4o-mini)

```bash
npm install openai
```

**Anthropic Claude** (alternativa)
- ✅ Claude 3.5 Sonnet (mejor reasoning)
- ✅ Mejor para análisis de documentos largos

```bash
npm install @anthropic-ai/sdk
```

### Vector Database

**Pinecone**
- ✅ Para RAG (Retrieval Augmented Generation)
- ✅ Búsqueda semántica de leads
- ✅ Free tier: 1 index, 100K vectors

```bash
npm install @pinecone-database/pinecone
```

**Alternativa**: Supabase pgvector (gratis, menos features)

### Example Implementations

**Smart Lead Scoring**:
```typescript
// lib/ai/score-lead.ts
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function scoreLeadWithAI(leadData: LeadData) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Score leads 1-100 based on fit." },
      { role: "user", content: JSON.stringify(leadData) }
    ],
    response_format: { type: "json_object" }
  })
  return JSON.parse(completion.choices[0].message.content)
}
```

**Chat Interface**:
```tsx
// components/ai-chat.tsx
'use client'
import { useChat } from 'ai/react'

export function AIChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>{m.role}: {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  )
}
```

**API Route** (app/api/chat/route.ts):
```typescript
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await streamText({
    model: openai('gpt-4o'),
    messages,
  })
  return result.toDataStreamResponse()
}
```

### Cost Management

**Estimación**:
- Development: $20-50/mes
- Production (100 users): $100-200/mes

**Optimization**:
```typescript
// Cache responses comunes
import { unstable_cache } from 'next/cache'

export const getCachedAIResponse = unstable_cache(
  async (query: string) => generateText({ prompt: query }),
  ['ai-cache'],
  { revalidate: 3600 }
)
```

---

## 🧪 Testing (MVP opcional, pero recomendado)

### Unit Testing
**Vitest** (si se necesita)
- ✅ Vite-powered (super rápido)
- ✅ Jest-compatible API

### E2E Testing
**Playwright** (para flujos críticos)
- ✅ Cross-browser
- ✅ Auto-wait
- ✅ Screenshot/video recording

---

## 📐 Project Structure Standard

```
mvp-XX-project-name/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── ui/                # Design system components
│   └── features/          # Feature-specific components
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── utils.ts           # Utilities
│   └── validations.ts     # Zod schemas
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
├── public/                # Static files
├── supabase/
│   ├── migrations/        # DB migrations
│   └── seed.sql           # Initial data
├── .env.local             # Environment variables
├── .env.example           # Template para .env
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ✅ Deployment Checklist

Antes de deploy a producción:
- [ ] Environment variables configuradas en Vercel
- [ ] Database backup configurado en Supabase
- [ ] Error tracking (Sentry) configurado
- [ ] Analytics configurado
- [ ] Domain personalizado (si aplica)
- [ ] SSL/HTTPS funcionando
- [ ] Email sender verificado (Resend/SendGrid)

---

## 💰 Pricing Estimates (Gratis hasta...)

| Service | Free Tier Limit | Suficiente para |
|---------|----------------|-----------------|
| Vercel | 100 GB bandwidth | 10,000+ visits/month |
| Supabase | 500MB DB, 50k MAU | MVP inicial |
| Resend | 3,000 emails/month | Notificaciones transaccionales |
| Sentry | 5k errors/month | Monitoring básico |
| Cloudinary | 25 credits/month | ~1000 images |

**Total costo mes 1-3**: $0 (todo en tier gratuito)

**Escalado** (cuando superes gratuito):
- Vercel Pro: $20/mes
- Supabase Pro: $25/mes
- Total: ~$50/mes para 100k+ usuarios

---

**Última actualización**: 2026-01-13  
**Mantenedor**: Zerion MVP Studio  
**Versión**: 1.0
