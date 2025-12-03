/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.njk", "src/**/*.md"],
    theme: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '6rem',
          '2xl': '6rem',
        },
      },
      extend: {}
    },
    plugins: [],
    purge: false,
  };
  