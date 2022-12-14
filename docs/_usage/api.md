# API References

This is a list of all the components, plugins, and hooks in this project.

## Table of Contents

- [Components](#components)
  - [ReleaseCard](#releasecard)
  - [ReleaseList](#releaselist)
  - [ReleaseDropdown](#releasedropdown)
  - [VideoPlayer](#videoplayer)
  - [PDFViewer](#pdfviewer)
  - [PDFViewerButton](#pdfviewerbutton)
- [Hooks](#hooks)
  - [useReleaseByTimeRange](#usereleasebytimerange)
- [Plugins](#plugins)
  - [plugin-dynamic-route](#plugin-dynamic-route)
  - [plugin-windicss](#plugin-windicss)
  - [plugin-cursor-effects](#plugin-cursor-effects)
- [Remark Plugins](#remark-plugins)
  - [remark-url-to-iframe](#remark-url-to-iframe)
  - [remark-transform-video](#remark-transform-video)
  - [remark-transform-pdf](#remark-transform-pdf)
  - [remark-transform-emoji](#remark-transform-emoji)

## Components

### ReleaseCard

[⬆️ Back to top](#table-of-contents)

ReleaseCard component for displaying a GitHub release.

#### Demo

> **Note**: Please replace `<YOUR_GITHUB_TOKEN>` with your GitHub token. It's
> recommended that the token has the `repo.public_repo` scope.

```jsx
import { ReleaseCard } from '@site/src/components/elements/ReleaseCard';
import { Octokit } from 'octokit';
import React, { useEffect, useState } from 'react';

const fetchLatestRelease = async (octokit, { owner, repo }) => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/releases/latest',
    {
      owner,
      repo,
    },
  );

  return data;
};

export default function Demo() {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    const octokit = new Octokit({
      auth: '<YOUR_GITHUB_TOKEN>',
    });

    fetchLatestRelease(octokit, {
      owner: 'facebook',
      repo: 'docusaurus',
    }).then((data) => {
      setRelease(data);
    });
  }, []);

  return release && <ReleaseCard release={release} />;
}
```

#### Import

```jsx
import { ReleaseCard } from '@site/src/components/elements/ReleaseCard';
```

#### Props

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>release</td>
    <td>object (<a href="https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-a-release">Schema</a>)</td>
    <td></td>
    <td>The GitHub release data.</td>
  </tr>
  <tr>
    <td>latest</td>
    <td>boolean</td>
    <td>false</td>
    <td>If <code>true</code>, display this release as <code>latest</code> by adding a "Latest" badge. If the release is <code>pre-release</code>, the card will add a "Pre-release" badge, ignore the <code>latest</code> prop. This should be set by comparing with the <a href="https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release">latest release data</a>.</td>
  </tr>
</tbody>
</table>

### ReleaseList

[⬆️ Back to top](#table-of-contents)

> **Note**: This required user to set an environment variable `GH_TOKEN` with a
> GitHub token in the `.env` file.

ReleaseList component for displaying a list of GitHub releases. Releases can be
filtered by date range, with the `from` and `to` props; If not provided, the
component will fetch all releases.

**Warning**: `from` props must be before `to` props. If `from` is after `to`,
the component will throw an error.

#### Demo

```jsx
import { ReleaseList } from '@site/src/components/modules/Release';
import React from 'react';

export default function Demo() {
  return (
    <ReleaseList
      owner="facebook"
      repo="docusaurus"
      from="09-03-2021"
      to="03-01-2022"
    />
  );
}
```

#### Import

```jsx
import { ReleaseList } from '@site/src/components/modules/Release/ReleaseList';
// or
import { ReleaseList } from '@site/src/components/modules/Release';
```

#### Props

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>owner</td>
    <td>string</td>
    <td></td>
    <td>The account owner of the repository. The name is not case sensitive.</td>
  </tr>
  <tr>
    <td>repo</td>
    <td>string</td>
    <td></td>
    <td>The name of the repository. The name is not case sensitive.</td>
  </tr>
  <tr>
    <td>from</td>
    <td>string | Moment</td>
    <td></td>
    <td>Start date of the time range. Format: <code>MM-DD-YYYY</code>. This will be <a href="https://momentjs.com/docs/#/parsing/">parsed</a> into Moment Object.</td>
  </tr>
  <tr>
    <td>to</td>
    <td>string | Moment</td>
    <td></td>
    <td>End date of the time range. Format: <code>MM-DD-YYYY</code>. This will be <a href="https://momentjs.com/docs/#/parsing/">parsed</a> into Moment Object.</td>
  </tr>
</tbody>
</table>

### ReleaseDropdown

[⬆️ Back to top](#table-of-contents)

> **Note**: This required user to set an environment variable `GH_TOKEN` with a
> GitHub token in the `.env` file.

ReleaseDropdown component for displaying a list of GitHub releases in a
dropdown. This is a wrapper around the `ReleaseList` component, using Docusaurus
`Details` component.

#### Demo

```jsx
import { ReleaseDropdown } from '@site/src/components/modules/Release';
import React from 'react';

export default function Demo() {
  return (
    <ReleaseDropdown
      owner="facebook"
      repo="docusaurus"
      from="09-03-2021"
      to="03-01-2022"
    />
  );
}
```

#### Import

```jsx
import { ReleaseDropdown } from '@site/src/components/modules/Release/ReleaseDropdown';
// or
import { ReleaseDropdown } from '@site/src/components/modules/Release';
```

#### Props

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>owner</td>
    <td>string</td>
    <td></td>
    <td>The account owner of the repository. The name is not case sensitive.</td>
  </tr>
  <tr>
    <td>repo</td>
    <td>string</td>
    <td></td>
    <td>The name of the repository. The name is not case sensitive.</td>
  </tr>
  <tr>
    <td>from</td>
    <td>string | Moment</td>
    <td></td>
    <td>Start date of the time range. Format: <code>MM-DD-YYYY</code>. This will be <a href="https://momentjs.com/docs/#/parsing/">parsed</a> into Moment Object.</td>
  </tr>
  <tr>
    <td>to</td>
    <td>string | Moment</td>
    <td></td>
    <td>End date of the time range. Format: <code>MM-DD-YYYY</code>. This will be <a href="https://momentjs.com/docs/#/parsing/">parsed</a> into Moment Object.</td>
  </tr>
</tbody>
</table>

### VideoPlayer

[⬆️ Back to top](#table-of-contents)

This component is a wrapper around the `react-player` component. It is used to
play videos from YouTube, Vimeo, Twitch, SoundCloud, Streamable, Wistia,
Facebook, and DailyMotion.

This component is created for remark plugin, to map the `iframe` element to this
component. So if you want to embed video in your markdown (`.mdx`) or component,
you can use directly the `ReactPlayer` component instead.

#### Demo

```jsx
import { VideoPlayer } from '@site/src/components/elements/VideoPlayer';
import React from 'react';

export default function Demo() {
  return <VideoPlayer src="https://youtu.be/IHNzOHi8sJs" />;
}
```

#### Import

```jsx
import { VideoPlayer } from '@site/src/components/elements/VideoPlayer';
```

#### Props

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>src</td>
    <td>string</td>
    <td></td>
    <td>The url of a video or song to play. Can be an <a href="https://github.com/CookPete/react-player#multiple-sources-and-tracks">array</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaStream">MediaStream</a> object.</td>
  </tr>
</tbody>
</table>

For other props, please refer to the
[react-player](https://github.com/CookPete/react-player#props).

### PDFViewer

[⬆️ Back to top](#table-of-contents)

This component is used to display a PDF file using [Adobe Embed
API](https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/),
with different embed modes:

<table>
<thead>
  <tr>
    <th>Embed Mode</th>
    <th>Description</th>
    <th>Example</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Full window (default mode)</td>
    <td>Renders the PDF viewer into the full height and width of the parent element. Best suited for storage and productivity applications.</td>
    <td><img src="https://developer.adobe.com/document-services/docs/static/38e444fffa8fc0f335e8464d4ee70420/f1bd9/embedfull.webp" alt="full_window" height="50px" /></td>
  </tr>
  <tr>
    <td>Sized container</td>
    <td>The sized container mode displays PDFs in a boxed container with landscape orientation. Best suited for presentations.</td>
    <td><img src="https://developer.adobe.com/document-services/docs/static/38e444fffa8fc0f335e8464d4ee70420/f1bd9/embedfull.webp" alt="sized_container" height="50px" /></td>
  </tr>
  <tr>
    <td>In-Line</td>
    <td>All PDF pages rendered in line within a web page. Best suited for reading applications.</td>
    <td><img src="https://developer.adobe.com/document-services/docs/static/9e248d1adb940e7f8f9c14dab8023415/f1bd9/embedinline.webp" alt="in_line" height="50px" /></td>
  </tr>
  <tr>
    <td>Lightbox</td>
    <td>Displays PDFs in a focused view. Best suited for content websites, content portals, and email.</td>
    <td><img src="https://developer.adobe.com/document-services/docs/static/3b9567cd27b371b4fbeecf5b2c17648a/c28f2/lightbox.webp" alt="lightbox" height="50px" /></td>
  </tr>
</tbody>
</table>

#### Demo

Basic usage:

```jsx
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PDFViewer } from '@site/src/components/elements/PDFViewer';
// Import sample PDF from static/pdf folder
import sample from '@site/static/pdf/sample.pdf';
import React from 'react';

export default function Demo() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <div style={{ height: '100vh' }}>
      {/* From URL */}
      <PDFViewer
        url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
        title="Bodea Brochure"
        clientId={customFields.clientId}
      />
      {/* From import */}
      <PDFViewer
        url={sample}
        title="Sample PDF"
        clientId={customFields.clientId}
      />
      {/* From static URL */}
      <PDFViewer
        url="/pdf/sample.pdf"
        title="Sample PDF"
        clientId={customFields.clientId}
      />
    </div>
  );
}
```

With `container` and `fallback` props:

```jsx
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PDFViewer } from '@site/src/components/elements/PDFViewer';
import ErrorPageContent from '@theme/ErrorPageContent';

import React, { useEffect } from 'react';

const Handler = ({ divId, isReady, preview }) => {
  useEffect(() => {
    if (isReady) {
      preview();
    }
  }, [isReady]);

  return <div id={divId} style={{ height: '100vh' }}></div>;
};

export default function Demo() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <PDFViewer
      url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
      container={(props) => <Handler {...props} />}
      clientId={customFields.clientId}
      fallback={({ error }) => <ErrorPageContent error={error} />}
    />
  );
}
```

> **Warning**: Errors can only be caught in the `container` and `fallback`
> function, so if your returned component (e.g., the component `Handler` or
> `ErrorPageContent` in this demo) throw an error, it will crash the whole page
> (internally caught by `ErrorPageContent`).

#### Import

```jsx
import { PDFViewer } from '@site/src/components/elements/PDFViewer';
// or
import { PDFViewer } from '@site/src/components/elements/PDFViewer/PDFViewer';
```

#### Props

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>url</td>
    <td>string</td>
    <td></td>
    <td>The URL of the PDF file. This can be an external URL, static URL (string or via imported).</td>
  </tr>
  <tr>
    <td>title</td>
    <td>string</td>
    <td></td>
    <td>The title of the PDF file.</td>
  </tr>
  <tr>
    <td>clientId</td>
    <td>string</td>
    <td></td>
    <td>Client ID to use Adobe Embed API with your domain. Checkout the <a href="https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/">document</a> or <a href="https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api">generate new one</a>.</td>
  </tr>
  <tr>
    <td>embedMode</td>
    <td>"FULL_WINDOW" | "SIZED_CONTAINER" | "IN_LINE" | "LIGHT_BOX"</td>
    <td>"FULL_WINDOW"</td>
    <td>Supported embed modes of PDF Embed API.</td>
  </tr>
  <tr>
    <td>detectFileName</td>
    <td>boolean</td>
    <td>false</td>
    <td>If <code>true</code>, the title of the PDF file is extracted from the URL (usually at the end).</td>
  </tr>
  <tr>
    <td>fallback (optional)</td>
    <td>

( props: { error: Error } ) => React.ReactNode

</td>
    <td></td>
    <td><strong>Function</strong> to render fallback component when error occurred or not supported</td>
  </tr>
  <tr>
    <td>container (optional)</td>
    <td>

( props: { divId: string; isReady: boolean; preview: () => void; } ) =>
React.ReactNode

</td>
    <td></td>
    <td><strong>Function</strong> to render the viewer to.
      <ul>
        <li><code>container</code>: The container MUST set <code>id</code> to <code>divId</code>.
        <blockquote><strong>Note</strong>: The height and width of the container will be automatically set by the script via inline styles; and other properties via classes.</blockquote>
        </li>
        <li><code>isReady</code>: If <code>true</code>, the required scripts to render viewer is ready.</li>
        <li><code>preview</code>: Start to render the viewer. This should be called <strong>after</strong> all scripts is fully loaded.</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>

---

When no `fallback` prop is provided, the component will render a simple `iframe`
element to display the PDF file. For example:

```jsx
<iframe
  title={title}
  src={url}
  style={{ height: '100%', width: '100%', display: 'block' }}
></iframe>
```

The same for `container` prop. If no `container` prop is provided, the viewer
will be rendered to a `div` element:

```jsx
<div id={divId} style={{ height: '100%', width: '100%' }} />
```

### PDFViewerButton

[⬆️ Back to top](#table-of-contents)

This component is a wrapper of `PDFViewer` to render a button to open the PDF
file, with the `embedMode` prop set to `LIGHT_BOX`. The button is **disabled**
if the PDF file is not fully loaded.

#### Demo

```jsx
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PDFViewerButton } from '@site/src/components/elements/PDFViewer';
import React from 'react';

export default function Demo() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PDFViewerButton
        clientId={customFields.clientId}
        url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
        title="Bodea Brochure"
      />
    </div>
  );
}
```

#### Import

```jsx
import { PDFViewerButton } from '@site/src/components/elements/PDFViewer';
// or
import { PDFViewerButton } from '@site/src/components/elements/PDFViewer/PDFViewerButton';
```

#### Props

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>url</td>
    <td>string</td>
    <td></td>
    <td>The URL of the PDF file. This can be an external URL, static URL (string or via imported).</td>
  </tr>
  <tr>
    <td>title</td>
    <td>string</td>
    <td></td>
    <td>The title of the PDF file.</td>
  </tr>
  <tr>
    <td>clientId</td>
    <td>string</td>
    <td></td>
    <td>Client ID to use Adobe Embed API with your domain. Checkout the <a href="https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/">document</a> or <a href="https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api">generate new one</a>.</td>
  </tr>
  <tr>
    <td>detectFileName</td>
    <td>boolean</td>
    <td>false</td>
    <td>If <code>true</code>, the title of the PDF file is extracted from the URL (usually at the end).</td>
  </tr>
  <tr>
    <td>fallback (optional)</td>
    <td>

( props: { error: Error } ) => React.ReactNode

</td>
    <td></td>
    <td><strong>Function</strong> to render fallback component when error occurred or not supported</td>
  </tr>
  <tr>
    <td>container (optional)</td>
    <td>

( props: { divId: string; isReady: boolean; preview: () => void; } ) =>
React.ReactNode

</td>
    <td></td>
    <td><strong>Function</strong> to render the viewer to.
      <ul>
        <li><code>container</code>: The container MUST set <code>id</code> to <code>divId</code>.
        <blockquote><strong>Note</strong>: The height and width of the container will be automatically set by the script via inline styles; and other properties via classes.</blockquote>
        </li>
        <li><code>isReady</code>: If <code>true</code>, the required scripts to render viewer is ready.</li>
        <li><code>preview</code>: Start to render the viewer. This should be called <strong>after</strong> all scripts is fully loaded.</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>

## Hooks

### useReleaseByTimeRange

[⬆️ Back to top](#table-of-contents)

Fetch GitHub releases by time range.

#### Dependencies

```bash
pnpm add octokit @tanstack/react-query moment
```

#### Demo

```jsx
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useReleaseByTimeRange } from '@site/src/hooks/useReleaseByTimeRange';
import { Octokit } from 'octokit';
import React from 'react';

export default function Demo() {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const octokit = new Octokit({ auth: customFields.ghToken });

  const { releases, isFetching, refetch } = useReleaseByTimeRange(
    octokit,
    { owner: 'facebook', repo: 'docusaurus', perPage: 100 },
    '09-03-2021',
    '03-01-2022',
  );

  return (
    <>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>
        {releases?.map((release, index) => {
          return <p key={index}>{release.tag_name}</p>;
        })}
      </ul>
      {isFetching && <div>Loading...</div>}
    </>
  );
}
```

#### Import

```jsx
import { useReleaseByTimeRange } from '@site/src/hooks/useReleaseByTimeRange';
```

#### API Reference

```jsx
const { releases, isFetching, refetch } = useReleaseByTimeRange(
  octokit,
  query,
  from,
  to,
);
```

**Options**

- `octokit: Octokit`:
  - **Required**.
  - The Octokit instance to request GitHub API.
  - See more at
    [octokit/core.js](https://github.com/octokit/core.js#options).
- `query: { owner: string; repo: string; page: number; perPage: number; }`:

  - **Required**.
  - The queries & parameters to request GitHub releases:

    - `owner`: The account owner of the repository. The name is not case
      sensitive.
    - `repo`: The name of the repository. The name is not case sensitive.
    - `page`: The page number of the results to fetch.
    - `perPage`: The number of results per page (max 100).

  - See more at [List
    releases](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases).

- `from: string | Moment`:

  - optional.
  - The start date of the time range. It can be a **string** or a **Moment** object.
    Format: `MM-DD-YYYY`.
  - `from` time MUST be before `to` time.

- `to: string | Moment`:

  - optional.
  - The end date of the time range. It can be a **string** or a **Moment** object.
    Format: `MM-DD-YYYY`.
  - `to` time MUST be after `from` time.

**Returns**

- `releases: unknown[]`:

  - List of releases within time range (if `from` or `to` arguments are
    provided), or all releases.
  - See response
    [Schema](https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#list-releases).

- `isFetching: boolean`:

  - `true` if the request is in progress.

  - Read more at
    [useQuery](https://tanstack.com/query/v4/docs/react/reference/useQuery).

- `refetch: (options: { throwOnError: boolean, cancelRefetch: boolean }) =>
Promise<UseQueryResult>`:

  - A function to manually refetch the query.
  - If the query errors, the error will only be logged. If you want an error to
    be thrown, pass the `throwOnError: true` option.
  - `cancelRefetch?: boolean`

    - Defaults to `true`

      - Per default, a currently running request will be cancelled before a new request is made

    - When set to false, no refetch will be made if there is already a request running.

  - Read more at
    [useQuery](https://tanstack.com/query/v4/docs/react/reference/useQuery).

## Plugins

### plugin-dynamic-route

[⬆️ Back to top](#table-of-contents)

This plugin is used to generate dynamic routes for pages.

> **Note**: There is a know issue that in production build, the generated routes
> are not render immediately. Instead, it will render Not Found page first, then
> it render the correct page. This issue is not found in development build.

#### Dependencies

> **Warning**: `react-router-dom v6` is not mentioned to be compatible with
> Docusaurus v2 yet. So, please use `react-router-dom v5` instead.

```bash
pnpm add react-router-dom@5.3.4
```

By default, Docusaurus
[exports](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus/src/client/exports/router.ts)
only `useHistory`, `useLocation`, `Redirect` and `matchPath` from
`react-router-dom`. To use `Route` and `Switch`, you need to install
`react-router-dom` manually.

#### Demo

```js
// docusaurus.config.js
const config = {
  plugins: [
    [
      './src/plugins/plugin-dynamic-route/index.js',
      {
        routes: [
          {
            // using Route schema from react-router
            path: '/releases',
            exact: false, // this is needed for sub-routes to match!
            component: '@site/src/components/layouts/ReleaseLayout/index.jsx',
          },
          {
            // using Route schema from react-router
            path: '/pdf-viewer',
            exact: false, // this is needed for sub-routes to match!
            component: '@site/src/components/layouts/PDFViewerLayout/index.jsx',
          },
        ],
      },
    ],
  ],
};

module.exports = config;
```

```jsx
// src/components/layouts/ReleaseLayout/index.jsx
import { ReleasePage } from '@site/src/pages/_releases/index';
import { ViewRelease } from '@site/src/pages/_releases/view';
import Layout from '@theme/Layout';
import NotFound from '@theme/NotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function ReleaseLayout() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/view/:owner/:repo`} exact>
        <Layout title="Releases">
          <ViewRelease />
        </Layout>
      </Route>

      <Route path={match.path} exact>
        <Layout title="Releases">
          <ReleasePage />
        </Layout>
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default ReleaseLayout;
```

#### Configuration

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>routes</td>
    <td><a href="https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#addRoute">RouteConfig[]</a></td>
    <td></td>
    <td>List of routes to add to the website.</td>
  </tr>
</tbody>
</table>

### plugin-windicss

[⬆️ Back to top](#table-of-contents)

This plugin is used to add WindiCSS support to Docusaurus v2.

#### Dependencies

```bash
pnpm add -D windicss windicss-webpack-plugin
```

#### Demo

```js
// docusaurus.config.js
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');

const config = {
  plugins: [
    function windicssPlugin() {
      return {
        name: 'plugin-windicss',
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

### plugin-cursor-effects

[⬆️ Back to top](#table-of-contents)

This plugin is used to add cool cursor effects from
[tholman/cursor-effects](https://github.com/tholman/cursor-effects) to the
website.

#### Demo

```js
// docusaurus.config.js
const config = {
  plugins: [
    [
      './src/plugins/plugin-cursor-effects/index.js',
      {
        cursorType: 'rainbowCursor',
        opts: { length: 3, colors: ['red', 'blue'], size: 4 },
      },
    ],
  ],
};
```

#### Configuration

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>cursorType</td>
    <td>
    "bubbleCursor" | "clockCursor" | <br />
    "emojiCursor" | "fairyDustCursor" | <br />
    "followingDotCursor" | "ghostCursor" | <br />
    "rainbowCursor" | "snowflakeCursor" | <br />
    "springyEmojiCursor" | "textFlag" | <br />
    "trailingCursor"</td>
    <td>"rainbowCursor"</td>
    <td>Cursor effect type.</td>
  </tr>
  <tr>
    <td>opts</td>
    <td>object</td>
    <td></td>
    <td>Options to pass to cursor constructor. See the <a href="https://github.com/tholman/cursor-effects#specific-customization">documentation</a></td>
  </tr>
</tbody>
</table>

## Remark Plugins

### remark-url-to-iframe

[⬆️ Back to top](#table-of-contents)

This plugin is used to transform URL (**with patterns**) links (e.g.:
`[hyperlink](some-url)`) or URL plain texts to `iframe` elements.

Currently, the plugin only searches for `http` or `https` links in your files.

> **Note**: There is a known issue that the plugin will cause build error
> because the plugin using "dynamic import"
> ([`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import))
> to import the ES module `unist-util-visit` in the CJS module.
>
> To fix this issue, you need to add `sourceType: 'unambiguous',` in the
> `babel.config.js` file ([Ref](https://stackoverflow.com/a/56283408/12512981)):
>
> ```js
> // babel.config.js
> module.exports = {
>   // ...
>   sourceType: 'unambiguous',
> };
> ```

#### Dependencies

```bash
pnpm add unist-util-visit joi
```

#### Demo

Basic usage:

```js
// docusaurus.config.js
const transformURL = require('./src/remark/transformURL');

const config = {
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [
            [
              transformURL,
              {
                patterns: ['youtube.com'],
                iframeAttrs: {
                  // NOTE: Set data-type-iframe to 'pdf' to be able to differentiate
                  // between pdf file and normal iframe
                  'data-type-iframe': 'video',
                  width: '100%',
                  height: '100%',
                  style: 'aspect-ratio: 16/9',
                  title: 'Video player',
                },
              },
            ],
          ],
        },
      }),
    ],
  ],
};

module.exports = config;
```

Input:

```md
https://www.youtube.com/watch?v=IHNzOHi8sJs

<!-- or -->

[video](https://www.youtube.com/watch?v=IHNzOHi8sJs)
```

Output:

```html
<iframe
  src="https://www.youtube.com/watch?v=IHNzOHi8sJs"
  data-type-iframe="video"
  width="100%"
  height="100%"
  style="aspect-ratio: 16/9"
  title="Video player"
></iframe>
```

#### Import

```js
// In .docusaurus.config.js
const transformURL = require('./src/remark/transformURL');
// or
// In component
import transformURL from '@site/src/remark/transformURL';
```

#### Configuration

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>patterns</td>
    <td>string[] | RegExp[]</td>
    <td></td>
    <td>Patterns to match the URL, can be a string or a regular expression. These patterns will be used to create a new <code>RegExp</code> object.</td>
  </tr>
  <tr>
    <td>iframeAttrs</td>
    <td>Record&lt;string, string | number | boolean&gt;</td>
    <td></td>
    <td>Attributes to add to the <code>iframe</code> element. Boolean attributes with value <code>true</code> will be added as <code>attribute</code> instead of <code>attribute="true"</code>.</td>
  </tr>
</tbody>
</table>

### remark-transform-video

[⬆️ Back to top](#table-of-contents)

This plugin uses `remark-url-to-iframe` plugin to transform URL (**with
patterns**) links (e.g.: `[hyperlink](some-url)`) or URL plain texts to `iframe`
elements.

This plugin passes some default options to `remark-url-to-iframe` plugin, you
can override them with your own options.

After the transformation, the `iframe` element can be **registered to the global
scope** to map to the component `VideoPlayer` so whenever the `iframe`
element has attribute `data-type-iframe=video` in `MDX` file, it will be
rendered as `VideoPlayer` component.

#### Dependencies

```bash
pnpm add unist-util-visit joi
```

#### Demo

Basic usage:

```js
// docusaurus.config.js
const transformVideo = require('./src/remark/transformVideo');

const config = {
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [
            [transformVideo, { patterns: ['youtube.com'] }],
          ],
        },
      }),
    ],
  ],
};

module.exports = config;
```

Input:

```md
https://www.youtube.com/watch?v=IHNzOHi8sJs

<!-- or -->

[video](https://www.youtube.com/watch?v=IHNzOHi8sJs)
```

Output:

```html
<iframe
  src="https://www.youtube.com/watch?v=IHNzOHi8sJs"
  data-type-iframe="video"
  width="100%"
  height="100%"
  style="aspect-ratio: 16/9"
  title="Video player"
></iframe>
```

<details>
<summary>Advanced usage:</summary>

This is internal process to parse response body of the GitHub release data in
the component `ReleaseCard`:

- First add plugin to file `docusaurus.config.js`:

```js
// docusaurus.config.js
const transformVideo = require('./src/remark/transformVideo');

const config = {
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [
            [transformVideo, { patterns: ['youtube.com'] }],
          ],
        },
      }),
    ],
  ],
};

module.exports = config;
```

- Map the `iframe` element to the component `VideoPlayer` by "swizzling" the
  `MDXComponents` file:

```jsx
// src/theme/MDXComponents.jsx
import { VideoPlayer } from '@site/src/components/elements/VideoPlayer';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import React from 'react';

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

- Manually parsed Markdown content with
  [`evaluate`](https://mdxjs.com/packages/mdx/#evaluatefile-options) function:

  - This requires `@mdx-js/mdx`, `@mdx-js/react` and `rehype-raw` packages:

    ```bash
    pnpm add @mdx-js/mdx @mdx-js/react@1.6.22 rehype-raw
    ```

    > **Note**: Currently, Docusaurus v2 is [currently
    > working](https://github.com/facebook/docusaurus/pull/8288) on migrating
    > to`@mdx-js/react v2`.

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

```jsx
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

  const [parsed, setParsed] = useState();

  useEffect(() => {
    const evaluateBody = async () => {
      const { default: BodyContent } = await evaluate(body, {
        ...runtime,
        remarkPlugins: [transformVideo],
        // Ref: https://github.com/atomiks/rehype-pretty-code/issues/6#issuecomment-1006220771
        rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
        useMDXComponents: () => components,
      });

      setParsed(<BodyContent />);
    };

    evaluateBody();
  }, [body]);

  return parsed;
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

Read more:

- [MDX component
  scope](https://docusaurus.io/docs/markdown-features/react#mdx-component-scope).
- [MDXProvider](https://mdxjs.com/packages/react/#mdxproviderprops).

</details>

#### Import

```js
// In .docusaurus.config.js
const transformVideo = require('./src/remark/transformVideo');
// or
// In component
import transformVideo from '@site/src/remark/transformVideo';
```

#### Configuration

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>patterns</td>
    <td>string[] | RegExp[]</td>
    <td>

```js
[
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
```

</td>
    <td>Patterns to match the URL, can be a string or a regular expression. These patterns will be used to create a new <code>RegExp</code> object.</td>
  </tr>
  <tr>
    <td>iframeAttrs</td>
    <td>Record&lt;string, string | number | boolean&gt;</td>
    <td>

```js
{
  'data-type-iframe': 'video',
  width: '100%',
  height: '100%',
  style: 'aspect-ratio: 16/9;',
  title: 'Video player',
  frameborder: 0,
  allow:
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  allowfullscreen: true,
}
```

</td>
   <td>Attributes to add to the <code>iframe</code> element. Boolean attributes with value <code>true</code> will be added as <code>attribute</code> instead of <code>attribute="true"</code>.</td>
  </tr>
</tbody>
</table>

### remark-transform-pdf

[⬆️ Back to top](#table-of-contents)

This plugin uses `remark-url-to-iframe` plugin to transform URL (**with
patterns**) links (e.g.: `[hyperlink](some-url)`) or URL plain texts to `iframe`
elements.

This plugin passes some default options to `remark-url-to-iframe` plugin, you
can override them with your own options.

After the transformation, the `iframe` element can be **registered to the global
scope** to map to the component `PDFViewer` so whenever the `iframe` element has
attribute `data-type-iframe=pdf` in `MDX` file, it will be rendered as
`PDFViewer` component.

#### Dependencies

```bash
pnpm add unist-util-visit joi
```

#### Demo

Basic usage:

```js
// docusaurus.config.js
const transformPDF = require('./src/remark/transformPDF');

const config = {
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [[transformPDF, { patterns: ['.pdf'] }]],
        },
      }),
    ],
  ],
};

module.exports = config;
```

Input:

```md
https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf

<!-- or -->

[pdf](https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf)
```

Output:

```html
<iframe
  src="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
  data-type-iframe="pdf"
  width="100%"
  height="100%"
  style="aspect-ratio: 1/1"
  title="PDF file"
></iframe>
```

#### Import

```js
// In .docusaurus.config.js
const transformPDF = require('./src/remark/transformPDF');
// or
// In component
import transformPDF from '@site/src/remark/transformPDF';
```

#### Configuration

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>patterns</td>
    <td>string[] | RegExp[]</td>
    <td>

```js
['\\.pdf$'];
```

</td>
    <td>Patterns to match the URL, can be a string or a regular expression. These patterns will be used to create a new <code>RegExp</code> object.</td>
  </tr>
  <tr>
    <td>iframeAttrs</td>
    <td>Record&lt;string, string | number | boolean&gt;</td>
    <td>

```js
{
  'data-type-iframe': 'pdf',
  width: '100%',
  height: '100%',
  style: 'aspect-ratio: 1/1',
  title: 'PDF file',
}
```

</td>
   <td>Attributes to add to the <code>iframe</code> element. Boolean attributes with value <code>true</code> will be added as <code>attribute</code> instead of <code>attribute="true"</code>.</td>
  </tr>
</tbody>
</table>

### remark-transform-emoji

[⬆️ Back to top](#table-of-contents)

This is a wrapper for plugin
[`remark-emoji`](https://github.com/rhysd/remark-emoji) to transform emoji codes
to emoji because the package doesn't support CommonJS module.

#### Dependencies

```bash
pnpm add remark-emoji
```

#### Demo

```js
// docusaurus.config.js
const transformEmoji = require('./src/remark/transformEmoji');

const config = {
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          beforeDefaultRemarkPlugins: [[transformEmoji, { emoticon: true }]],
        },
      }),
    ],
  ],
};

module.exports = config;
```

#### Import

```js
// In .docusaurus.config.js
const transformEmoji = require('./src/remark/transformEmoji');
// or
// In component
import transformEmoji from '@site/src/remark/transformEmoji';
```

#### Configuration

<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>padSpaceAfter</td>
    <td>boolean</td>
    <td>false</td>
    <td>Setting to <code>true</code> means that an extra whitespace is added after emoji. This is useful when browser handle emojis with half character length and following character is hidden.</td>
  </tr>
  <tr>
    <td>emoticon</td>
    <td>boolean</td>
    <td>false</td>
   <td>Setting to <code>true</code> means that <a href="https://www.npmjs.com/package/emoticon">emoticon</a> shortcodes are supported (e.g. :-) will be replaced by 😃).</td>
  </tr>
</tbody>
</table>

See more at [remark-emoji](https://github.com/rhysd/remark-emoji).
