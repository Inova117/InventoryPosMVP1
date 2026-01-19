# 🔧 ENGINEERING GUIDE - MVP #1: Sistema de Inventario + POS

**Responsabilidad**: Tech Lead / Senior Engineer  
**Enfoque**: CÓMO construir, arquitectura, implementación

---

## 📑 Tabla de Contenidos

### SETUP & ARCHITECTURE
1. [Prerequisites](#1-prerequisites)
2. [Project Initialization](#2-project-initialization)
3. [Configuration Files](#3-configuration-files-completos)
4. [Database Architecture](#4-database-architecture)
5. [Security (RLS Policies)](#5-security-rls-policies)

### IMPLEMENTATION
6. [Feature Implementation](#6-feature-implementation)
   - [6.1 Authentication](#61-authentication-implementation)
   - [6.2 Product Management](#62-product-management)
   - [6.3 POS Implementation](#63-pos-implementation)
   - [6.4 Low Stock Alerts](#64-low-stock-alerts)
   - [6.5 Sales Dashboard](#65-sales-dashboard)

### QUALITY & DEPLOY
7. [Testing Strategy](#7-testing-strategy)
8. [Deployment](#8-deployment--monitoring)
9. [Troubleshooting](#9-troubleshooting)

---

## 🔗 Cross-Reference to Product Spec

**Este documento implementa features definidas en** `PRODUCT.md`

| Feature (PRODUCT.md) | Implementation (Este doc) |
|---------------------|--------------------------|
| Feature #1: Authentication & User Roles | § 6.1 |
| Feature #2: Product Management | § 6.2 |
| Feature #3: POS (Point of Sale) | § 6.3 |
| Feature #4: Low Stock Alerts | § 6.4 |
| Feature #5: Sales Dashboard | § 6.5 |

**Acceptance Criteria**: Cada sección referencia AC de PRODUCT.md

---

## 1. Prerequisites

### Required
- Node.js 20.11.0 (usar `.nvmrc`)
- npm 10+
- Git
- Cuenta Supabase (gratis)
- Cuenta Vercel (gratis)
- Cuenta Sentry (gratis)

### Verificación
```bash
node --version  # 20.11.0
npm --version   # 10+
git --version   # 2.40+
```

---

## 2. Project Initialization

### 2.1 Create Next.js Project

```bash
# En mvp-01-inventory-pos/
npx create-next-app@latest ./ \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

# Responder prompts:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ App Router: Yes
# ✓ Customize import alias: Yes (@/*)
```

**Verificación**:
```bash
npm run dev
# Debe abrir localhost:3000
```

---

## 3. Configuration Files (Completos)

### 3.1 TypeScript Configuration

**`tsconfig.json`** (REEMPLAZAR):
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }],
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "resolveJsonModule": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3.2 ESLint + Prettier

**`.eslintrc.json`**:
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
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
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "unused-imports/no-unused-imports": "error"
  }
}
```

**`.prettierrc`**:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### 3.3 Environment Variables

**`.env.example`**:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SENTRY_DSN=
```

**`.env.local`** (crear, NO commitear):
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

### 3.4 Testing Configuration

**`vitest.config.ts`**:
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

**`playwright.config.ts`**:
```typescript
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

### 3.5 Install Dependencies

```bash
# Core
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zod react-hook-form @hookform/resolvers
npm install date-fns lucide-react clsx tailwind-merge next-themes

# Dev dependencies
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-plugin-security eslint-plugin-unused-imports eslint-config-prettier prettier
npm install -D vitest @vitejs/plugin-react jsdom
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D @playwright/test @tailwindcss/forms
npm install -D husky lint-staged @next/bundle-analyzer

# Sentry
npx @sentry/wizard@latest -i nextjs
```

**Verificar instalación**:
```bash
npm list --depth=0 | grep -E "supabase|vitest|playwright"
```

---

## 4. Database Architecture

### 4.1 Schema Design

**Crear `supabase/migrations/00001_initial_schema.sql`**:

```sql
-- Stores table
CREATE TABLE stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('owner', 'cashier')) NOT NULL,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Suppliers
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  buy_price DECIMAL(10,2) NOT NULL CHECK (buy_price >= 0),
  sell_price DECIMAL(10,2) NOT NULL CHECK (sell_price >= 0),
  supplier_id UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(store_id, sku)
);

-- Sales
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  cashier_id UUID REFERENCES profiles(id) NOT NULL,
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  amount_received DECIMAL(10,2) NOT NULL CHECK (amount_received >= 0),
  change_given DECIMAL(10,2) NOT NULL CHECK (change_given >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sale items (line items)
CREATE TABLE sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
  subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0)
);

-- Indexes for performance
CREATE INDEX idx_products_store ON products(store_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_low_stock ON products(stock) WHERE (stock < 10);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_sales_store_date ON sales(store_id, created_at);
CREATE INDEX idx_sales_cashier ON sales(cashier_id);
CREATE INDEX idx_sale_items_sale ON sale_items(sale_id);
CREATE INDEX idx_sale_items_product ON sale_items(product_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_store ON profiles(store_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Aplicar migration**:
```bash
npx supabase init
npx supabase link --project-ref your-project-ref
npx supabase db push
```

**Generar TypeScript types**:
```bash
npx supabase gen types typescript --local > types/database.ts
```

---

## 5. Security (RLS Policies)

**CRÍTICO**: Row Level Security es la capa principal de seguridad.

**Crear `supabase/migrations/00002_rls_policies.sql`**:

```sql
-- Enable RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;

-- Stores policies
CREATE POLICY "Users can view their own store"
  ON stores FOR SELECT
  USING (
    owner_id = auth.uid() OR
    id IN (SELECT store_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Owners can create stores"
  ON stores FOR INSERT
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their stores"
  ON stores FOR UPDATE
  USING (owner_id = auth.uid());

-- Profiles policies
CREATE POLICY "Users can view profiles in their store"
  ON profiles FOR SELECT
  USING (
    id = auth.uid() OR
    store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products policies (store-scoped)
CREATE POLICY "Users can view their store's products"
  ON products FOR SELECT
  USING (store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Owners can manage products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'owner' 
      AND store_id = products.store_id
    )
  );

-- Suppliers policies
CREATE POLICY "Users can view their store's suppliers"
  ON suppliers FOR SELECT
  USING (store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Owners can manage suppliers"
  ON suppliers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() 
      AND role = 'owner' 
      AND store_id = suppliers.store_id
    )
  );

-- Sales policies
CREATE POLICY "Users can view their store's sales"
  ON sales FOR SELECT
  USING (store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Cashiers and owners can create sales"
  ON sales FOR INSERT
  WITH CHECK (
    cashier_id = auth.uid() AND
    store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid())
  );

-- Sale items policies (inherited from sales)
CREATE POLICY "Users can view sale items from their store"
  ON sale_items FOR SELECT
  USING (
    sale_id IN (
      SELECT id FROM sales 
      WHERE store_id IN (SELECT store_id FROM profiles WHERE id = auth.uid())
    )
  );

CREATE POLICY "Cashiers can create sale items"
  ON sale_items FOR INSERT
  WITH CHECK (
    sale_id IN (
      SELECT id FROM sales WHERE cashier_id = auth.uid()
    )
  );
```

**Aplicar**:
```bash
npx supabase db push
```

**Verificar RLS activo**:
```bash
npx supabase db remote exec "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
# row_security debe ser 't' (true)
```

---

## 6. Feature Implementation

### 6.1 Authentication Implementation

**Satisface**: `PRODUCT.md` → Feature #1  
**Acceptance Criteria**: `PRODUCT.md` → AC-1.1, AC-1.2, AC-1.3

#### 6.1.1 Supabase Client Setup

**`lib/supabase.ts`**:
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database'

export const supabase = createClientComponentClient<Database>()
```

#### 6.1.2 Validation Schemas

**`lib/validations.ts`**:
```typescript
import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['client', 'professional']),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
```

#### 6.1.3 Login Page

**`app/(auth)/login/page.tsx`**:
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInInput } from '@/lib/validations'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInInput) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Sign In
        </h1>

        {error && (
          <div
            className="mb-4 p-3 bg-error-light text-error-dark rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-error" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-error" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

#### 6.1.4 Middleware (Protected Routes)

**`middleware.ts`** (raíz):
```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect dashboard routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect authenticated users away from auth pages
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
```

**Verificación AC**:
- ✅ AC-1.2: Login form con email/password
- ✅ AC-1.2: Redirect a /dashboard post-login
- ✅ AC-1.2: Error mostrado si credentials inválidos
- ✅ AC-1.3: /dashboard requiere auth (middleware)


---

### 6.2 Product Management

**Satisface**: `PRODUCT.md` → Feature #2  
**AC**: `PRODUCT.md` → AC-2.1, AC-2.2, AC-2.3, AC-2.4

#### Validation Schema

**`lib/validations.ts`** (agregar):
```typescript
export const createProductSchema = z.object({
  sku: z.string().min(1, 'SKU is required').max(50),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  category: z.enum(['Alimentos', 'Bebidas', 'Limpieza', 'Electrónica', 'Otro']),
  stock: z.number().int().min(0, 'Stock must be >= 0'),
  buyPrice: z.number().min(0, 'Buy price must be >= 0'),
  sellPrice: z.number().min(0, 'Sell price must be >= 0'),
  supplierId: z.string().uuid().optional(),
})

export const updateProductSchema = createProductSchema.partial().omit({ sku: true })

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
```

#### API Route - Create Product

**`app/api/products/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createProductSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check user is owner
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, store_id')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.role !== 'owner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validation = createProductSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { sku, name, category, stock, buyPrice, sellPrice, supplierId } = validation.data

    // Check for duplicate SKU
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('store_id', profile.store_id)
      .eq('sku', sku)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'SKU already exists' },
        { status: 409 }
      )
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        store_id: profile.store_id,
        sku,
        name,
        category,
        stock,
        buy_price: buyPrice,
        sell_price: sellPrice,
        supplier_id: supplierId,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Verificación AC**:
- ✅ AC-2.1: Form validation (SKU, name, category, prices, stock)
- ✅ AC-2.1: SKU unique check
- ✅ AC-2.1: Only owners can create products

---

### 6.3 POS Implementation

**Satisface**: `PRODUCT.md` → Feature #3  
**AC**: `PRODUCT.md` → AC-3.1, AC-3.2, AC-3.3, AC-3.4, AC-3.5

#### Create Sale API

**`app/api/sales/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'

const createSaleSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().min(1),
      unitPrice: z.number().min(0),
    })
  ).min(1, 'Must have at least one item'),
  total: z.number().min(0),
  amountReceived: z.number().min(0),
})

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('store_id')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const body = await request.json()
    const validation = createSaleSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { items, total, amountReceived } = validation.data

    // Validate amount received >= total
    if (amountReceived < total) {
      return NextResponse.json(
        { error: 'Insufficient payment' },
        { status: 400 }
      )
    }

    // Check stock availability for all items
    for (const item of items) {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.productId)
        .single()

      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for product ${item.productId}` },
          { status: 409 }
        )
      }
    }

    const changeGiven = amountReceived - total

    // Create sale (transaction)
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        store_id: profile.store_id,
        cashier_id: session.user.id,
        total,
        amount_received: amountReceived,
        change_given: changeGiven,
      })
      .select()
      .single()

    if (saleError) {
      return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 })
    }

    // Create sale items and decrement stock
    for (const item of items) {
      const subtotal = item.quantity * item.unitPrice

      // Insert sale item
      await supabase.from('sale_items').insert({
        sale_id: sale.id,
        product_id: item.productId,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        subtotal,
      })

      // Decrement stock (atomic)
      await supabase.rpc('decrement_stock', {
        product_id: item.productId,
        quantity: item.quantity,
      })
    }

    return NextResponse.json({
      data: {
        id: sale.id,
        total: sale.total,
        change_given: changeGiven,
        receipt_url: `/receipts/${sale.id}`,
      },
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Database Function for Atomic Stock Decrement**:
```sql
CREATE OR REPLACE FUNCTION decrement_stock(product_id UUID, quantity INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock = stock - quantity
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql;
```

**Verificación AC**:
- ✅ AC-3.3: Stock validation before sale
- ✅ AC-3.3: Amount received >= total validation
- ✅ AC-3.3: Atomic stock decrement
- ✅ AC-3.4: Change calculation
- ✅ AC-3.5: Error on insufficient stock

---

### 6.4 Low Stock Alerts

**Satisface**: `PRODUCT.md` → Feature #4  
**AC**: `PRODUCT.md` → AC-4.1, AC-4.2, AC-4.3

#### Dashboard Query

**`app/api/products/low-stock/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('store_id')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('products')
      .select('id, sku, name, category, stock')
      .eq('store_id', profile.store_id)
      .lt('stock', 10)
      .order('stock', { ascending: true })

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }

    return NextResponse.json({
      data,
      count: data.length,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Verificación AC**:
- ✅ AC-4.2: Low stock = stock < 10
- ✅ AC-4.3: Ordered by stock ascending (most critical first)
- ✅ AC-4.1: Badge count = data.length

---

### 6.5 Sales Dashboard

**Satisface**: `PRODUCT.md` → Feature #5  
**AC**: `PRODUCT.md` → AC-5.1, AC-5.2, AC-5.3, AC-5.4

#### Dashboard Stats API

**`app/api/dashboard/stats/route.ts`**:
```typescript
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('store_id')
      .eq('id', session.user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const today = new Date().toISOString().split('T')[0]

    // Today's sales
    const { data: salesToday } = await supabase
      .from('sales')
      .select('total')
      .eq('store_id', profile.store_id)
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`)

    const salesTotal = salesToday?.reduce((sum, sale) => sum + parseFloat(sale.total.toString()), 0) || 0
    const transactionCount = salesToday?.length || 0

    // Low stock count
    const { count: lowStockCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('store_id', profile.store_id)
      .lt('stock', 10)

    // Top products (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: topProducts } = await supabase
      .rpc('get_top_products', {
        store_id_param: profile.store_id,
        start_date: sevenDaysAgo.toISOString(),
      })

    // Inventory value
    const { data: products } = await supabase
      .from('products')
      .select('stock, buy_price')
      .eq('store_id', profile.store_id)

    const inventoryValue = products?.reduce(
      (sum, p) => sum + (p.stock * parseFloat(p.buy_price.toString())),
      0
    ) || 0

    return NextResponse.json({
      data: {
        sales_today: {
          total: salesTotal,
          transaction_count: transactionCount,
        },
        low_stock_count: lowStockCount || 0,
        top_products: topProducts || [],
        inventory_value: inventoryValue,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Database Function for Top Products**:
```sql
CREATE OR REPLACE FUNCTION get_top_products(store_id_param UUID, start_date TIMESTAMPTZ)
RETURNS TABLE(name TEXT, quantity_sold BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT p.name, SUM(si.quantity) as quantity_sold
  FROM sale_items si
  JOIN products p ON si.product_id = p.id
  JOIN sales s ON si.sale_id = s.id
  WHERE s.store_id = store_id_param
    AND s.created_at >= start_date
  GROUP BY p.name
  ORDER BY quantity_sold DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;
```

**Verificación AC**:
- ✅ AC-5.1: Today's sales total + transaction count
- ✅ AC-5.2: Top 5 products by quantity
- ✅ AC-5.4: Inventory value (SUM(stock * buy_price))
- ✅ Low stock count

---
        price: sellPrice,
        stock: initialStock,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

**Verificación AC**:
- ✅ AC-2.3: Product creation API

---

#### Unit Tests

**`lib/__tests__/validations.test.ts`**:
```typescript
import { createProductSchema } from '@/lib/validations'

describe('createProductSchema', () => {
  it('accepts valid product data', () => {
    const validData = {
      name: 'Test Product',
      sku: 'SKU-001',
      category: 'Alimentos',
      buyPrice: 10.5,
      sellPrice: 15.99,
      stock: 100,
    }

    const result = createProductSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid prices', () => {
    const invalidData = {
      name: 'Test',
      sku: 'SKU-001',
      buyPrice: -5, // negative price
      sellPrice: 10,
      stock: 50,
    }

    const result = createProductSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })
})
```

---

#### E2E Tests (Playwright)

**`tests/e2e/pos-flow.spec.ts`**:
```typescript
import { test, expect } from '@playwright/test'

test.describe('POS Flow', () => {
  test('complete sale transaction', async ({ page }) => {
    // Login
    await page.goto('/login')
    await page.fill('[name=email]', 'test@example.com')
    await page.fill('[name=password]', 'password')
    await page.click('button:has-text("Login")')

    // Navigate to POS
    await page.goto('/pos')

    // Search and add product
    await page.fill('[placeholder="Search products"]', 'Product A')
    await page.click('text=Product A')
    
    // Fill quantity
    await page.fill('[name=quantity]', '2')
    
    // Complete sale
    await page.click('button:has-text("Complete Sale")')

    // Verify success
    await expect(page).toHaveURL('/pos')
    await expect(page.locator('text=Sale completed')).toBeVisible()
  })
})
```

---

### 7.4 Test Coverage Goals

| Area | Target Coverage |
|------|-----------------|
| **API Routes** | >80% |
| **Business Logic** | >90% |
| **Components** | >70% |
| **E2E Flows** | Critical paths 100% |

---

## 8. Deployment & Monitoring

### 8.1 Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Configure environment variables in Vercel Dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - NEXT_PUBLIC_SENTRY_DSN
```

### 8.2 Pre-Deploy Checklist

```bash
# All checks must pass
npm run type-check  # ✓
npm run lint        # ✓
npm run test:ci     # ✓ coverage > 85%
npm run test:e2e    # ✓
npm run build       # ✓
npm audit           # ✓ no high/critical
```

### 8.3 Monitoring

**Sentry** (already configured):
- Error tracking automático
- Performance monitoring
- Release tracking

**Vercel Analytics**:
- Web Vitals
- Edge function logs

---

## 9. Troubleshooting

### Build fails
```bash
rm -rf node_modules .next
npm install
npm run build
```

### 7.3 Security Testing

**Test RLS Policies**:
```bash
# Verify user can only see own store's data
npx supabase db remote exec "SELECT * FROM pg_policies WHERE tablename = 'products';"
npx supabase db remote exec "SELECT * FROM pg_policies WHERE tablename = 'sales';"
```

**Manual tests**:
- [ ] User A cannot see User B's store products
- [ ] User A cannot create sales for User B's store
- [ ] Non-authenticated requests fail
- [ ] SQL injection attempts blocked

---

### Type errors after DB change
```bash
# Regenerate types
npx supabase gen types typescript --local > types/database.ts
```

---

**Última actualización**: 2026-01-13  
**Versión**: 1.0  
**Owner**: Tech Lead
