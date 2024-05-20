/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'fg': '#e95535',
      'light': '#f6f4e0',
      'dark': '#161513',
      'green': '#698F3F',
    },
    extend: {
      fontFamily: {
        cabin: ['var(--font-cabin)']
      },
    },
  },
  plugins: [],
}

