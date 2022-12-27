---
slug: integrate-docusaurus-with-windicss-and-mantine
title: Integrate Docusaurus with WindiCSS and Mantine
authors:
  - duckymomo20012
tags:
  - setup
  - windicss
  - mantine
  - guide
---

# Integrate Docusaurus with WindiCSS and Mantine

[Docusaurus](https://docusaurus.io/) is an excellent tool for building
documentation websites. However, it does not support
[WindiCSS](https://windicss.org/) out of the box.
[Mantine](https://mantine.dev/) is a React UI library that provides a lot of UI
components and hooks, so you can use it to build your own components.

This guide will show you how to integrate WindiCSS and Mantine with Docusaurus.

## Getting Started

We will go through setting up these features:

- ✅ WindiCSS
  - ✅ Dark mode
  - ✅ Typography
  - ✅ Animations (from
    [@windicss/plugin-animations](https://github.com/windicss/plugins/tree/main/packages/animations))
  - ✅ Attributify mode
  - ✅ Colors
  - ❌ Design in DevTools mode
- ✅ Mantine
  - ✅ Dark mode
  - ✅ Typography
  - ✅ Colors

Currently, there are some bugs with WindiCSS Devtool in [windicss-webpack-plugin
](https://github.com/windicss/windicss-webpack-plugin) package, which are
reported in
[#118](https://github.com/windicss/windicss-webpack-plugin/issues/118#issue-1360067669)
and
[#115](https://github.com/windicss/windicss-webpack-plugin/issues/115#issue-1328556055).

## Setup Docusaurus

First, we need to set up a Docusaurus project. You can follow the official guide
from [Docusaurus website](https://docusaurus.io/docs/installation):

```bash
pnpm create docusaurus demo-docs classic
```

Then, we have this project structure:

```
.
├── babel.config.js
├── blog
├── docs
├── docusaurus.config.js
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── README.md
├── sidebars.js
├── src
│   ├── components
│   ├── css
│   └── pages
└── static
    └── img
```

## Setup WindiCSS

### Install dependencies

We will have to install [windicss](https://github.com/windicss/windicss) and
[windicss-webpack-plugin](https://github.com/windicss/windicss-webpack-plugin)
package:

```bash
pnpm add -D windicss windicss-webpack-plugin
```

### Configure Webpack

Following the [official guide](https://windicss.org/integrations/webpack.html)
from WindiCSS, we have to configure Webpack to use the windicss-webpack-plugin.

Because the file `webpack.config.js` somehow is not loaded by Docusaurus, we
have to configure Webpack manually in the file `docusaurus.config.js` by
[creating a custom Docusaurus
plugin](https://docusaurus.io/docs/advanced/plugins#creating-plugins):

```js title="docusaurus.config.js"
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

/** @type {import('@docusaurus/types').Config} */
const config = {
  plugins: [
    function windicssPlugin() {
      return {
        name: 'windicss-plugin',
        configureWebpack() {
          return {
            plugins: [new WindiCSSWebpackPlugin()],
          };
        },
      };
    },
  ],
};

module.exports = config;
```

### Include the virtual module

It's recommended to include the WindiCSS virtual module within an entry point
file or something only loaded once.

However, Docusaurus does not have an entry file like `index.js`, so we have to
["swizzle"](https://docusaurus.io/docs/swizzling) the `Root` component by
creating a **wrapper** around it to import the module.

> The `<Root>` component is rendered at the very top of the React tree, above
> the theme `<Layout>`, and never unmounts. It is the perfect place to add
> stateful logic that should not be re-initialized across navigations (user
> authentication status, shopping card state...).

:::caution

You should aware that `Root` component is not mentioned whether it is **Safe**
or **Unsafe** by running the command `pnpm swizzle`.

:::

Import all three layers:

```jsx title="src/theme/Root.jsx"
import React from 'react';
import 'windi.css';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <Root>{children}</Root>;
}
```

Because the file `windi-base.css` **overrides the default styles of
Docusaurus**, so I recommend not importing it:

```diff title="src/theme/Root.jsx"
import React from 'react';
-import 'windi.css';
+import 'windi-components.css';
+import 'windi-utilities.css';

// Default implementation, that you can customize
export default function Root({ children }) {
  return <>{children}</>;
}
```

### Test Locally

Now, we can test the result by writing some classes in `HomepageHeader`
the component in the file `src/pages/index.js`:

```jsx title="src/pages/index.jsx"
// ...
function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className="bg-blue-500">
      <div className="container mx-auto text-center py-24">
        <h1 className="text-4xl font-bold text-white">{siteConfig.title}</h1>
        <p className="text-xl py-6 text-white">{siteConfig.tagline}</p>

        <div className="py-10">
          <Link
            className="bg-white rounded-md text-gray-500 px-4 py-2"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}
// ...
```

And we can see the result:

![demo](https://i.imgur.com/CLedB9M.png)

## Configure WindiCSS

You can configure WindiCSS by creating a file `windi.config.js` in the root
directory.

### Dark Mode

> Windi CSS has out-of-box Dark Mode support.
>
> By prefixing the `dark:` variant to utilities, they will only apply when dark
> mode is enabled.
>
> We have two modes for enabling dark mode, [class
> mode](https://windicss.org/features/dark-mode.html#class-mode) and [media query
> mode](https://windicss.org/features/dark-mode.html#media-query-mode). By
> default, class mode is enabled.

Enable dark mode using class mode:

```js title="windi.config.js"
export default {
  darkMode: 'class',
};
```

To manually add class `dark` to the `<html>` element, we can add some logics in
the `Layout/Provider` wrapper:

- Add or remove the class `dark` based on the color scheme.

```jsx title="src/theme/Layout/Provider/index.jsx"
import { useColorMode } from '@docusaurus/theme-common';
import Provider from '@theme-original/Layout/Provider';
import React, { useEffect } from 'react';

const CustomProvider = ({ children }) => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  return <>{children}</>;
};

export default function ProviderWrapper({ children, ...props }) {
  return (
    <Provider {...props}>
      <CustomProvider>{children}</CustomProvider>
    </Provider>
  );
}
```

:::caution

`useColorMode` hook MUST be called inside the `ProviderWrapper` component.
That's why I have to create a separate component `CustomProvider` to wrap the
`useColorMode` hook.

:::

<details>
  <summary>Another approach by swizzling the <code>ColorModeToggle</code> component</summary>

This approach is considered simpler than the previous one because the color mode
is already passed to the `ColorModeToggle` component.

The `ColorModeToggle` component is **Safe** to swizzle:

```jsx title="src/theme/ColorModeToggle.jsx"
import ColorModeToggle from '@theme-original/ColorModeToggle';
import React, { useEffect } from 'react';

export default function ColorModeToggleWrapper(props) {
  const { value: colorMode } = props;

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
```

:::caution

This approach only works when the color mode switch is enabled. If you disable
the button by setting `themeConfig.colorMode.disableSwitch` to `true` in the
file `docusaurus.config.js`, the `ColorModeToggle` component will not be
rendered.

:::

> Why don't we use hook `useColorMode`?
>
> Yes, you can, but the color mode is already passed to the component as a prop,
> we can use it directly.

</details>

:::note

Error: "Hook useColorMode is called outside the `<ColorModeProvider>`"

If you have this error and you are using `pnpm`, then you may having hoisting
issue([#7880](https://github.com/facebook/docusaurus/issues/7880#issuecomment-1201994009)
and
[#6724](https://github.com/facebook/docusaurus/issues/6724#issuecomment-1280912963)).
You can fix it by adding the following code to the file `.npmrc`:

```text title=.npmrc
public-hoist-pattern[]=@docusaurus/theme-common*
```

:::

### Typography

WindiCSS font family utilities (`font-sans`, `font-serif`, `font-mono`)
configured fonts is quite different from the ones configured in Docusaurus. So
we can configure the fonts in `windi.config.js` to match with Docusaurus
configurations:

- Font family base from variable `--ifm-font-family-base`.
- Font family mono from variable `--ifm-font-family-monospace`.
- Font family serif is not present in Docusaurus, so we can use the default
  value.

```js title="windi.config.js"
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
        mono: 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      },
    },
  },
};
```

### Animations

:::info

This section is optional. WindiCSS has [built-in animations
support](https://windicss.org/posts/v31.html#animations) since `v3.1`.

:::

To add quick animations to your site, you can use WindiCSS's animation default
utilities, but it's quite limited. So we can install the plugin
`@windicss/plugin-animations` to add more animations utilities from [Animate
CSS](https://github.com/animate-css/animate.css)

Install the plugin:

```bash
pnpm add -D @windicss/plugin-animations
```

Add the plugin to `windi.config.js`:

```js title="windi.config.js"
import pluginAnimations from '@windicss/plugin-animations';

export default {
  plugins: [
    // Other plugins
    pluginAnimations({
      settings: {
        // animatedSpeed: 1000,
      },
    }),
  ],
};
```

Then you can use the animation utilities:

```jsx title="src/pages/index.jsx"
// ...
function HomepageHeader() {
  return (
    <p className="animate-animated animate-infinite animate-rubberBand">
      Hello World
    </p>
  );
}
// ...
```

### Attributify Mode

To configure the attributify mode, we can configure it in `windi.config.js`:

```js title="windi.config.js"
export default {
  attributify: true,
};
```

Then you can use the WindiCSS utilities as HTML attributes:

```jsx title="src/pages/index.jsx"
// ...
function HomepageHeader() {
  return (
    <button
      bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
      text="sm white"
      font="mono light"
      p="y-2 x-4"
      border="2 rounded blue-200"
    >
      Button
    </button>
  );
}
// ...
```

### Colors

Docusaurus configured primary colors from `src/css/custom.css`:

```css title="src/css/custom.css"
:root {
  --ifm-color-primary: #2e8555;
  --ifm-color-primary-dark: #29784c;
  --ifm-color-primary-darker: #277148;
  --ifm-color-primary-darkest: #205d3b;
  --ifm-color-primary-light: #33925d;
  --ifm-color-primary-lighter: #359962;
  --ifm-color-primary-lightest: #3cad6e;
  --ifm-code-font-size: 95%;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.1);
}

/* For readability concerns, you should choose a lighter palette in dark mode. */
[data-theme='dark'] {
  --ifm-color-primary: #25c2a0;
  --ifm-color-primary-dark: #21af90;
  --ifm-color-primary-darker: #1fa588;
  --ifm-color-primary-darkest: #1a8870;
  --ifm-color-primary-light: #29d5b0;
  --ifm-color-primary-lighter: #32d8b4;
  --ifm-color-primary-lightest: #4fddbf;
  --docusaurus-highlighted-code-line-bg: rgba(0, 0, 0, 0.3);
}
```

We can configure WindiCSS to use these in class as well:

```js title="windi.config.js"
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e8555',
          dark: '#29784c',
          darker: '#277148',
          darkest: '#205d3b',
          light: '#33925d',
          lighter: '#359962',
          lightest: '#3cad6e',
        },
        'dark-primary': {
          DEFAULT: '#25c2a0',
          dark: '#21af90',
          darker: '#1fa588',
          darkest: '#1a8870',
          light: '#29d5b0',
          lighter: '#32d8b4',
          lightest: '#4fddbf',
        },
      },
    },
  },
};
```

Then you can use Docusaurus primary colors in class:

```jsx title="src/pages/index.jsx"
// ...
function HomepageHeader() {
  return (
    <p className="bg-primary hover:bg-primary-dark dark:bg-dark-primary dark:hover:bg-dark-primary-dark">
      Hello World
    </p>
  );
}
// ...
```

## Setup Mantine

### Install dependencies

```bash
pnpm add @mantine/core @mantine/hooks @emotion/react
```

### Configure Mantine Provider

In this step, we will add Mantine Provider to the `<Root>` to
ensure that all Mantine components are using the same theme.

```diff title="src/theme/Root.jsx"
+import { MantineProvider } from '@mantine/core';
import React from 'react';
import { QueryProvider } from '../context/QueryProvider';
// eslint-disable-next-line import/no-unresolved
import 'windi-components.css';
// eslint-disable-next-line import/no-unresolved
import 'windi-utilities.css';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <QueryProvider>
-     <>{children}</>
+     <MantineProvider>{children}</MantineProvider>
    </QueryProvider>
  );
}
```

:::note

This is just a basic setup, we will use our custom `<MantineProvider>` in the
next step.

:::

### Custom Mantine Provider

In this file, we will configure the Mantine Provider to use the WindiCSS theme
(colors, fonts, breakpoints, etc) and Docusaurus theme (colors, fonts, etc), so
we can ensure the consistency between the Docusaurus site, Mantine components,
and WindiCSS utilities.

```jsx title="src/context/MantineProvider.jsx"
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
```

Use our custom `<MantineProvider>` in `src/theme/Layout/Provider/index.jsx`:

```diff title="src/theme/Layout/Provider/index.jsx"
import { useColorMode } from '@docusaurus/theme-common';
import Provider from '@theme-original/Layout/Provider';
import React, { useEffect } from 'react';
+import { MantineProvider } from '../../../context/MantineProvider';

const CustomProvider = ({ children }) => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

- return <>{children}</>;
+ return (
+   <MantineProvider>
+     {children}
+   </MantineProvider>
+ );
};

export default function ProviderWrapper({ children, ...props }) {
  return (
    <Provider {...props}>
      <CustomProvider>{children}</CustomProvider>
    </Provider>
  );
}
```

## Configure Mantine

### Dark Mode

We will pass the color mode to Mantine using the `ColorSchemeProvider` component
and `theme.colorScheme` props:

```diff title="src/theme/Layout/Provider/index.jsx"
import { useColorMode } from '@docusaurus/theme-common';
+import { ColorSchemeProvider } from '@mantine/core';
import Provider from '@theme-original/Layout/Provider';
import React, { useEffect } from 'react';
+import { MantineProvider } from '../../../context/MantineProvider';

const CustomProvider = ({ children }) => {
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (colorMode === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

+ const toggleColorScheme = (value) =>
+   setColorMode(value || (colorMode === 'dark' ? 'light' : 'dark'));

- return (
-   <MantineProvider>
-     {children}
-   </MantineProvider>
- );
+ return (
+   <ColorSchemeProvider
+     colorScheme={colorMode}
+     toggleColorScheme={toggleColorScheme}
+   >
+     <MantineProvider theme={{ colorScheme: colorMode }}>
+       {children}
+     </MantineProvider>
+   </ColorSchemeProvider>
+ );
};

export default function ProviderWrapper({ children, ...props }) {
  return (
    <Provider {...props}>
      <CustomProvider>{children}</CustomProvider>
    </Provider>
  );
}
```

So now we can use the `useMantineColorScheme` (or `useColorMode` from
Docusaurus) hook to get the color mode:

```jsx title="src/pages/index.jsx"
// ...
import { Button, useMantineColorScheme } from '@mantine/core';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
        <Button
          variant="outline"
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? 'dark' : 'light'}
        </Button>
      </div>
    </header>
  );
}
// ...
```

:::caution

The `useMantineColorScheme` (or `useColorMode`) hook MUST be called inside the
`Layout` component.

:::

### Typography

We will have to convert font sizes from WindiCSS types to Mantine types, apply
font family (from Docusaurus) and line height:

For example:

<table>
<tr>
  <th>WindiCSS sample</th>
  <th>Mantine sample</th>
</tr>
<tr>
  <td>

    {
      "xs": [
        "0.75rem",
        {
          "lineHeight": "1rem"
        }
      ]
    }

  </td>
  <td>

    {
      "xs": "0.75rem"
    }

  </td>
</tr>
</table>

```jsx title="src/context/MantineProvider.jsx"
// ...
import { DEFAULT_THEME as mantineDefaultTheme } from '@mantine/core';
import windiDefaultTheme from 'windicss/defaultTheme';

const convertFontSize = (fontSize) => {
  console.log('fontSize', fontSize);
  const convertedFontSize = {};
  Object.keys(fontSize).forEach((size) => {
    // NOTE: Don't have to convert 'rem' to 'px'
    convertedFontSize[size] = fontSize[size][0];
  });
  console.log('convertedFontSize', convertedFontSize);
  return convertedFontSize;
};

const theme = {
  fontSizes: {
    ...mantineDefaultTheme.fontSizes,
    ...convertFontSize(windiDefaultTheme.fontSize),
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
};
// ...
```

### Colors

At this step we have to convert the WindiCSS color types to Mantine color types
and remove unused colors.

For example:

<table>
<tr>
  <th>WindiCSS sample</th>
  <th>Mantine sample</th>
</tr>
<tr>
  <td>

    {
      "amber": {
        "50": "#fffbeb",
        "100": "#fef3c7",
        "200": "#fde68a",
        "300": "#fcd34d",
        "400": "#fbbf24",
        "500": "#f59e0b",
        "600": "#d97706",
        "700": "#b45309",
        "800": "#92400e",
        "900": "#78350f"
      }
    }

  </td>
  <td>

    {
      "amber": [
        "#fffbeb",
        "#fef3c7",
        "#fde68a",
        "#fcd34d",
        "#fbbf24",
        "#f59e0b",
        "#d97706",
        "#b45309",
        "#92400e",
        "#78350f"
      ]
    }

  </td>
</tr>
</table>

```jsx title="src/context/MantineProvider.jsx"
// ...
import windiColors from 'windicss/colors';

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

const theme = {
  colors: convertColor(windiColors),
  black: windiColors.black,
  white: windiColors.white,
  primaryColor: 'blue',
};
// ...
```

## Related Articles

- [Using TailwindCSS v3 in Docusaurus in 5
  steps](https://dev.to/sajclarke_62/using-tailwindcss-v3-in-docusaurus-in-5-steps-5c26)
