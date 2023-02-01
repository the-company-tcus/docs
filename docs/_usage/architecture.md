# Architecture

This documentation is a guide to the architecture of this project.

## Getting Started

This project uses this component architecture:

```
.
├── blog
├── docs
├── static
└── src
    ├── components
    │   ├── elements
    │   │   ├── Component1
    │   │   │   └── index.tsx
    │   │   ├── MyComponent
    │   │   │   ├── MyComponent.tsx
    │   │   │   ├── MyComponentCard.tsx
    │   │   │   ├── MyComponentList.tsx
    │   │   │   └── index.js
    │   │   └── Component2.tsx
    │   ├── layouts
    │   │   └── Component3.tsx
    │   └── modules
    │       └── Component4.tsx
    ├── context
    │   └── QueryProvider.tsx
    ├── hooks
    │   ├── useClickOutside.ts
    │   └── useQuery.ts
    ├── pages
    │   ├── _pdf-viewer
    │   │   └── index.tsx
    │   └── index.tsx
    ├── plugins
    │   ├── plugin-cursor-effects
    │   │   └── index.js
    │   └── plugin-dynamic-routes
    │       └── index.js
    ├── remark
    │   ├── transformEmoji.js
    │   └── transformPDF.js
    └── theme
        ├── MDXComponents.tsx
        └── Root.tsx

```

## Description

### `blog` Folder

This is a DocuSaurus feature, contains blog posts for the document website. Any
markdown file in this folder will be automatically added to the blog section
(`/blog` path) of the website.

Read more about the blog feature: [Blog](https://docusaurus.io/docs/blog)

### `docs` Folder

This is a DocuSaurus feature, contains documentation for the document website.

However, this can also be used to store any documentation related to the
project, by adding an underscore (`_`) to the beginning of the file name to
ignore the file from the website.

Read more about the docs feature:
[Docs](https://docusaurus.io/docs/docs-introduction)

### `static` Folder

This is a DocuSaurus feature, contains static assets (images, pdf files) for the
document website.

Read more about the static assets feature:
[Static Assets](https://docusaurus.io/docs/static-assets)

### `src` Folder

> **Note**: Every files in this folder should be written in TypeScript.

This folder contains the source code for the project.

### `components` Folder

> **Note**: Every files in this folder should be written in TypeScript.

- `elements`: the smallest components that can be reused and shared. They
  should be as generic as possible.
- `layouts`: the components that define the layout of the page or wrap other
  components.
- `modules`: the components that are built from multiple elements and layouts.

Read more about the components architecture: [Components](./components.md)

### `context` Folder

> **Note**: Every files in this folder should be written in TypeScript.

This folder contains the global React Contexts for the project. These contexts
should be imported and wrap the `Root` component in the `theme/Routes.jsx` file.

### `hooks` Folder

> **Note**: Every files in this folder should be written in TypeScript.

This folder contains the custom React Hooks for the project. The file name
should be prefixed with `use` to indicate that it is a custom hook.

### `pages` Folder

> **Note**: Every files in this folder should be written in TypeScript.

This is a DocuSaurus feature, contains the pages for the document website. You
can also ignore the file from the website (e.g. **add a dynamic route**) by
adding an underscore (`_`) to the beginning of the file name.

Read more about the pages feature:
[Pages](https://docusaurus.io/docs/creating-pages)

### `plugins` Folder

This contains plugins to be used with the project. Plugins are used to extend or
modify the default behavior of the project. Usually, plugins are imported in the
file `docusaurus.config.js`.

Read more about the plugins feature:
[Plugins](https://docusaurus.io/docs/advanced/plugins)

### `remark` Folder

This folder contains the custom remark plugins for the project. These plugins
can be imported and used in the file `docusaurus.config.js`.

Read more about the remark plugins feature:
[Remark](https://github.com/remarkjs/remark)

### `theme` Folder

> **Note**: Every files in this folder should be written in TypeScript.

This folder contains the theme for the project. The theme is used to customize
or wrap the default Docusaurus theme. Usually, these files can be created using
CLI commands, such as `docusaurus swizzle`.

Read more about the "swizzling" feature:
[Swizzling](https://docusaurus.io/docs/swizzling)
