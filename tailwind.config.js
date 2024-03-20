import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssThemer from 'tailwindcss-themer';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssThemer({
      defaultTheme: {
        extend: {
          colors: {
            text: 'rgba(var(--color-dark-text), 1)',
            backdrop: 'rgba(var(--color-dark-backdrop), 1)',
          },
          fontFamily: {
            body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
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
