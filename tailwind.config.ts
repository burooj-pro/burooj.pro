import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005B52',
          dark: '#00443D',
          light: '#E0F2F0',
        },
        accent: '#005B52',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        ink: '#000000',
        slate: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          200: '#CBD5F5',
          400: '#94A3B8',
          600: '#475569',
          800: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['RedHatDisplay', ...defaultTheme.fontFamily.sans],
        serif: ['RedHatDisplay', ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.7' }],
        'xl': ['1.25rem', { lineHeight: '1.6' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['1.875rem', { lineHeight: '1.4' }],
        '4xl': ['2.25rem', { lineHeight: '1.3' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '9rem',
          xl: '10rem',
          '2xl': '11rem',
        },
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '100%',
        },
      },
      boxShadow: {
        card: '0 25px 60px rgba(15, 23, 42, 0.08)',
        soft: '0 10px 30px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  safelist: ['bg-primary', 'text-primary', 'border-primary'],
}

