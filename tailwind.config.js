/** @type {import('tailwindcss').Config} */
// Design tokens sourced from docs/02-sistema-diseno.md — the real MH brand
// palette extracted from the logo, flyer and business card. No invented colors.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark mode — base of the site (the flyer uses this background).
        void: '#070B16',
        'void-2': '#0B1120',
        panel: '#0E1830',
        electric: {
          900: '#0A1F55',
          600: '#1E5BFF',
          400: '#5B8CFF',
        },
        'chrome-highlight': '#BFD6FF',
        'black-ink': '#0A0A0C',
        white: '#F4F6FA',
        'silver-dim': '#8B93A7',
        'silver-faint': '#586178',
        // Light mode — used only in the digital contact card.
        'card-bg': '#F4F6FA',
        'card-text': '#0A0A0C',
        'card-accent': '#1E5BFF',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        signature: ['"Dancing Script"', 'cursive'],
      },
      fontSize: {
        hero: ['clamp(2.6rem, 1rem + 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'hero-accent': ['clamp(3rem, 1rem + 6.4vw, 6rem)', { lineHeight: '0.94', letterSpacing: '-0.035em' }],
        'section-title': ['clamp(1.9rem, 1rem + 3.2vw, 3.4rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 3rem + 6vw, 9rem)',
      },
      borderRadius: {
        card: '1.5rem',
        pill: '999px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-brand': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(30,91,255,0.25), 0 18px 60px -20px rgba(30,91,255,0.45)',
        'glow-soft': '0 0 40px -12px rgba(30,91,255,0.5)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(30,91,255,0.55)' },
          '50%': { opacity: '0.55', boxShadow: '0 0 0 6px rgba(30,91,255,0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-120%)' },
          '100%': { transform: 'translateY(320%)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'glow-breathe': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
        scanline: 'scanline 2.6s ease-in-out',
        'float-slow': 'float-slow 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
        'spin-slower': 'spin-slow 40s linear infinite reverse',
        'glow-breathe': 'glow-breathe 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
