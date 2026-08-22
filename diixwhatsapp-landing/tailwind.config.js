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
        surface: '#08090D',
        surfaceAlt: '#0B0F14',
        primary: '#25D366',
        primaryGlow: 'rgba(37, 211, 102, 0.5)',
        accent: '#00FFFF',
        accentAlt: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(37, 211, 102, 0.5), 0 0 20px rgba(37, 211, 102, 0.3)',
        'neon-cyan': '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-purple': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(37, 211, 102, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(37, 211, 102, 0.8), 0 0 30px rgba(37, 211, 102, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}

