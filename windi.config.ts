import { DEFAULT_THEME as mantineDefaultTheme } from '@mantine/core';
import type { MantineThemeColors } from '@mantine/core';
import windiDefaultColors from 'windicss/colors';
import type { DefaultColors } from 'windicss/types/config/colors';

type ConvertedWindiColors = {
  [k in keyof MantineThemeColors]: DefaultColors[keyof DefaultColors];
};

// Don't override WindiCSS colors
const convertColor = (
  mantineColors: MantineThemeColors,
  windiColors: DefaultColors,
) => {
  const newColorPalette = {} as ConvertedWindiColors;
  Object.keys(mantineColors).forEach((colorName) => {
    if (windiColors[colorName] instanceof Object === false) {
      const newColor = {};
      mantineColors[colorName].forEach((_colorHex, index) => {
        newColor[`${index * 100}`] = mantineColors[colorName][index];
      });
      newColor['50'] = newColor['0'];
      delete newColor['0'];
    }
  });

  return newColorPalette;
};

export default {
  alias: {
    // ...
  },
  attributify: {
    prefix: 'w:',
  },
  darkMode: 'class',
  extract: {
    exclude: ['node_modules', '.git', '.next/**/*'],
    include: ['**/*.{html,mdx,js,jsx,ts,tsx,css}'],
  },
  plugins: [],
  shortcuts: {
    // ...
  },
  safelist: [
    // ...
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          dark: '#1b3a9d',
          darker: '#193695',
          darkest: '#152d7b',
          light: '#2146c1',
          lighter: '#224ac9',
          lightest: '#2f58db',
        },
        'dark-primary': {
          DEFAULT: '#bfdbfe',
          dark: '#93c2fd',
          darker: '#7db6fd',
          darkest: '#3c91fc',
          light: '#ebf4ff',
          lighter: '#ffffff',
          lightest: '#ffffff',
        },
        ...convertColor(mantineDefaultTheme.colors, windiDefaultColors),
      },
      fontFamily: {
        sans: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      },
    },
  },
};
