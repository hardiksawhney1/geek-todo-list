/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors:{
          'rgba-blue': 'rgba(132, 155, 218, 0.3)',
          'rgba-purple': 'rgba(77, 98, 179, 0.3)',
        },
        backgroundImage: theme => ({
          'gradient': 'linear-gradient(180deg, ' + theme('colors.rgba-blue') + ' 0%, ' + theme('colors.rgba-purple') + ' 100%)',
        }),
  
      },

    },
    plugins: [],
  }