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
        // Sage green primary accent
        sage: {
          50: '#f5f7f4',
          100: '#e8ebe5',
          200: '#d1d7cb',
          300: '#b2bbaa',
          400: '#939f87',
          500: '#7B896F', // Main sage green
          600: '#656f5d',
          700: '#4f574b',
          800: '#3f443b',
          900: '#2f332c',
        },
        // Warm neutrals (replacing cold grays)
        warmth: {
          50: '#fbf9f6',
          100: '#f5f1ec',
          200: '#e9e3d9',
          300: '#d4ccbf',
          400: '#b4a998',
          500: '#948773',
          600: '#746654',
          700: '#5b4f40',
          800: '#42382c',
          900: '#29221a',
        },
        // Soft accents
        terracotta: {
          DEFAULT: '#d1866b',
          light: '#e5a890',
          dark: '#b86d54',
        },
        cream: '#fffaf0',
        'soft-blue': '#a3bbcb',

        // Design tokens
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--primary-foreground) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--secondary-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--accent-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        input: 'rgb(var(--input) / <alpha-value>)',
        ring: 'rgb(var(--ring) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },
      spacing: {
        // Generous touch-friendly spacing
        'touch': '44px',
        'card': '1.5rem',
        'section': '3rem',
      },
      boxShadow: {
        'warm': '0 2px 8px rgba(123, 137, 111, 0.08)',
        'warm-lg': '0 8px 24px rgba(123, 137, 111, 0.12)',
        'warm-xl': '0 12px 40px rgba(123, 137, 111, 0.16)',
      },
      animation: {
        'fade-in': 'gentle-fade-in 0.4s ease-out',
        'scale-in': 'gentle-scale 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'gentle-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gentle-scale': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
