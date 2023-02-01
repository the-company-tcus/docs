import {
  MantineProvider as BaseMantineProvider,
  Global,
  MantineTheme,
  DEFAULT_THEME as mantineDefaultTheme,
} from '@mantine/core';
import type { MantineSizes } from '@mantine/core';
import React from 'react';
import windiDefaultColors from 'windicss/colors';
import windiDefaultTheme from 'windicss/defaultTheme';
import type { DefaultColors } from 'windicss/types/config/colors';
import type { DefaultFontSize, ThemeType } from 'windicss/types/interfaces';
import type { MantineThemeColors } from '@site/src/types/MantineThemeColors';

const convertBreakpoint = (breakpoint: ThemeType): MantineSizes => {
  const convertedBreakpoint = {} as MantineSizes;
  Object.keys(breakpoint).forEach((size) => {
    // NOTE: Have to remove 'px' from breakpoint and convert to number
    convertedBreakpoint[size] = +breakpoint[size].replace('px', '');
  });
  return convertedBreakpoint;
};

// Override Mantine colors
const convertColor = (windiColors: DefaultColors) => {
  const convertedColor = {} as MantineThemeColors;
  Object.keys(windiColors).forEach((color) => {
    if (color === 'lightBlue') {
      color = 'sky';
    } else if (color === 'warmGray') {
      color = 'stone';
    } else if (color === 'trueGray') {
      color = 'neutral';
    } else if (color === 'coolGray') {
      color = 'gray';
    } else if (color === 'blueGray') {
      color = 'slate';
    } else if (color === 'zink') {
      color = 'zinc';
    }

    if (windiColors[color] instanceof Object) {
      convertedColor[color] = Object.values(windiColors[color]);
    }
  });
  // NOTE: WindiCSS dark color is too dark
  convertedColor.dark = mantineDefaultTheme.colors.dark;

  return convertedColor;
};

const convertFontSize = (fontSize: {
  [key: string]: DefaultFontSize;
}): MantineSizes => {
  const convertedFontSize = {} as MantineSizes;
  Object.keys(fontSize).forEach((size) => {
    // NOTE: Don't have to convert 'rem' to 'px'
    convertedFontSize[size] = fontSize[size][0];
  });
  return convertedFontSize;
};

const theme: MantineTheme = {
  ...mantineDefaultTheme,
  breakpoints: {
    ...mantineDefaultTheme.breakpoints,
    ...convertBreakpoint(windiDefaultTheme.screens), // WindiCSS
  },
  colors: {
    ...mantineDefaultTheme.colors,
    ...convertColor(windiDefaultColors),
  },
  defaultRadius: 'md',
  black: windiDefaultColors.black as string,
  white: windiDefaultColors.white as string,
  primaryColor: 'blue',
  primaryShade: 7,
  fontSizes: {
    ...mantineDefaultTheme.fontSizes,
    ...convertFontSize(windiDefaultTheme.fontSize),
  },
  radius: {
    ...mantineDefaultTheme.radius,
    // NOTE: WindiCSS border radius messed up with Mantine
    // ...windiDefaultTheme.borderRadius,
  },
  fontFamily:
    'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  fontFamilyMonospace:
    'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
  headings: {
    ...mantineDefaultTheme.headings,
    fontFamily:
      'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  },
  lineHeight: mantineDefaultTheme.lineHeight,
  loader: 'oval',
  shadows: {
    ...mantineDefaultTheme.shadows,
    ...windiDefaultTheme.boxShadow,
  },
};

const MyGlobalStyles = () => {
  return (
    <Global
      styles={{
        'html.dark': {
          img: {
            filter: 'brightness(.8) contrast(1.2)',
          },
        },
      }}
    />
  );
};

type MantineProps = {
  children: React.ReactNode;
  theme?: Partial<MantineTheme>;
};

const MantineProvider = ({
  children,
  theme: themeProps,
  ...props
}: MantineProps) => {
  return (
    <BaseMantineProvider theme={{ ...theme, ...themeProps }} {...props}>
      <MyGlobalStyles />
      {children}
    </BaseMantineProvider>
  );
};

export { MantineProvider };
