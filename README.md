<div align="center">

  <img src="https://user-images.githubusercontent.com/64480713/209274246-69141878-b6b2-433f-851f-b4764c9bd643.svg" alt="logo" width="200" height="auto" />
  <h1>The Company Docs</h1>

  <p>
    The Company documentation
  </p>

<!-- Badges -->
<p>
  <a href="https://github.com/the-company-tcus/docs/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/the-company-tcus/docs" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/the-company-tcus/docs" alt="last update" />
  </a>
  <a href="https://github.com/the-company-tcus/docs/network/members">
    <img src="https://img.shields.io/github/forks/the-company-tcus/docs" alt="forks" />
  </a>
  <a href="https://github.com/the-company-tcus/docs/stargazers">
    <img src="https://img.shields.io/github/stars/the-company-tcus/docs" alt="stars" />
  </a>
  <a href="https://github.com/the-company-tcus/docs/issues/">
    <img src="https://img.shields.io/github/issues/the-company-tcus/docs" alt="open issues" />
  </a>
  <a href="https://github.com/the-company-tcus/docs/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/the-company-tcus/docs.svg" alt="license" />
  </a>
</p>

<h4>
    <a href="https://github.com/the-company-tcus/docs/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/the-company-tcus/docs">Documentation</a>
  <span> · </span>
    <a href="https://github.com/the-company-tcus/docs/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/the-company-tcus/docs/issues/">Request Feature</a>
  </h4>
</div>

<br />

<!-- Table of Contents -->

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Tech Stack](#space_invader-tech-stack)
  - [Features](#dart-features)
  - [Color Reference](#art-color-reference)
  - [Environment Variables](#key-environment-variables)
- [Getting Started](#toolbox-getting-started)
  - [Prerequisites](#bangbang-prerequisites)
  - [Run Locally](#running-run-locally)
  - [Deployment](#triangular_flag_on_post-deployment)
- [Usage](#eyes-usage)
  - [Components](#package-components)
- [Roadmap](#compass-roadmap)
- [Contact](#handshake-contact)
- [Acknowledgements](#gem-acknowledgements)

<!-- About the Project -->

## :star2: About the Project

[Docusaurus](https://docusaurus.io/) is a modern static website generator that
helps you maintain open source documentation websites. We use Docusaurus to
showcase our team documentation and update project progress.

<!-- Screenshots -->

### :camera: Screenshots

- Home page:

<div align="center">
  <img src="https://user-images.githubusercontent.com/64480713/210539148-70cf8981-7891-456a-beac-16ae1eb499a4.png" alt="screenshot" />
</div>

- Release viewer:

<div align="center">
  <img src="https://user-images.githubusercontent.com/64480713/210564500-5f9463df-041e-4b51-8d1d-3fb789e8740d.png" alt="screenshot" />
</div>

Demo: https://the-company-tcus.netlify.app/releases/view/nocodb/nocodb?from=11-30-2022&to=01-04-2023

- PDF viewer:

<div align="center">
  <img src="https://user-images.githubusercontent.com/64480713/210540121-2b8a89d9-f600-431b-9a3b-b199fb6e0239.png" alt="screenshot" />
</div>

Demo: https://the-company-tcus.netlify.app/pdf-viewer?url=https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf&title=Bodea%20Brochure&embedMode=FULL_WINDOW

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://windicss.org/">WindiCSS</a></li>
    <li><a href="https://tanstack.com/query/v4">TanStack Query</a></li>
    <li><a href="https://v5.reactrouter.com/">React Router v5</a></li>
    <li><a href="https://docusaurus.io/">Docusaurus v2</a></li>
    <li><a href="https://mantine.dev/">Mantine</a></li>

  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://docusaurus.io/">Docusaurus v2</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- PDF viewer.
- GitHub release viewer.
- Dynamic routes (pdf viewer, release viewer).
- Custom navbar (cursor-effect button).

<!-- Color Reference -->

### :art: Color Reference

> These colors are defined in the `src/css/custom.css` file when bootstrapping a
> new project.

- **Light theme**:

| Color                               | Hex                                                                      | CSS variable                          | WindiCSS utility (custom)\* |
| ----------------------------------- | ------------------------------------------------------------------------ | ------------------------------------- | --------------------------- |
| primary                             | ![#2E8555](https://placehold.jp/2E8555/2E8555/10x10.png) #2E8555         | --ifm-color-primary                   | primary                     |
| primary dark                        | ![#29784C](https://placehold.jp/29784C/29784C/10x10.png) #29784C         | --ifm-color-primary-dark              | primary-dark                |
| primary darker                      | ![#277148](https://placehold.jp/277148/277148/10x10.png) #277148         | --ifm-color-primary-darker            | primary-darker              |
| primary darkest                     | ![#205D3B](https://placehold.jp/205D3B/205D3B/10x10.png) #205D3B         | --ifm-color-primary-darkest           | primary-darkest             |
| primary light                       | ![#33925D](https://placehold.jp/33925D/33925D/10x10.png) #33925D         | --ifm-color-primary-light             | primary-light               |
| primary lighter                     | ![#359962](https://placehold.jp/359962/359962/10x10.png) #359962         | --ifm-color-primary-lighter           | primary-lighter             |
| primary lightest                    | ![#3CAD6E](https://placehold.jp/3CAD6E/3CAD6E/10x10.png) #3CAD6E         | --ifm-color-primary-lightest          | primary-lightest            |
| docusaurus-highlighted-code-line-bg | ![#0000001A](https://placehold.jp/0000001A/0000001A/10x10.png) #0000001A | --docusaurus-highlighted-code-line-bg | Not set                     |

- **Dark theme**:

| Color                               | Hex                                                                      | CSS variable (\[data-theme='dark'\])\*\* | WindiCSS utility (custom)\* |
| ----------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- | --------------------------- |
| primary                             | ![#25C2A0](https://placehold.jp/25C2A0/25C2A0/10x10.png) #25C2A0         | --ifm-color-primary                      | dark-primary                |
| primary dark                        | ![#21AF90](https://placehold.jp/21AF90/21AF90/10x10.png) #21AF90         | --ifm-color-primary-dark                 | dark-primary-dark           |
| primary darker                      | ![#1FA588](https://placehold.jp/1FA588/1FA588/10x10.png) #1FA588         | --ifm-color-primary-darker               | dark-primary-darker         |
| primary darkest                     | ![#1A8870](https://placehold.jp/1A8870/1A8870/10x10.png) #1A8870         | --ifm-color-primary-darkest              | dark-primary-darkest        |
| primary light                       | ![#29D5B0](https://placehold.jp/29D5B0/29D5B0/10x10.png) #29D5B0         | --ifm-color-primary-light                | dark-primary-light          |
| primary lighter                     | ![#32D8B4](https://placehold.jp/32D8B4/32D8B4/10x10.png) #32D8B4         | --ifm-color-primary-lighter              | dark-primary-lighter        |
| primary lightest                    | ![#4FDDBF](https://placehold.jp/4FDDBF/4FDDBF/10x10.png) #4FDDBF         | --ifm-color-primary-lightest             | dark-primary-lightest       |
| docusaurus-highlighted-code-line-bg | ![#0000004D](https://placehold.jp/0000004D/0000004D/10x10.png) #0000004D | --docusaurus-highlighted-code-line-bg    | Not set                     |

\*: These are not default WindiCSS utilities. It is defined in `windi.config.js`.
See example configuration below.

\*\*: These variables applies to selector `[data-theme='dark']` only.

- WindiCSS colors:

You can style your components with WindiCSS colors. See color reference at
[WindiCSS color utility](https://windicss.org/utilities/general/colors.html).

---

<details>
<summary>Configure WindiCSS colors</summary>

```js
// windi.config.js
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

</details>

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to
your `.env` file:

- **App configs:**

  `GH_TOKEN`: GitHub personal access token to fetch data from GitHub API.

E.g:

```
# .env
GH_TOKEN=ghp_HH8T***
```

You can also check out the file `.env.example` to see all required environment
variables.

<!-- Getting Started -->

## :toolbox: Getting Started

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses [pnpm](https://pnpm.io/) as package manager:

```bash
npm install --global pnpm
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project:

```bash
git clone https://github.com/the-company-tcus/docs.git
```

Go to the project directory:

```bash
cd docs
```

Install dependencies:

```bash
pnpm install
```

Start the server:

```bash
pnpm start
```

<!-- Deployment -->

### :triangular_flag_on_post: Deployment

### Deploying to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/the-company-tcus/docs#GH_TOKEN=)

### Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fthe-company-tcus%2Fdocs&env=GH_TOKEN&envDescription=GitHub%20personal%20access%20token%20to%20fetch%20data%20from%20GitHub%20API&envLink=https%3A%2F%2Fgithub.com%2Fthe-company-tcus%2Fdocs%23key-environment-variables&demo-title=The%20Company%20Documentation&demo-description=A%20statically%20generated%20document%20site%20for%20The%20Company&demo-url=https%3A%2F%2Fcompany-se.netlify.app%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F64480713%2F209646899-4c830fd4-2c18-46d2-87b6-bd0964746a0c.png)

### Deploying to GitHub Pages

To deploy this project run:

```bash
GIT_USER=<GITHUB_USERNAME> pnpm deploy
```

> **Warning**: You have to change the `baseUrl` in `docusaurus.config.js` to
> `docs/` before deploying to GitHub Pages.

For more information, check out the doc [Document Site
Deployment](./docs//deployment/document-site.md).

<!-- Usage -->

## :eyes: Usage

<!-- Components -->

### :package: Components

#### PDFViewer component

This component is used to display PDF files.

This will have three variants:

- `PDFViewer`: Use [PDF Embed
  API](https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/)
  from Adobe to display PDF files.

  - **Usage**:

    ```jsx
    import { PDFViewer } from '@site/src/components/PDFViewer';
    // Import sample PDF from static/pdf folder
    import sample from '@site/static/pdf/sample.pdf';
    import React from 'react';

    export default function MyPage() {
      return (
        <div
          style={{
            height: '100vh',
          }}
        >
          {/* From URL */}
          <PDFViewer
            url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
            title="Dummy PDF"
          />
          {/* From import */}
          <PDFViewer url={sample} title="Sample PDF" />
          {/* From static URL */}
          <PDFViewer url="/pdf/sample.pdf" title="Sample PDF" />
        </div>
      );
    }
    ```

  - **Props**:
      <table>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>url</td>
          <td>string</td>
          <td>URL of the PDF file. This can be an external URL, static URL, or imported to file.</td>
        </tr>
        <tr>
          <td>title</td>
          <td>string</td>
          <td>Title of the PDF file.</td>
        </tr>
        <tr>
          <td>embedMode</td>
          <td>"FULL_WINDOW" | "SIZED_CONTAINER" | "IN_LINE" | "LIGHT_BOX"</td>
          <td>Embed mode of the PDF file (Default: `FULL_WINDOW`) supported by PDF Embed API.</td>
        </tr>
      </table>

- `PDFViewerButton`: Pre-defined component for PDFViewer with `embedMode` set to
  `LIGHT_BOX`. The button is **disabled** if the PDF file is not fully loaded.

  - **Usage**:

    ```jsx
    import { PDFViewerButton } from '@site/src/components/PDFViewer';
    import React from 'react';

    export default function MyPage() {
      return (
        <div
          style={{
            height: '100vh',
          }}
        >
          <PDFViewerButton
            url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
            title="Dummy PDF"
          />
        </div>
      );
    }
    ```

  - **Props**:
      <table>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>url</td>
          <td>string</td>
          <td>URL of the PDF file. This can be an external URL, static URL, or imported to file.</td>
        </tr>
        <tr>
          <td>title</td>
          <td>string</td>
          <td>Title of the PDF file.</td>
        </tr>
      </table>

- `PDFViewerSimple`: Use the built-in PDF viewer of the browser to display PDF
  files.

  > **Note**: If the file is not found, it will redirect to the Docusaurus 404
  > page, create a nested layout on your page.

  - **Usage**:

    ```jsx
    import { PDFViewerSimple } from '@site/src/components/PDFViewer';
    import React from 'react';

    export default function MyPage() {
      return (
        <div
          style={{
            height: '100vh',
          }}
        >
          <PDFViewerSimple
            url="https://documentservices.adobe.com/view-sdk-demo/PDFs/Bodea%20Brochure.pdf"
            title="Dummy PDF"
          />
        </div>
      );
    }
    ```

  - **Props**:
      <table>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>url</td>
          <td>string</td>
          <td>URL of the PDF file. This can be an external URL, static URL, or imported to file.</td>
        </tr>
        <tr>
          <td>title</td>
          <td>string</td>
          <td>Title of the PDF file.</td>
        </tr>
      </table>

#### ReleaseByTimeRange component

`ReleaseByTimeRange` will fetch releases within a time range from GitHub API and
display them in a dropdown menu.

You will have to set the GitHub token (`ghToken`) in the `docusaurus.config.js`
file. For example:

```js
require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  customFields: {
    ghToken: process.env.GH_TOKEN,
  },
};

module.exports = config;
```

- **Usage**:

  ```jsx
  import { ReleaseByTimeRange } from '@site/src/components/ReleaseByTimeRange';
  import React from 'react';

  export default function MyPage() {
    return (
      <div
        style={{
          height: '100vh',
        }}
      >
        <ReleaseByTimeRange
          owner="mantinedev"
          repo="mantine"
          from="05-12-2022"
          to="12-12-2022"
        />
      </div>
    );
  }
  ```

- **Props**:
  <table>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>owner</td>
      <td>string</td>
      <td>The account owner of the repository. The name is not case sensitive.</td>
    </tr>
    <tr>
      <td>repo</td>
      <td>string</td>
      <td>The name of the repository. The name is not case sensitive.</td>
    </tr>
    <tr>
      <td>from</td>
      <td>string</td>
      <td>Start date of the time range. Format: <code>MM-DD-YYYY</code> or <code>MM/DD/YYYY</code>. This will be <a href="https://momentjs.com/docs/#/parsing/">parsed</a> into Moment Object.</td>
    </tr>
    <tr>
      <td>to</td>
      <td>string</td>
      <td>End date of the time range. Format: <code>MM-DD-YYYY</code> or <code>MM/DD/YYYY</code>. This will be <a href="https://momentjs.com/docs/#/parsing/">parsed</a> into Moment Object.</td>
    </tr>
  </table>

<!-- Roadmap -->

## :compass: Roadmap

- [x] Todo 1.
- [ ] Todo 2.

<!-- Contact -->

## :handshake: Contact

Duong Vinh - [@duckymomo20012](https://twitter.com/duckymomo20012) -
tienvinh.duong4@gmail.com

Project Link: [https://github.com/the-company-tcus/docs](https://github.com/the-company-tcus/docs).

<!-- Acknowledgments -->

## :gem: Acknowledgements

Here are useful resources and libraries that we have used in our projects:

- [Docusaurus](https://docusaurus.io/): Build optimized websites quickly, focus
  on your content.
- [Awesome Readme Template](https://github.com/Louis3797/awesome-readme-template):
  A detailed template to bootstrap your README file quickly.
