import pluginAnimations from '@windicss/plugin-animations';
import colors from 'windicss/colors';

export default {
  alias: {
    // ...
  },
  attributify: true,
  darkMode: 'class',
  extract: {
    exclude: ['node_modules', '.git', '.next/**/*'],
    include: ['**/*.{jsx,css}'],
  },
  plugins: [
    // Other plugins
    pluginAnimations({
      settings: {
        // animatedSpeed: 1000,
      },
    }),
  ],
  shortcuts: {
    // ...
  },
  safelist: [
    // ...
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
      fontFamily: {},
    },
  },
};
