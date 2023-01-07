# Components

This is the documentation for using components in your application.

## Getting Started

Components are the building blocks of your application. They are the smallest
unit of code that can be reused and shared. Since Docusaurus is built with
React, you can use custom components to extend the functionality of the default
theme.

## Built-in Components

### UI Components

Docusaurus comes with a few built-in UI components that you can use to build
your new component. For example, you can import the `Details` component from
`@theme/Details` to use in your component:

```jsx
import React from 'react';
import Details from '@theme/Details';

export default function MyComponent() {
  return (
    <Details
      summary={<summary>Click to expand</summary>}
      children={<p>Some content</p>}
    />
  );
}
```

Read more: [Client architecture](https://docusaurus.io/docs/advanced/client)

### Other Components

Docusaurus also provides a few other built-in utility components that you can
use, like `ErrorBoundary`, `Head`, `Link`, or `BrowserOnly`. You can find the
full list of components in the [API
reference](https://docusaurus.io/docs/docusaurus-core#components).

### "Swizzling" Components

You can customize the default theme components by "swizzling" them. This means
that you can create a "wrapper" or "copy" of the theme component and customize
it.

For example, we "wrap" the `Root` component with [TanStack
Query](https://tanstack.com/query/v4)'s
[`QueryClientProvider`](https://tanstack.com/query/v4/docs/react/reference/QueryClientProvider):

> **Note**: You will have to install `@tanstack/react-query` and
> `@tanstack/react-query-devtools` packages to use this example:
>
> ```bash
> pnpm add @tanstack/react-query @tanstack/react-query-devtools
> ```

```jsx
// src/theme/Root.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </>
    </QueryClientProvider>
  );
}
```

Read more: [Swizzling](https://docusaurus.io/docs/swizzling)

## Custom Components

### Architecture

This project uses this component architecture:

```
src
└── components
    ├── elements
    │   ├── Component1
    │   │   └── index.jsx
    │   ├── MyComponent
    │   │   ├── MyComponent.jsx
    │   │   ├── MyComponentCard.jsx
    │   │   ├── MyComponentButton.jsx
    │   │   └── index.js
    │   ├── YourComponent
    │   │   ├── context.js
    │   │   ├── YourComponentCard.jsx
    │   │   ├── YourComponentButton.jsx
    │   │   └── index.js
    │   └── Component2.jsx
    ├── layouts
    │   └── Component3.jsx
    └── modules
        └── Component4.jsx
```

- `elements`: the smallest components that can be reused and shared. They
  should be as generic as possible.
- `layouts`: the components that define the layout of the page or wrap other
  components.
- `modules`: the components that are built from multiple elements and layouts.

### Creating a new Component

#### Naming

- JSX files should be named with PascalCase and have a `.jsx` extension. For
  example, `MyComponent.jsx`.

- If your component has a very long name, you can put it in a folder and remove
  the prefix from the component name. For example, if your component name is
  `MyVeryLongComponent`, then your smaller components can be `Card.jsx`,
  `Button.jsx`, etc. and the core component can be `index.jsx`.

#### Single component

You can create a single component with the file name `Component1.jsx` (or
`Component1.js`), or within a folder with the same name as the component (e.g.
`Component1/index.jsx`).

#### Component built from smaller components

> **Note**: Smaller components should be ...small. If a component is too big,
> then it should be put in the `elements` folder and the core component in the
> `modules` folder.

If your component **built from smaller custom-related components**, you can
create a folder with the same name as the component and put the smaller
components inside it. Then add a file named `index.js` that exports the **core
component**.

```jsx
// src/components/elements/MyComponent/MyComponentCard.jsx
import React from 'react';
function MyComponentCard() {
  return <div>MyComponentCard</div>;
}

export { MyComponentCard };
```

```jsx
// src/components/elements/MyComponent/MyComponentButton.jsx
import React from 'react';
function MyComponentButton() {
  return <button>MyComponentButton</button>;
}
export { MyComponentButton };
```

```jsx
// src/components/elements/MyComponent/MyComponent.jsx
import React from 'react';
import { MyComponentCard } from './MyComponentCard.jsx';
import { MyComponentButton } from './MyComponentButton.jsx';
function MyComponent() {
  return (
    <div>
      <MyComponentCard />
      <MyComponentButton />
    </div>
  );
}
export { MyComponent };
```

```js
// src/components/elements/MyComponent/index.js
export * from './MyComponent';
```

So we can import the core component from the `MyComponent` folder using
**absolute path**:

```jsx
// src/pages/index.jsx
import { MyComponent } from '@site/src/components/elements/MyComponent';
```

Read more: [Importing
components](https://docusaurus.io/docs/markdown-features/react#importing-components)

#### Grouping components

You can group components or share context between components by creating a new
folder and putting the components inside it. Then add a file named `index.js`
that exports the **smaller core components**.

> **Note**: If your context is used by other components, you should put it in
> `src/context` folder, e.g.: `src/context/YourProvider.jsx`.

```js
// src/components/elements/YourComponent/context.js
import { createContext } from 'react';

export const YourComponentContext = createContext(null);
```

```jsx
// src/components/elements/YourComponent/HorizontalCard.jsx
import React from 'react';
import { Title } from './Title';
import { YourComponentContext } from './context';

function HorizontalCard() {
  return (
    <YourComponentContext.Provider value="horizontal">
      <Title />
    </YourComponentContext.Provider>
  );
}

export { HorizontalCard };
```

```jsx
// src/components/elements/YourComponent/VerticalCard.jsx
import React from 'react';
import { Title } from './Title';
import { YourComponentContext } from './context';

function VerticalCard() {
  return (
    <YourComponentContext.Provider value="vertical">
      <Title />
    </YourComponentContext.Provider>
  );
}

export { VerticalCard };
```

```jsx
// src/components/elements/YourComponent/Title.jsx
import React, { useContext } from 'react';
import { YourComponentContext } from './context';

function Title() {
  const data = useContext(YourComponentContext);

  return <div>{data}</div>;
}

export { Title };
```

```js
// src/components/elements/YourComponent/index.js
export * from './HorizontalCard';
export * from './VerticalCard';
```

Then we import the components from `YourComponent`:

```jsx
// src/pages/index.jsx
import {
  HorizontalCard,
  VerticalCard,
} from '@site/src/components/elements/YourComponent';
```
