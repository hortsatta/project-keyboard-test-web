import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssThemer from 'tailwindcss-themer';

const COLOR_DEFAULT_PRIMARY = '55, 177, 59';
const COLOR_DEFAULT_TEXT = '226, 237, 226';
const COLOR_DEFAULT_BACKDROP = '8, 25, 8';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        shaking: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(3px)' },
          '50%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        blink: 'pulse 1s step-start 0s infinite',
        error: 'shaking 0.3s forwards',
      },
    },
  },
  plugins: [
    tailwindcssThemer({
      defaultTheme: {
        extend: {
          colors: {
            primary: `rgba(${COLOR_DEFAULT_PRIMARY}, 1)`,
            text: `rgba(${COLOR_DEFAULT_TEXT}, 1)`,
            backdrop: `rgba(${COLOR_DEFAULT_BACKDROP}, 1)`,
          },
        },
      },
      // themes: [
      //   {
      //     // name your theme anything that could be a valid css class name
      //     // remember what you named your theme because you will use it as a class to enable the theme
      //     name: 'my-theme',
      //     // put any overrides your theme has here
      //     // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
      //     extend: {
      //       colors: {
      //         primary: 'blue',
      //       },
      //     },
      //   },
      // ],
    }),
  ],
};
