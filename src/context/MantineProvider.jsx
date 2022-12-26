import {
  MantineProvider as BaseMantineProvider,
  Global,
  DEFAULT_THEME as mantineDefaultTheme,
} from '@mantine/core';
import React from 'react';
import windiColors from 'windicss/colors';
import windiDefaultTheme from 'windicss/defaultTheme';

const convertBreakpoint = (breakpoint) => {
  const convertedBreakpoint = {};
  Object.keys(breakpoint).forEach((size) => {
    // NOTE: Have to remove 'px' from breakpoint and convert to number
    convertedBreakpoint[size] = breakpoint[size].replace('px', '') * 1;
  });
  return convertedBreakpoint;
};

const convertColor = (colors) => {
  const convertedColor = {};
  Object.keys(colors).forEach((color) => {
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

    if (colors[color] instanceof Object) {
      convertedColor[color] = Object.values(colors[color]);
    }
  });
  return convertedColor;
};

const convertFontSize = (fontSize) => {
  const convertedFontSize = {};
  Object.keys(fontSize).forEach((size) => {
    // NOTE: Don't have to convert 'rem' to 'px'
    convertedFontSize[size] = fontSize[size][0];
  });
  return convertedFontSize;
};

const theme = {
  breakpoints: {
    ...mantineDefaultTheme.breakpoints,
    ...convertBreakpoint(windiDefaultTheme.screens), // WindiCSS
  },
  colors: convertColor(windiColors),
  defaultRadius: 'md',
  black: windiColors.black,
  white: windiColors.white,
  primaryColor: 'blue',
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

const MantineProvider = ({ children, theme: themeProps, ...props }) => {
  return (
    <BaseMantineProvider theme={{ ...theme, ...themeProps }} {...props}>
      <MyGlobalStyles />
      {children}
    </BaseMantineProvider>
  );
};

export { MantineProvider };
