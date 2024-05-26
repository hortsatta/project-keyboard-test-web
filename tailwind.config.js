import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssThemer from 'tailwindcss-themer';

const COLOR_DEFAULT_PRIMARY = '55, 177, 59';
const COLOR_DEFAULT_TEXT = '226, 237, 226';
const COLOR_DEFAULT_BACKDROP = '8, 25, 8';
const COLOR_DEFAULT_SURFACE = '13, 40, 13';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '430px',
        '2xs': '470px',
      },
      maxWidth: {
        main: '876px',
      },
      fontFamily: {
        body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
      },
      listStyleType: {
        square: 'square',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'shaking-x': {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(3px)' },
          '50%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' },
          '100%': { transform: 'translateX(0)' },
        },
        shaking: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(0eg)' },
          '75%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        rainbow: {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(359deg)' },
        },
        shiny: {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
          '100%': { filter: 'brightness(1)' },
        },
        'shiny-2': {
          '0%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(3)' },
          '100%': { filter: 'brightness(1)' },
        },
        'slide-in-back': {
          '0%': {
            transform: 'scale(4)',
            opacity: 0,
          },
          '50%': {
            opacity: 1,
          },
          '70%': {
            transform: 'scale(0.7)',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 1,
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s linear forwards',
        blink: 'pulse 1s step-start 0s infinite',
        'pulse-fast': 'pulse 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-faster': 'pulse 0.3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        error: 'shaking-x 0.3s forwards',
        'add-combo': 'ping 0.4s 1',
        'max-combo': 'rainbow 0.8s linear infinite',
        rating: 'shiny 4s linear infinite',
        'rating-fast': 'shiny 1s ease infinite',
        'rating-sss': 'rainbow 2s linear infinite',
        'rating-sss-fast': 'rainbow 1s linear infinite',
        'rating-reveal':
          'slide-in-back 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both',
        'rating-bg-reveal': 'shiny-2 2s ease 0.55s forwards',
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
            surface: `rgba(${COLOR_DEFAULT_SURFACE}, 1)`,
            border: `rgba(${COLOR_DEFAULT_PRIMARY}, 0.3)`,
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
