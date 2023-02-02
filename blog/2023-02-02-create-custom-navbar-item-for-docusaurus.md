---
slug: create-custom-navbar-item-for-docusaurus
title: Create custom navbar item for Docusaurus
authors:
  - duckymomo20012
tags:
  - guide
---

# Create custom navbar item for Docusaurus

[Docusaurus](https://docusaurus.io/) allows you to add many types of [navbar
items](https://docusaurus.io/docs/api/themes/configuration#navbar-items) to the
navbar. But if you want to add a custom navbar item, you have to register new
type for your component. This guide will show you how to create a custom navbar
item for Docusaurus.

## Getting Started

:::info

This is a implementation of a temporary workaround to support custom navbar item
types, from [#7231](https://github.com/facebook/docusaurus/pull/7231) and
[#7227](https://github.com/facebook/docusaurus/issues/7227) issues.

:::

We will create a dropdown navbar item that contains a list of colors. When we
select a color, the background color of the website will change to the selected
one.

There are two type of navbar items we have to register:

- `custom-colorPickerDropdown`: This is the dropdown navbar item that contains a list
  of colors.
- `custom-colorPicker`: This is the navbar item that contains the color that we
  selected.

:::note

The `custom-` prefix is required for custom navbar item types.

:::

These types will be register by extending the Docusaurus default
`NavbarItem/ComponentTypes` exported object.

Our final result will look like this:

![demo](https://user-images.githubusercontent.com/64480713/216606217-a2ac9931-fe66-436a-ad1a-c9fd2700b4fb.gif)

## Types

Create a `types.ts` file to store the types of our custom navbar items:

- `type` and `label` are the required properties of a navbar item.
- `color` is the color that we selected.

```tsx title="src/components/elements/BgColorPicker/types.ts"
export type ColorConfig = {
  type?: string;
  label?: string;
  color?: 'red' | 'blue' | 'green' | 'default';
};
```

If item is not provided with a `label` property, it will render an empty
`<div>` element, which kind of looks weird.

## Create a provider to share the color state

:::tip

You can use your own state management library (e.g. [Redux
Toolkit](https://redux-toolkit.js.org/),
[Zustand](https://github.com/pmndrs/zustand), etc.) to manage the color state.
But in this example, we will use React Context to manage the color state for simplicity.

:::

When we shrink down the screen size to mobile size, the navbar will only hided
with `display: none`. So **the dropdown navbar item still exists** and a new
navbar is created as a sidebar. This means that **the color state won't be
synced between the two navbar items**. To solve this problem, we have to create
a provider to share the color state between the navbar and the sidebar (mobile).

- Create a context:

  ```tsx title="src/components/elements/BgColorPicker/colorContext.tsx"
  import { createContext } from 'react';
  import { ColorConfig } from './types';

  type ColorContextType = {
    color: Omit<ColorConfig, 'type'>;
    setColor: React.Dispatch<React.SetStateAction<Omit<ColorConfig, 'type'>>>;
  };

  export const ColorContext = createContext<ColorContextType>(null);
  ```

  > Hm, why do we use `Omit<ColorConfig, 'type'>` instead of `ColorConfig`? Because
  > the `ColorPickerNavbarItem` component wasn't provided with a `type` property,
  > only `label` and `color` are provided. So we have to omit the `type` property to
  > keep the type consistent.

- Then create a provider:

  ```tsx title="src/components/elements/BgColorPicker/ColorPickerProvider.tsx"
  import type { ThemeConfig } from '@docusaurus/preset-classic';
  import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
  import React, { useEffect, useState } from 'react';
  import { ColorContext } from '@site/src/components/elements/BgColorPicker/colorContext';
  import type { ColorConfig } from '@site/src/components/elements/BgColorPicker/types';

  const ColorPickerProvider = ({
    children,
  }: {
    children?: React.ReactNode;
  }) => {
    const { siteConfig } = useDocusaurusContext();

    const navbarItems = (siteConfig.themeConfig as ThemeConfig).navbar.items;

    const defaultColor: ColorConfig = navbarItems.find((item) => {
      return item.type === 'custom-colorPickerDropdown';
    }).items[0];

    const [color, setColor] = useState<Omit<ColorConfig, 'type'>>({
      label: defaultColor.label,
      color: defaultColor.color,
    });

    // eslint-disable-next-line consistent-return
    useEffect(() => {
      if (color?.color && color.color !== 'default') {
        document.documentElement.style.setProperty(
          '--ifm-background-color',
          color.color,
        );
      }

      return () => {
        document.documentElement.style.setProperty(
          '--ifm-background-color',
          '#0000',
        );
      };
    }, [color]);

    return (
      <ColorContext.Provider
        value={{
          color,
          setColor,
        }}
      >
        {children}
      </ColorContext.Provider>
    );
  };

  export { ColorPickerProvider };
  ```

  - We use the `useDocusaurusContext` hook to get the `siteConfig` object that
    has the navbar items we defined in `docusaurus.config.js`.

  - Extract the first entry of the `items` property of the
    `custom-colorPickerDropdown` navbar item. This is the default color that we
    will use when the user visits the website for the first time.

    :::tip

    It's recommended that you set `default` as the first color in the `items`
    property. So it won't affect the background color of the website when the user
    visits the website for the first time.

    :::

  - We use the `useEffect` hook to set the `--ifm-background-color` CSS variable to
    the selected color. We also set the `--ifm-background-color` CSS variable to
    `#0000` (default value from Docusaurus) when the component is unmounted.

  - Finally, we pass the `color` and `setColor` to the `ColorContext` so that the
    `ColorPickerNavbarItem` can access it.

- Finally, wrap the `Root` theme component with the provider:

  ```tsx title="src/theme/Root.tsx"
  import React from 'react';
  import { ColorPickerProvider } from '@site/src/context/ColorPickerProvider';

  // Default implementation, that you can customize
  export default function Root({ children }: { children?: React.ReactNode }) {
    return <ColorPickerProvider>{children}</ColorPickerProvider>;
  }
  ```

  :::caution

  You should aware that the `Root` component is not mentioned whether it is
  **Safe** or **Unsafe** by running the command `pnpm swizzle`.

  :::

## Create dropdown navbar item component

Create a wrapper component for the default `DropdownNavbarItem` component:

```tsx title="src/components/elements/BgColorPicker/DropdownNavbarItem.tsx"
import { Icon } from '@iconify/react';
import type { Props } from '@theme/NavbarItem/DropdownNavbarItem';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';
import React, { useContext } from 'react';
import { ColorContext } from './colorContext';
import type { ColorConfig } from './types';

const ColorPickerDropdownNavbarItem = ({
  mobile = false,
  ...props
}: {
  items: ColorConfig[];
} & Props) => {
  const context = useContext(ColorContext);

  // Ref: https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NavbarItem/LocaleDropdownNavbarItem/styles.module.css
  const navbarLabel = (
    <>
      <Icon
        className="mr-5px align-text-bottom"
        icon="ic:outline-palette"
        width={24}
      />
      {mobile ? props.label : context?.color?.label}
    </>
  );

  return <DropdownNavbarItem mobile={mobile} {...props} label={navbarLabel} />;
};

export { ColorPickerDropdownNavbarItem };
```

- First, we have to intersect the `Props` type of the default
  [`DropdownNavbarItem`](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NavbarItem/DropdownNavbarItem.tsx)
  with of our custom `items` property. This is because the default `DropdownNavbarItem` `items` property is of type
  `LinkLikeNavbarItemProps[]`. The `items` prop has value of the `items`
  property of the `custom-colorPickerDropdown` navbar item, defined in the
  `docusaurus.config.js` file.

- We can create custom label with icon, like the `LocaleDropdownNavbarItem`
  component. We use the `context` to get the selected color label. On desktop,
  it displays the selected color label. On mobile, it displays the `label` prop
  of the `custom-colorPickerDropdown` navbar item.

## Create navbar item component

Create `ColorPickerNavbarItem` component:

```tsx title="src/components/elements/BgColorPicker/NavbarItem.tsx"
import type { Props } from '@theme/NavbarItem/DefaultNavbarItem';
import clsx from 'clsx';
import React, { ComponentProps, useContext } from 'react';
import { ColorContext } from './colorContext';
import type { ColorConfig } from './types';

type ColorPickerNavbarItemProps = Omit<Props, keyof ComponentProps<'a'>> &
  ComponentProps<'div'>;

const DefaultColorPickerNavbarItem = ({
  label,
  className,
  isDropdownItem = false,
  activeClassName,
  isLinkActive,
  mobile,
  ...props
}: {
  isLinkActive: boolean;
} & ColorPickerNavbarItemProps) => {
  const element = (
    <div
      className={clsx(
        isDropdownItem && (mobile ? 'menu__link' : 'dropdown__link'),
        className,
        isLinkActive && activeClassName,
      )}
      {...props}
    >
      {label}
    </div>
  );

  if (isDropdownItem) {
    return <li className={clsx(mobile && 'menu__list-item')}>{element}</li>;
  }

  return element;
};

const ColorPickerNavbarItem = ({
  label,
  color,
  mobile,
  ...props
}: Omit<ColorConfig, 'type'> & ColorPickerNavbarItemProps) => {
  const context = useContext(ColorContext);

  const handleClick = () => {
    context?.setColor({ label, color });
  };

  return (
    <DefaultColorPickerNavbarItem
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'dropdown__link--active')
      }
      isLinkActive={context?.color?.color === color}
      label={label}
      mobile={mobile}
      onClick={handleClick}
    />
  );
};

export { ColorPickerNavbarItem };
```

- First, because we render a `<div>` element instead of an `<a>` element, we
  have to omit the `Props` type of the default
  [`DefaultNavbarItem`](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NavbarItem/DefaultNavbarItem.tsx)
  that contains the `a` element props.

  :::note

  Although the type `ColorPickerNavbarItemProps` still has the `RRNavLinkProps`,
  which is react-router-dom's props and others, those are not used in the
  component, we don't have care much about it.

  :::

- This component is rewritten from the default `DefaultNavbarItem` component,
  which merge both `DefaultNavbarItemDesktop` and `DefaultNavbarItemMobile` into
  a single component.

## Export navbar item components

Export the `ColorPickerDropdownNavbarItem` and `ColorPickerNavbarItem` components:

```tsx title="src/components/elements/BgColorPicker/index.ts"
export * from './DropdownNavbarItem';
export * from './NavbarItem';
```

## Register custom navbar items

We will register the custom navbar items in the `NavbarItem/ComponentTypes`
file:

```tsx title="src/theme/NavbarItem/ComponentTypes.tsx"
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import {
  ColorPickerDropdownNavbarItem,
  ColorPickerNavbarItem,
} from '@site/src/components/elements/BgColorPicker';

export default {
  ...ComponentTypes,
  'custom-colorPickerDropdown': ColorPickerDropdownNavbarItem,
  'custom-colorPicker': ColorPickerNavbarItem,
};
```

:::note

Once again, the `custom-` prefix is required when registering custom navbar
items. From [slorber's
suggestion](https://github.com/facebook/docusaurus/pull/7231#issue-1212634783).

:::

## Add navbar item to navbar

Add the custom navbar items to the navbar in the file `dousaurus.config.js`:

```js title="docusaurus.config.js"
const config = {
  themeConfig: {
    navbar: {
      items: [
        {
          type: 'custom-colorPickerDropdown',
          position: 'right',
          label: 'Color',
          items: [
            {
              type: 'custom-colorPicker',
              label: 'default',
              color: 'default',
            },
            {
              type: 'custom-colorPicker',
              label: 'red',
              color: 'red',
            },
            {
              type: 'custom-colorPicker',
              label: 'blue',
              color: 'blue',
            },
            {
              type: 'custom-colorPicker',
              label: 'green',
              color: 'green',
            },
          ],
        },
      ],
    },
  },
};
```

And voila! We have a working color picker in the navbar.

## Related Articles

- [Workaround for custom navbar
  items](https://github.com/facebook/docusaurus/pull/7231).
- [Docusaurus: Navbar items
  configuration](https://docusaurus.io/docs/api/themes/configuration#navbar-items).
