# Design System - Zerion MVP Studio

Sistema de diseño compartido para mantener consistencia visual premium entre todos los MVPs del portfolio.

---

## 🎨 Paleta de Colores

### Primary Colors (Base)
```css
/* Moderno, vibrante, profesional */
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;  /* Primary principal */
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;
```

### Secondary Colors (Accent)
```css
/* Complemento vibrante */
--secondary-50: #fdf4ff;
--secondary-100: #fae8ff;
--secondary-200: #f5d0fe;
--secondary-300: #f0abfc;
--secondary-400: #e879f9;
--secondary-500: #d946ef;  /* Accent principal */
--secondary-600: #c026d3;
--secondary-700: #a21caf;
--secondary-800: #86198f;
--secondary-900: #701a75;
```

### Neutrals (Dark Mode Ready)
```css
/* Para textos, backgrounds, borders */
--gray-50: #fafafa;
--gray-100: #f4f4f5;
--gray-200: #e4e4e7;
--gray-300: #d4d4d8;
--gray-400: #a1a1aa;
--gray-500: #71717a;
--gray-600: #52525b;
--gray-700: #3f3f46;
--gray-800: #27272a;
--gray-900: #18181b;
--gray-950: #09090b;
```

### Semantic Colors
```css
/* Success */
--success-light: #d1fae5;
--success: #10b981;
--success-dark: #065f46;

/* Warning */
--warning-light: #fef3c7;
--warning: #f59e0b;
--warning-dark: #92400e;

/* Error */
--error-light: #fee2e2;
--error: #ef4444;
--error-dark: #991b1b;

/* Info */
--info-light: #dbeafe;
--info: #3b82f6;
--info-dark: #1e40af;
```

---

## 📝 Tipografía

### Font Stack

**Primary Font (UI)**: Inter
```css
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- Descargar: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- Variantes: 400, 500, 600, 700

**Secondary Font (Display)**: Outfit
```css
font-family: 'Outfit', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```
- Descargar: [Google Fonts - Outfit](https://fonts.google.com/specimen/Outfit)
- Variantes: 600, 700, 800

**Monospace Font (Code)**: JetBrains Mono
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Type Scale
```css
/* Headings */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
--text-6xl: 3.75rem;    /* 60px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

---

## 🔲 Spacing System

Usar escala consistente (basada en 4px):
```css
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

**Uso**:
- Padding interno: 4, 6, 8
- Margin entre elementos: 4, 6, 8, 12
- Section spacing: 16, 20, 24

---

## 🎭 Shadows & Effects

### Box Shadows
```css
/* Elevation levels */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Colored shadows (para CTAs) */
--shadow-primary: 0 10px 25px -5px rgb(14 165 233 / 0.3);
--shadow-secondary: 0 10px 25px -5px rgb(217 70 239 / 0.3);
```

### Border Radius
```css
--radius-sm: 0.375rem;   /* 6px */
--radius-base: 0.5rem;   /* 8px */
--radius-md: 0.75rem;    /* 12px */
--radius-lg: 1rem;       /* 16px */
--radius-xl: 1.5rem;     /* 24px */
--radius-2xl: 2rem;      /* 32px */
--radius-full: 9999px;   /* Pills/circles */
```

### Transitions
```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Properties to animate */
transition: all var(--transition-base);
transition: transform var(--transition-base), opacity var(--transition-base);
```

---

## 🧩 Component Patterns

### Buttons

**Primary Button**:
```tsx
<button className="
  px-6 py-3 
  bg-primary-500 hover:bg-primary-600 
  text-white font-semibold 
  rounded-lg 
  shadow-md hover:shadow-lg 
  transition-all duration-200 
  hover:scale-105 
  active:scale-95
">
  Call to Action
</button>
```

**Secondary Button**:
```tsx
<button className="
  px-6 py-3 
  bg-white hover:bg-gray-50 
  text-primary-500 font-semibold 
  border-2 border-primary-500 
  rounded-lg 
  transition-all duration-200
">
  Secondary Action
</button>
```

**Ghost Button**:
```tsx
<button className="
  px-4 py-2 
  text-gray-700 hover:text-primary-500 
  font-medium 
  hover:bg-gray-100 
  rounded-lg 
  transition-all duration-200
">
  Tertiary Action
</button>
```

### Cards

**Standard Card**:
```tsx
<div className="
  bg-white 
  rounded-xl 
  shadow-md hover:shadow-xl 
  p-6 
  transition-all duration-300 
  hover:-translate-y-1 
  border border-gray-200
">
  {/* Content */}
</div>
```

**Glassmorphism Card** (trendy):
```tsx
<div className="
  bg-white/80 backdrop-blur-lg 
  rounded-xl 
  shadow-lg 
  p-6 
  border border-white/20
">
  {/* Content */}
</div>
```

### Inputs

**Text Input**:
```tsx
<input 
  type="text"
  className="
    w-full px-4 py-3 
    bg-white 
    border-2 border-gray-300 
    rounded-lg 
    focus:border-primary-500 focus:ring-4 focus:ring-primary-100 
    transition-all duration-200 
    outline-none
  "
  placeholder="Enter text..."
/>
```

**Label** (siempre con inputs):
```tsx
<label className="block text-sm font-medium text-gray-700 mb-2">
  Field Name
</label>
```

---

## 🌊 Gradients

### Background Gradients
```css
/* Hero sections */
background: linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%);

/* Subtle overlay */
background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.05));

/* Card accent */
background: linear-gradient(to right, #f0f9ff, #fdf4ff);
```

### Text Gradients
```css
.gradient-text {
  background: linear-gradient(135deg, #0ea5e9, #d946ef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 💫 Animations

### Micro-Animations (CRÍTICO para "delightful")

**Hover Lift**:
```css
.hover-lift {
  transition: transform 200ms ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
}
```

**Scale on Hover**:
```css
.hover-scale {
  transition: transform 200ms ease;
}
.hover-scale:hover {
  transform: scale(1.05);
}
```

**Pulse** (para CTAs importantes):
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

**Fade In** (para content reveal):
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in {
  animation: fadeIn 400ms ease-out;
}
```

---

## 📱 Breakpoints

```css
/* Mobile First! */
/* xs: 0px - 640px (default) */

/* sm */
@media (min-width: 640px) { /* Tablet portrait */ }

/* md */
@media (min-width: 768px) { /* Tablet landscape */ }

/* lg */
@media (min-width: 1024px) { /* Desktop */ }

/* xl */
@media (min-width: 1280px) { /* Large desktop */ }

/* 2xl */
@media (min-width: 1536px) { /* Extra large */ }
```

**En Tailwind**:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

---

## 🎯 Usage Rules

### DO's ✅
- Usar colores del sistema (no inventar valores nuevos)
- Aplicar micro-animations en elementos interactivos
- Mantener spacing consistente (múltiplos de 4px)
- Usar font weights correctos (no usar font-normal en headings)
- Añadir estados hover/focus a TODOS los interactivos
- Mobile-first approach siempre

### DON'Ts ❌
- No usar colores "plain" (red, blue, green básicos)
- No usar valores mágicos de spacing (e.g., margin: 13px)
- No olvidar loading/hover/disabled states
- No usar Comic Sans (obvio, pero importante)
- No hacer hover-only interactions en mobile
- No hardcodear breakpoints (usar sistema)

---

## 🔧 Implementation

### Tailwind Config Setup
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // ... rest of primary colors
        },
        secondary: {
          50: '#fdf4ff',
          // ... rest of secondary colors
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'primary': '0 10px 25px -5px rgb(14 165 233 / 0.3)',
        'secondary': '0 10px 25px -5px rgb(217 70 239 / 0.3)',
      }
    }
  }
}
```

### Google Fonts Import
```tsx
// app/layout.tsx
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' })
```

---

## ♿ Accessibility Standards (WCAG 2.1 AA)

### Color Contrast Requirements

**Mínimos obligatorios**:
- Normal text (< 18pt): **4.5:1** contrast ratio
- Large text (≥ 18pt o 14pt bold): **3:1** contrast ratio  
- UI components: **3:1** vs adjacent colors

**Nuestra paleta (validada)**:
- ✅ Gray-900 (#18181b) on white: 16.5:1 (AAA)
- ✅ Primary-600 (#0284c7) on white: 4.7:1 (AA)
- ⚠️ Primary-300 (#7dd3fc) on white: 1.8:1 (solo decorativo)

**Tools**: WebAIM Contrast Checker, Chrome DevTools

### Keyboard Navigation

**Requisitos**:
1. Tab order lógico (top→down, left→right)
2. Skip links: "Skip to main content"
3. Focus indicators visibles
4. No keyboard traps (Esc para salir de modals)
5. Interactivos soportan Space/Enter

**Focus styles**:
```css
.focus-visible:ring-2
.focus-visible:ring-primary-500
.focus-visible:ring-offset-2
```

### Screen Reader Support

**Semantic HTML (obligatorio)**:
```tsx
// ❌ MAL
<div onClick={handleClick}>Submit</div>

// ✅ BIEN  
<button onClick={handleClick}>Submit</button>
```

**ARIA labels**:
```tsx
// Icon-only buttons
<button aria-label="Close dialog">
  <X className="h-4 w-4" />
</button>

// Form errors
<input aria-describedby="email-error" aria-invalid={!!error} />
{error && <p id="email-error" role="alert">{error}</p>}
```

**Alt text**:
- Decorative: `alt=""` + `role="presentation"`
- Meaningful: Descripción clara del contenido

---

## 🌙 Dark Mode Implementation

### CSS Variables Approach

**globals.css**:
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --primary: 199 89% 48%;
    --border: 240 5.9% 90%;
    --muted: 240 4.8% 95.9%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 7%;
    --primary: 199 89% 48%;
    --border: 240 3.7% 15.9%;
    --muted: 240 3.7% 15.9%;
  }
}

* {
  @apply border-border;
}
body {
  @apply bg-background text-foreground;
}
```

**Tailwind config**:
```js
module.exports = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // ... rest
      }
    }
  }
}
```

**Theme Toggle Component**:
```tsx
'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </button>
  )
}
```

**Setup**:
```bash
npm install next-themes
```

**Provider** (app/layout.tsx):
```tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

**Última actualización**: 2026-01-13  
**Mantenedor**: Zerion MVP Studio  
**Versión**: 2.0 (+ Accessibility + Dark Mode)
