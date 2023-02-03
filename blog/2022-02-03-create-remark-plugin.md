---
slug: create-remark-plugin
title: Create remark plugin for Docusaurus
authors:
  - duckymomo20012
tags:
  - guide
---

# Create remark plugin for Docusaurus

Writing markdown is fun, and it's even better with
[Docusaurus](https://docusaurus.io/) because it's easy to use and has a lot of
features that make your markdown more beautiful. But as a power user, you can
extend the markdown syntax to make it more powerful with remark plugins.

## Getting Started

In this guide, we will show you how to create a remark plugin for Docusaurus
that converts a markdown url link to transform URL (**with patterns**) links
(e.g.: `[hyperlink](some-url)`) or URL plain texts to `iframe` elements.

## Quick introduction to remark

> remark is a markdown processor powered by
> [plugins](https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins)
> part of the [unified](https://unifiedjs.com/) collective. The project
> [parses](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-parse#readme)
> and
> [compiles](https://github.com/remarkjs/remark/tree/HEAD/packages/remark-stringify#readme)
> markdown, and lets programs process markdown without ever compiling to HTML
> ([it can though](https://github.com/remarkjs/remark-html)). Powered by
> [plugins](https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md#list-of-plugins)
> to do all kinds of things: check [markdown code
> style](https://github.com/remarkjs/remark-lint), add a [table of
> contents](https://github.com/remarkjs/remark-toc), or compile to man pages.
>
> View the project on [GitHub](https://github.com/remarkjs/remark) or inspect
> the syntax tree on [AST
> Explorer](https://astexplorer.net/#/gist/0a92bbf654aca4fdfb3f139254cf0bad/ffe102014c188434c027e43661dbe6ec30042ee2).

Or you can read the [Transforming Markdown with Remark &
Rehype](https://www.ryanfiller.com/blog/remark-and-rehype-plugins) blog to learn
more about both remark and rehype. Most of content in this guide is inspired by
it.

Moreover, you can use community plugins to extend the markdown syntax. For more
information, see:

- [`awesome-remark`](https://github.com/remarkjs/awesome-remark) — selection of
  the most awesome projects.
- [List of
  plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins).
- [`remark-plugin topic`](https://github.com/topics/remark-plugin) — any tagged
  repo on GitHub.

## Plugin concept

[Plugins](https://github.com/unifiedjs/unified#plugin) configure the processors
they are applied on in the following ways:

- they change the processor, such as the
  [parser](https://github.com/unifiedjs/unified#processorparser), the
  [compiler](https://github.com/unifiedjs/unified#processorcompiler), or by
  configuring
  [data](https://github.com/unifiedjs/unified#processordatakey-value).
- they specify how to handle trees and files.

Plugins are a concept. They materialize as
[`Attachers`](https://github.com/unifiedjs/unified#function-attacheroptions).

> `Attachers` are functions that take options and return a
> [`Transformer`](https://github.com/unifiedjs/unified#function-transformertree-file-next).
> Inside a `Transformer`, we can use the
> [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit) to visit
> each node in the tree and transform it (change the node type, add attributes, or
> modify the node value).

## Install dependencies

Install the following dependencies:

```bash
pnpm add unist-util-visit joi
```

> [Joi](https://joi.dev/api/?v=17.7.0) is for validating the options of the
> plugin, may remove it later.

## Define options schema

```js title="src/remark/transformURL.js"
const Joi = require('joi');

const optionSchema = Joi.object({
  patterns: Joi.array().items(Joi.string(), Joi.object().regex()),
  iframeAttrs: Joi.object().pattern(Joi.string(), [
    Joi.number(),
    Joi.string(),
    Joi.boolean(),
  ]),
});
```

Our plugin will have two options:

- `patterns`: an array of string or regex patterns to match the URL. If the URL
  matches one of the patterns, it will be transformed to an `<iframe>` element.
- `iframeAttrs`: an object of attributes to add to the `<iframe>` element.
  The value can be a `number`, `string`, or `boolean`. `boolean` with `true`
  value will be converted to the attribute name without value, e.g.:
  `crossorigin: true` will be converted to `crossorigin` attribute.

  :::note

  **`iframeAttrs` is not camelCase**, as `allowfullscreen: true` will be passed as `allowfullscreen`.

  :::

## Define the plugin

Just show the code first:

```js title="src/remark/transformURL.js"
const Joi = require('joi');

const optionSchema = Joi.object({
  patterns: Joi.array().items(Joi.string(), Joi.object().regex()),
  iframeAttrs: Joi.object().pattern(Joi.string(), [
    Joi.number(),
    Joi.string(),
    Joi.boolean(),
  ]),
});

// NOTE: Keep it simple because we only check for node type and url scheme
const nodeSchema = Joi.object({
  type: Joi.string().valid('link', 'text'),
  value: Joi.string().uri({
    scheme: ['http', 'https'],
  }),
  url: Joi.string().uri({
    scheme: ['http', 'https'],
  }),
}).unknown();

function checkPatterns(url, patterns) {
  return patterns.some((pattern) => {
    const re = new RegExp(pattern);

    return re.test(url);
  });
}

function convertObjectToHTMLAttributes(obj) {
  return Object.entries(obj)
    .map(([key, val]) => {
      if (typeof val === 'boolean' && val === true) {
        return key;
      }
      return `${key}="${val}"`;
    })
    .join(' ');
}

function plugin(options = {}) {
  Joi.assert(options, optionSchema);

  const { patterns = [], iframeAttrs = {} } = options;

  // NOTE: Create function inside the plugin to access options
  async function transformer(tree) {
    const { visit } = await import('unist-util-visit');

    const test = (node) => {
      const check = nodeSchema.validate(node);

      return check.error === undefined;
    };

    visit(tree, test, (node, index, parent) => {
      const url = node.value ? node.value : node.url;

      if (!checkPatterns(url, patterns)) {
        return;
      }

      const newAttrs = convertObjectToHTMLAttributes(iframeAttrs);

      // NOTE: src should be the first attribute so it won't be overwritten
      const newValue = `<iframe src="${url}" ${newAttrs}></iframe>`;

      // We swap parent (usually "paragraph" node) with the new value if there
      // is only one child as there is no others "text" node in the
      // "paragraph" node
      if (parent.children.length === 1) {
        parent.type = 'html';
        parent.value = newValue;
        parent.children = [];
        return;
      }

      // We only swap the 'link' node with the new value if node is not the
      // only child
      node.type = 'html';
      node.value = newValue;
      node.children = [];
      delete node.url;
      delete node.title;
    });
  }
  return transformer;
}

module.exports = plugin;
```

## Explanation

### 1. Validate the options

```js
Joio.assert(options, optionSchema);
```

### 2. Extract the `patterns` and `iframeAttrs` from the options

> We use `[]` and `{}` as default values because we want to make sure the value
> is valid.

```js
const { patterns = [], iframeAttrs = {} } = options;
```

### 3. Create the `transformer` function

```js
function plugin(options = {}) {
  Joi.assert(options, optionSchema);

  const { patterns = [], iframeAttrs = {} } = options;

  // NOTE: Create function inside the plugin to access options
  async function transformer(tree) {
    const { visit } = await import('unist-util-visit');

    const test = (node) => {
      const check = nodeSchema.validate(node);

      return check.error === undefined;
    };

    visit(tree, test, (node, index, parent) => {
      const url = node.value ? node.value : node.url;

      if (!checkPatterns(url, patterns)) {
        return;
      }

      const newAttrs = convertObjectToHTMLAttributes(iframeAttrs);

      // NOTE: src should be the first attribute so it won't be overwritten
      const newValue = `<iframe src="${url}" ${newAttrs}></iframe>`;

      // We swap parent (usually "paragraph" node) with the new value if there
      // is only one child as there is no others "text" node in the
      // "paragraph" node
      if (parent.children.length === 1) {
        parent.type = 'html';
        parent.value = newValue;
        parent.children = [];
        return;
      }

      // We only swap the 'link' node with the new value if node is not the
      // only child
      node.type = 'html';
      node.value = newValue;
      node.children = [];
      delete node.url;
      delete node.title;
    });
  }
  return transformer;
}
```

:::info

Hm, why we use `import` to import `unist-util-visit`? `unist-util-visit` is a
[ESM
only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)
package, so we can't use `require` to import it. Because we going import the
plugin into the `docusaurus.config.js` file, and it's a `CJS` (CommonJS) module
([not support `ESM` yet](https://github.com/facebook/docusaurus/issues/6520)),
so we can't mix `ESM` (ES Module) and `CJS` in the same file.

:::

- The
  [`visit`](https://github.com/syntax-tree/unist-util-visit#visittree-test-visitor-reverse)
  behaves exactly like
  [`unist-util-visit-parents`](https://github.com/syntax-tree/unist-util-visit-parents)
  function as it receives:

  - a `tree` ([`Node`](https://github.com/syntax-tree/unist#node)): A very tree of
    nodes that we want to visit.
  - a `test`
    ([`Test`](https://github.com/syntax-tree/unist-util-visit-parents#test),
    optional): A [Test](https://github.com/syntax-tree/unist-util-is#test) to
    check if a node should be visited.
    - This usually is a `string` (e.g.: `'link'`), a array (e.g.:
      `['link','text']`) a `object` (e.g.: `{ type: 'link'}`), or a `function`
      that will be [called with a
      node](https://github.com/syntax-tree/unist-util-is#testfunctionanything) and
      should return `true` if the node should be visited.
  - a `visitor`
    ([`Visitor`](https://github.com/syntax-tree/unist-util-visit-parents#visitor)):
    A function to handle each node that is visited.

:::note

Then `transformer` function as the return value of the `plugin` function MUST be
a `async` function.

:::

### 4. About the `test` function

In this example `test` is function that check if the node is a `link` or
`text` node, and based on that we will check for the `value` or `url` property
that has the `http` or `https` protocol.

For the sake of simplicity, you can pass an array `['link', 'text']` to the the
`visit` and then check later.

We put the `test` function inside the `transformer` function because we want to
access the `patterns` from the options, then check it with the `checkPatterns`
function:

```js
function checkPatterns(url, patterns) {
  return patterns.some((pattern) => {
    const re = new RegExp(pattern);

    return re.test(url);
  });
}
```

### 5. About the `visitor` function

#### Inspect the properties of nodes:

:::tip

[AST Explorer](https://astexplorer.net/) is a great tool to help you understand
about AST and how to use `unist-util-visit` function. You can try it out to
modify the AST and see how it works.

:::

- `link` node structure:

  - Input:

    ```md
    [BLACKPINK - 'How You Like That' M/V](https://www.youtube.com/watch?v=ioNng23DkIM)
    ```

  - Yields:

    ```js
    {
      type: 'link',
      url: 'https://www.youtube.com/watch?v=ioNng23DkIM',
      title: null,
      children: [
        {
          type: 'text',
          value: "BLACKPINK - 'How You Like That' M/V",
          position: { start: [Object], end: [Object] }
        }
      ],
      position: { start: [Object], end: [Object] }
    }
    ```

  - Demo:

    ![link-node-demo](https://user-images.githubusercontent.com/64480713/216637146-3a0cc435-871f-4d1a-9fcf-c28cb9cec957.png)

- `text` node structure:

  - Input:

    ```md
    https://www.youtube.com/watch?v=ioNng23DkIM
    ```

  - Yields:

    ```js
    {
      type: 'text',
      value: 'https://www.youtube.com/watch?v=ioNng23DkIM',
      position: { start: [Object], end: [Object] }
    }
    ```

  - Demo:

    ![text-node-demo](https://user-images.githubusercontent.com/64480713/216637887-0840c958-cfcd-4105-9748-6c459027a9f0.png)

:::info

Docusaurus will detect the `text` node that has URL protocol and convert it to a
`link` node for us. We don't know how to override this behavior, even if put the
plugin in the
[`beforeDefaultRemarkPlugins`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#beforeDefaultRemarkPlugins)
option.

:::

- `html` node structure:

  - Input:

    ```md
    <iframe
      src="https://www.youtube.com/watch?v=IHNzOHi8sJs"
      data-type-iframe="video"
      width="100%"
      height="100%"
      style="aspect-ratio: 16/9"
      title="Video player"
    ></iframe>
    ```

  - Yields:

    ```js
    {
      type: 'html',
      value: "<iframe\n  src=\"https://www.youtube.com/watch?v=IHNzOHi8sJs\"\n  data-type-iframe=\"video\"\n  width=\"100%\"\n  height=\"100%\"\n  style=\"aspect-ratio: 16/9\"\n  title=\"Video player\"\n></iframe>",
      position: { start: [Object], end: [Object] }
    }
    ```

  - Demo:

    ![html-node-demo](https://user-images.githubusercontent.com/64480713/216640549-ec9b7551-96d6-4c6d-b4f1-27d8b028b826.png)

#### Construct the new `html` node

- A function that convert the object properties to HTML attributes:

  ```js
  function convertObjectToHTMLAttributes(obj) {
    return Object.entries(obj)
      .map(([key, val]) => {
        if (typeof val === 'boolean' && val === true) {
          return key;
        }
        return `${key}="${val}"`;
      })
      .join(' ');
  }
  ```

  Kinda messy, but it works. The `boolean` value with `true` will be converted to
  a key without value, e.g.: `crossorigin` instead of `crossorigin="true"`.

- Construct the new `<iframe>` HTML node:

  ```js
  const newAttrs = convertObjectToHTMLAttributes(iframeAttrs);

  // NOTE: src should be the first attribute so it won't be overwritten
  const newValue = `<iframe src="${url}" ${newAttrs}></iframe>`;
  ```

  :::info

  Refer to this [StackOverflow
  answer](https://stackoverflow.com/a/26341866/12512981), the later `src`
  attribute is ignored if the user unintentionally put it in the middle of the
  `<iframe>` tag.

  :::

#### Modify the AST tree

Each `link` or `text` node always a
[`child`](https://github.com/syntax-tree/unist#child) of a `paragraph` node.
Because the `html` node is not a `child` of a `paragraph` node, we can swap the
`paragraph` node with the `html` node **if the `html` node is the only child of
the `paragraph` [`parent`](https://github.com/syntax-tree/unist#parent-1)
node**. Otherwise, we will just replace the `link` or `text` node with the
`html` and leave the `paragraph` node as it is.

```js
// We swap parent (usually "paragraph" node) with the new value if there
// is only one child as there is no others "text" node in the
// "paragraph" node
if (parent.children.length === 1) {
  parent.type = 'html';
  parent.value = newValue;
  parent.children = [];
  return;
}

// We only swap the 'link' node with the new value if node is not the
// only child
node.type = 'html';
node.value = newValue;
node.children = [];
delete node.url;
delete node.title;
```

## Import the plugin

Now we have the plugin, we can import it in the `docusaurus.config.js` file.

:::note

Because we include the plugin in the `docs` preset, so the plugin will only be
used for the `docs` pages.

:::

```js title="docusaurus.config.js"
const transformURL = require('./src/remark/transformURL');

const config = {
  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [
            [
              transformURL,
              {
                patterns: ['example.com'],
                iframeAttrs: {
                  width: '500px',
                  height: '500px',
                  style: 'aspect-ratio: 1/1;',
                  title: 'Video player',
                  frameborder: 0,
                  allow:
                    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                  allowfullscreen: true,
                },
              },
            ],
          ],
        },
      },
    ],
  ],
};

module.exports = config;
```

Then with input:

```md title="docs/foo.md"
https://example.com

[foo](https://example.com)
```

We will get the output:

```html
<iframe
  title="Video player"
  src="https://example.com"
  width="500px"
  height="500px"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen=""
  style="aspect-ratio: 1 / 1;"
></iframe>
```

Demo:

![plugin-url-demo](https://user-images.githubusercontent.com/64480713/216650958-f6bfc77c-a040-47b3-9f6d-0f9960c44099.png)

## Advanced Usage

### Convert URL to `react-player` component

With the plugin above, we can use it to convert the URL to an `<iframe>` HTML
and then register the `<iframe>` to Docusaurus's default MDX components.

#### Install dependencies

> [`react-player`](https://github.com/cookpete/react-player) is a React component
> for playing a variety of URLs, including file paths, YouTube, Facebook, Twitch,
> SoundCloud, Streamable, Vimeo, Wistia, Mixcloud, DailyMotion and Kaltura.

```bash
pnpm add react-player
```

#### Define the plugin

```js title="src/remark/transformVideo.js"
/* eslint-disable @typescript-eslint/no-var-requires */
const transformURL = require('./transformURL');

// Ref: https://cookpete.com/react-player/
const DEFAULT_PATTERN = [
  '\\.mp4$',
  '\\.webm$',
  '\\.ogv$',
  '\\.mp3$',
  '\\.m3u8$',
  '\\.mpd$',
  '\\.mov$',
  'soundcloud.com',
  'youtube.com',
  'facebook.com',
  'vimeo.com',
  'twitter.tv',
  'streamable.com',
  'wistia.com',
  'dailymotion.com',
  'mixcloud.com',
  'vidyard.com',
  'kaltura.com',
];

function plugin(options) {
  return async (tree) => {
    const transformer = transformURL({
      patterns: [...DEFAULT_PATTERN, ...(options?.patterns || [])],
      iframeAttrs: {
        // NOTE: Set data-type-iframe to 'video' to be able to differentiate
        // between video and normal iframe
        'data-type-iframe': 'video',
        width: '100%',
        height: '100%',
        style: 'aspect-ratio: 16/9;',
        title: 'Video player',
        frameborder: 0,
        allow:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        allowfullscreen: true,
        ...options?.iframeAttrs,
      },
    });

    await transformer(tree);
  };
}

module.exports = plugin;
```

This plugin uses `remark-url-to-iframe` plugin to transform URL (**with
patterns**) links (e.g.: `[hyperlink](some-url)`) or URL plain texts to `iframe`
elements.

This plugin passes some default options to `remark-url-to-iframe` plugin, you
can override them with your own options.

:::note

We set data-type-iframe to 'video' to be able to differentiate between video and
normal iframe.

:::

#### Register the plugin

```js title="docusaurus.config.js"
const transformVideo = require('./src/remark/transformVideo');

const config = {
  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [
            [transformVideo, { patterns: ['youtube.com'] }],
          ],
        },
      },
    ],
  ],
};

module.exports = config;
```

Then we can map the URL to the `<iframe>` HTML with the attribute
`data-type-iframe="video`.

#### Create the `<VideoPlayer />` component

```tsx title="src/components/elements/VideoPlayer.tsx"
import React from 'react';
import ReactPlayer from 'react-player';
import type { ReactPlayerProps } from 'react-player';

const VideoPlayer = ({
  src,
  ...props
}: {
  src: string;
} & ReactPlayerProps) => {
  return <ReactPlayer controls url={src} {...props} />;
};

export { VideoPlayer };
```

#### Map the `<iframe>` HTML to `react-player` component

```tsx title="src/theme/MDXComponents.tsx"
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from 'react';
import { VideoPlayer } from '@site/src/components/elements/VideoPlayer';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "iframe" tag to our <VideoPlayer /> component!
  // `VideoPlayer` will receive all props that were passed to `iframe` in MDX
  iframe: (props) => {
    if (props['data-type-iframe'] === 'video') {
      return <VideoPlayer {...props} />;
    }
    return <iframe title={props.title} {...props}></iframe>;
  },
};
```

At this file we import [the original
mapper](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/MDXComponents/index.tsx)
from `@theme-original/MDXComponents` and then we re-export it with our custom
mapping. Note that we only map the `<iframe>` HTML with the attribute
`data-type-iframe="video` to our `<VideoPlayer />`.

#### Demo

![plugin-video-demo](https://user-images.githubusercontent.com/64480713/216657087-fb332662-e2f3-48aa-be85-dde4ce51b504.png)

### Manually parse Markdown string with `@mdx-js/mdx`

We can also manually parse Markdown string (from server) with `@mdx-js/mdx` and
then transform the URL to `react-player` component.

Manually parsed Markdown content with
[`evaluate`](https://mdxjs.com/packages/mdx/#evaluatefile-options) function:

- This requires `@mdx-js/mdx`, `@mdx-js/react` and `rehype-raw` packages:

  ```bash
  pnpm add @mdx-js/mdx @mdx-js/react@1.6.22 rehype-raw
  ```

  > **Note**: Currently, Docusaurus v2 is [currently
  > working](https://github.com/facebook/docusaurus/pull/8288) on migrating
  > to`@mdx-js/react v2`. Before that, we need to install
  > `@mdx-js/react@1.6.22` to make it works.

- `@mdx-js/mdx` is a unified pipeline — wrapped so that most folks don’t need
  to know about unified:
  [core.js#L65](https://github.com/mdx-js/mdx/blob/main/packages/mdx/lib/core.js#L65).
  The processor goes through these steps:

  1. Parse MDX (serialized markdown with embedded JSX, ESM, and expressions)
     to mdast (markdown syntax tree).
  2. Transform through remark (markdown ecosystem).
  3. Transform mdast to hast (HTML syntax tree).
  4. Transform through rehype (HTML ecosystem).
  5. Transform hast to esast (JS syntax tree).
  6. Do the work needed to get a component.
  7. Transform through recma (JS ecosystem).
  8. Serialize esast as JavaScript.

- Because `iframe` is parsed as `raw` nodes when parsing the context to HTML
  syntax tree, we need to add
  [`rehype-raw`](https://github.com/rehypejs/rehype-raw) plugin to handle the
  `raw` nodes.

- We also have to "pass through"
  [`remark-mdx`](https://github.com/mdx-js/mdx/tree/main/packages/remark-mdx)
  (this plugin is run
  [first](https://github.com/mdx-js/mdx/blob/a17ac87c9e61f51233615e0d36eb8449652bb290/packages/mdx/lib/core.js#L104))
  nodes so `rehype-raw` don't have to handle them.

- We pass registered MDX components (in file `MDXComponents` we "swizzle"
  before) to `evaluate` function by setting the
  [`useMDXComponents`
  option](https://mdxjs.com/packages/mdx/#optionsusemdxcomponents).

  > **Note**: We have to manually get registered MDX components using
  > [`useMDXComponents`
  > hook](https://mdxjs.com/packages/mdx/#optionsusemdxcomponents) first.

  > **Note**: Remember to wrap `ReleaseBody` component with `MDXContent` from
  > `@theme/MDXContent` to provide the context of MDX components to the
  > `ReleaseBody` component.

- **Warning**: Because we can't ensure the content is parsed correctly, we
  need to wrap the `ReleaseBody` component with `ErrorBoundary` component to
  be able to catch the error and display the error message.

```tsx
// src/components/elements/ReleaseCard.tsx
import { evaluate, nodeTypes } from '@mdx-js/mdx';
import { useMDXComponents } from '@mdx-js/react';
import transformVideo from '@site/src/remark/transformVideo';
import Admonition from '@theme/Admonition';
import MDXContent from '@theme/MDXContent';
import React, { useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import rehypeRaw from 'rehype-raw';

const ReleaseBody = ({ body }) => {
  const components = useMDXComponents();

  const [parsed, setParsed] = useState<React.ReactNode>();

  useEffect(() => {
    const evaluateBody = async () => {
      const { default: BodyContent } = await evaluate(body, {
        ...runtime,
        remarkPlugins: [transformVideo],
        // Ref: https://github.com/atomiks/rehype-pretty-code/issues/6#issuecomment-1006220771
        rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
        useMDXComponents: () => components,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      setParsed(<BodyContent />);
    };

    evaluateBody();
  }, [body, components]);

  return <>{parsed}</>;
};

const ReleaseCard = ({ release, latest = false }) => {
  return (
    { /* ... */}
    <ErrorBoundary
      fallback={({ error }) => (
        <>
          <Admonition type="danger" title="Error">
            <p>This component crashed because of error: {error.message}.</p>
          </Admonition>
          <pre className="whitespace-pre-wrap">
            <code>{release.body}</code>
          </pre>
        </>
      )}
    >
      <MDXContent>
        <ReleaseBody body={release.body} />
      </MDXContent>
    </ErrorBoundary>
  );
};

export { ReleaseCard };
```

## Related Articles

- [Transforming Markdown with Remark &
  Rehype](https://www.ryanfiller.com/blog/remark-and-rehype-plugins).
- [MDX Playground](https://mdxjs.com/playground/).
- [MDX component
  scope](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope).
- [MDXProvider](https://mdxjs.com/packages/react/#mdxproviderprops).
