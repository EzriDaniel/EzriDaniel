/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hack: ['IBM Plex Mono', 'JetBrains Mono', 'Space Mono', 'monospace'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
