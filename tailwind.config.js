/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    boxShadow: {
      'battle-blue': '0px 0px 10px 0px rgba(18, 170, 255, 0.80)'
    },
    fontFamily: {
      Montserrat: ['Montserrat'],
      Pixel: ['"5squared pixel"'],
      Jersey: ['"Jersey"'],
      Burial: ['"Burial"']
    },
    extend: {},
    screens: {
      md: { max: '750px' },
      lg: { min: '1920px' }
    }
  },
  plugins: []
};
