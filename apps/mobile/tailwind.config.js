const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      borderWidth: { hairline: hairlineWidth() },
      fontFamily: {
        'pt-100': ['Pretendard-Thin'],
        'pt-200': ['Pretendard-ExtraLight'],
        'pt-300': ['Pretendard-Light'],
        'pt-400': ['Pretendard-Regular'],
        'pt-500': ['Pretendard-Medium'],
        'pt-600': ['Pretendard-SemiBold'],
        'pt-700': ['Pretendard-Bold'],
        'pt-800': ['Pretendard-ExtraBold'],
        'pt-900': ['Pretendard-Black'],
      },
      colors: {
        'dinos-green': '#50db42',
        'dinos-sub': '#496545',
        'dinos-border': '#061e36',
        'dinos-filter-bg': '#f3f4f8',
        'dinos-card-bg': '#f9f9f9',
        'dinos-section-bg': '#ecefee',
        'dinos-avatar-border': '#eeeaec',
        'dinos-badge-text': '#123c0b',
      },
    },
  },
  plugins: [],
};
