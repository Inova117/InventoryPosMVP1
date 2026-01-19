---
description: Mandatory development rules for code quality, optimization, and maintainability
---
# 📋 Development Rules - Mandatory Guidelines

These rules are **NON-NEGOTIABLE**. Every code change must comply. Use this to audit code or guide refactoring.

---

## 1. File Size Limits

| File Type | Max Lines | Action When Exceeded |
|-----------|-----------|---------------------|
| Page/Route (`page.tsx`) | 200 | Split into components |
| Component | 150 | Extract sub-components |
| Hook | 100 | Split logic into smaller hooks |
| Utility file | 80 | Group related utils |
| API Route | 100 | Extract to service layer |
| Type definitions | 50 | Split by domain |

**If a file exceeds limits → MUST refactor before committing.**

---

## 2. Component Rules

### 2.1 Single Responsibility
- One component = One purpose
- If a component does 2+ things → Split it

### 2.2 Props Limit
- Max 5 props per component
- If more needed → Use a config object or context

### 2.3 Nesting Limit
- Max 3 levels of JSX nesting
- If deeper → Extract to child component

### 2.4 No Inline Styles
- Use Tailwind classes only
- Extract repeated class combinations to `cn()` helpers

---

## 3. Type Safety

### 3.1 No `any`
- **NEVER** use `any` type
- Use `unknown` + type guards if type is uncertain
- Define proper interfaces for all data

### 3.2 Strict Types
```typescript
// ❌ BAD
const user: any = response.data

// ✅ GOOD
interface User {
  id: string
  name: string
}
const user: User = response.data
```

### 3.3 Export Types
- All shared types go in `lib/types/` or `lib/mock-db/types.ts`
- Import types, don't redefine

---

## 4. DRY (Don't Repeat Yourself)

### 4.1 Duplicate Code Detection
- If same logic appears 2+ times → Extract to utility
- If same JSX appears 2+ times → Extract to component

### 4.2 Shared Utilities Location
```
lib/utils.ts          → General utilities (cn, formatDate, etc.)
lib/constants.ts      → App-wide constants
lib/types/            → Shared type definitions
hooks/                → Reusable React hooks
components/ui/        → Reusable UI primitives
```

### 4.3 Magic Numbers/Strings
```typescript
// ❌ BAD
if (items.length > 5) { ... }
const color = '#0284c7'

// ✅ GOOD
const MAX_VISIBLE_ITEMS = 5
if (items.length > MAX_VISIBLE_ITEMS) { ... }
// Use Tailwind: text-primary-500
```

---

## 5. Performance Optimization

### 5.1 Memoization
- Use `useMemo` for expensive calculations
- Use `useCallback` for functions passed as props
- **Don't over-memoize** simple values

### 5.2 Component Optimization
```typescript
// ✅ Memoize expensive child components
const ExpensiveList = React.memo(({ items }) => ...)

// ✅ Use lazy loading for heavy components
const HeavyChart = dynamic(() => import('./Chart'), { ssr: false })
```

### 5.3 Data Fetching
- Fetch only what you need
- Use pagination for lists
- Implement proper loading states

---

## 6. Code Efficiency

### 6.1 Reduce Lines Without Losing Clarity
```typescript
// ❌ VERBOSE (6 lines)
let result
if (condition) {
  result = valueA
} else {
  result = valueB
}

// ✅ CONCISE (1 line)
const result = condition ? valueA : valueB
```

### 6.2 Array Methods Over Loops
```typescript
// ❌ VERBOSE
const filtered = []
for (const item of items) {
  if (item.active) filtered.push(item)
}

// ✅ CONCISE
const filtered = items.filter(item => item.active)
```

### 6.3 Object Destructuring
```typescript
// ❌ VERBOSE
const name = user.name
const email = user.email

// ✅ CONCISE
const { name, email } = user
```

### 6.4 Optional Chaining
```typescript
// ❌ VERBOSE
const name = user && user.profile && user.profile.name

// ✅ CONCISE
const name = user?.profile?.name
```

---

## 7. Import Organization

### Order (enforced by ESLint):
1. React/Next.js
2. External libraries
3. Internal aliases (`@/`)
4. Relative imports
5. Types (with `type` keyword)

```typescript
// ✅ CORRECT ORDER
import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

import { formatDate } from './utils'
import type { User } from '@/lib/types'
```

---

## 8. Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE | `MAX_ITEMS` |
| Types/Interfaces | PascalCase | `UserProfile` |
| Props interfaces | ComponentNameProps | `ButtonProps` |

---

## 9. Error Handling

### 9.1 Always Handle Errors
```typescript
// ❌ BAD
const data = await fetch('/api/data')

// ✅ GOOD
try {
  const response = await fetch('/api/data')
  if (!response.ok) throw new Error('Failed to fetch')
  const data = await response.json()
} catch (error) {
  console.error('Fetch error:', error)
  // Handle gracefully
}
```

### 9.2 User-Friendly Errors
- Never show raw error messages to users
- Map errors to user-friendly messages
- Log detailed errors to console/monitoring

---

## 10. Testing Checklist
Before committing, verify:
- [ ] `npm run build` passes (0 errors)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] All new functions have JSDoc comments
- [ ] File size limits respected
- [ ] No duplicate code introduced

---

## 11. Mock Data Isolation (AGENCY RULE)
- **NEVER** hardcode data inside components.
- All mock data must live in `lib/mock-data/` or `_shared/lib/mock-data/`.
- Components receive data via props, never direct import (facilitates future DB switch).

```typescript
// ❌ BAD
const UserList = () => {
  const users = [{id: 1, name: 'John'}] // Hardcoded inside
  return ...
}

// ✅ GOOD
// UserList.tsx
interface UserListProps {
  users: User[]
}
const UserList = ({ users }: UserListProps) => ...

// page.tsx
import { users } from '@/lib/mock-data/users'
return <UserList users={users} />
```

---

## 12. Server vs Client Components (AGENCY RULE)
- **Defaut**: Everything is a Server Component unless specified.
- Only add `'use client'` if you need:
    - `useState` / `useEffect`
    - Event listeners (`onClick`, `onChange`)
    - Browser APIs (`window`, `localStorage`)
- **Strategy**: Move interactive logic to leaf components. Keep pages and layouts as Server Components to fetch data.

---

## 13. The Boyscout Rule (No Regressions)
- Leave the code better than you found it.
- **PROHIBITED**: Commenting out old code "just in case". Delete it. Git has history.
- Improve variable names and types if you touch a legacy file.

---

## Quick Reference Card

```
✅ DO:
- Keep files small (<150 lines for components)
- Use proper TypeScript types
- Extract reusable logic
- Memoize expensive operations
- Handle all error cases
- Write self-documenting code
- Isolate Mock Data
- Prefer Server Components

❌ DON'T:
- Use `any` type
- Duplicate code
- Create deeply nested JSX
- Ignore TypeScript errors
- Leave TODO comments in production
- Over-engineer simple solutions
- Hardcode data in components
```

---

## Enforcement

// turbo-all
1. Run `npm run build` before every commit
2. Run `npm run lint` to check code style
3. Review file sizes during PR review
4. Refactor immediately if rules violated
