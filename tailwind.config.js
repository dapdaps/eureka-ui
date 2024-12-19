/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    fontFamily: {
      Montserrat: ['Montserrat'],
      Pixel: ['"5squared pixel"'],
      Jersey: ['"Jersey"']
    },
    extend: {},
    screens: {
      md: { max: '750px' },
      lg: { min: '1920px' }
    }
  },
  plugins: []
};
