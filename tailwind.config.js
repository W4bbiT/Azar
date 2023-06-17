/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'blackish': '#212121',
        'whiteish': '#FCF6F5FF',
        'reddish':'#990011FF',
      }
    },
  },
  plugins: [{
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  }],
};
