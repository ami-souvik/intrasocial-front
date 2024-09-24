/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {},
      keyframes: {
        'dots#21-sm': {
          '0%': {
            boxShadow: '19px 0 0 3px, 28px 0 0 1px, 37px 0 0 0'
          },
          '50%': {
            boxShadow: '19px 0 0 1px, 28px 0 0 3px, 37px 0 0 1px'
          },
          '100%': {
            boxShadow: '19px 0 0 0  , 28px 0 0 1px, 37px 0 0 3px'
          }
        },
        'dots#21': {
          '0%': {
            boxShadow: '19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0'
          },
          '50%': {
            boxShadow: '19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px'
          },
          '100%': {
            boxShadow: '19px 0 0 0  , 38px 0 0 3px, 57px 0 0 7px'
          }
        }
      },
      animation: {
        l21sm: 'dots#21-sm .5s infinite alternate linear',
        l21: 'dots#21 .5s infinite alternate linear'
      }
    },
  },
  plugins: [],
}
