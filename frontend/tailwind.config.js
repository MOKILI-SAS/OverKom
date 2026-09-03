import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        over: {
          yellow: '#FFCC00',
          'yellow-hover': '#E6B800',
          white: '#FFFFFF',
          ink: '#0B0B0B',
          night: '#111111',
          charcoal: '#1A1A1A',
          muted: '#A3A3A3',
          cream: '#FFF8E7',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '1.25rem',
      },
      maxWidth: {
        site: '72rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        overkom: {
          primary: '#FFCC00',
          'primary-content': '#111111',
          secondary: '#1A1A1A',
          'secondary-content': '#FFFFFF',
          accent: '#FFCC00',
          'accent-content': '#111111',
          neutral: '#1A1A1A',
          'neutral-content': '#FFFFFF',
          'base-100': '#111111',
          'base-200': '#1A1A1A',
          'base-300': '#262626',
          'base-content': '#FFFFFF',
          info: '#38BDF8',
          success: '#22C55E',
          warning: '#FFCC00',
          error: '#EF4444',
        },
      },
    ],
    darkTheme: 'overkom',
    logs: false,
  },
}
