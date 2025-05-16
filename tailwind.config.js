/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans all JS, TS, JSX, and TSX files in the src folder.
  ],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        secondary: '#535bf2',
        background: '#242424',
        lightBackground: '#ffffff',
        darkBackground: '#1a1a1a',
        hoverBackground: '#2a2a2a',
        textColorLight: 'rgba(255, 255, 255, 0.87)',
        textColorDark: '#213547',
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      lineHeight: {
        default: '1.5',
      },
    },
  },
  plugins: [],
};
