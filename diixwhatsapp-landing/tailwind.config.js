/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#080B14',
        surfaceAlt: '#12161B',
        panel: '#1E232E',
        primary: '#00FF88',
        primaryGlow: 'rgba(0, 255, 136, 0.5)',
        cyan: '#00E5FF',
        purple: '#7B61FF',
        magenta: '#FF2ED1',
        text: '#FFFFFF',
        muted: '#A0A0A0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Orbitron', 'system-ui', 'sans-serif'],
        subtitle: ['Exo 2', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(0, 255, 136, 0.5), 0 0 20px rgba(0, 255, 136, 0.3)',
        'neon-cyan': '0 0 10px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(123, 97, 255, 0.5), 0 0 20px rgba(123, 97, 255, 0.3)',
        'neon-magenta': '0 0 10px rgba(255, 46, 209, 0.5), 0 0 20px rgba(255, 46, 209, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 255, 136, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.8), 0 0 30px rgba(0, 255, 136, 0.4)' },
        },
        particle: {
          '0%': { opacity: '0', transform: 'translateY(0) scale(0)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

