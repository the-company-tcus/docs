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
  - [Guides](#guides)
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
| primary                             | ![#1E40AF](https://placehold.jp/1E40AF/1E40AF/10x10.png) #1E40AF         | --ifm-color-primary                   | primary                     |
| primary dark                        | ![#1B3A9D](https://placehold.jp/1B3A9D/1B3A9D/10x10.png) #1B3A9D         | --ifm-color-primary-dark              | primary-dark                |
| primary darker                      | ![#193695](https://placehold.jp/193695/193695/10x10.png) #193695         | --ifm-color-primary-darker            | primary-darker              |
| primary darkest                     | ![#152D7B](https://placehold.jp/152D7B/152D7B/10x10.png) #152D7B         | --ifm-color-primary-darkest           | primary-darkest             |
| primary light                       | ![#2146C1](https://placehold.jp/2146C1/2146C1/10x10.png) #2146C1         | --ifm-color-primary-light             | primary-light               |
| primary lighter                     | ![#224AC9](https://placehold.jp/224AC9/224AC9/10x10.png) #224AC9         | --ifm-color-primary-lighter           | primary-lighter             |
| primary lightest                    | ![#2F58DB](https://placehold.jp/2F58DB/2F58DB/10x10.png) #2F58DB         | --ifm-color-primary-lightest          | primary-lightest            |
| docusaurus-highlighted-code-line-bg | ![#0000001A](https://placehold.jp/0000001A/0000001A/10x10.png) #0000001A | --docusaurus-highlighted-code-line-bg | Not set                     |

- **Dark theme**:

| Color                               | Hex                                                                      | CSS variable (\[data-theme='dark'\])\*\* | WindiCSS utility (custom)\* |
| ----------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------- | --------------------------- |
| primary                             | ![#BFDBFE](https://placehold.jp/BFDBFE/BFDBFE/10x10.png) #BFDBFE         | --ifm-color-primary                      | dark-primary                |
| primary dark                        | ![#93C2FD](https://placehold.jp/93C2FD/93C2FD/10x10.png) #93C2FD         | --ifm-color-primary-dark                 | dark-primary-dark           |
| primary darker                      | ![#7DB6FD](https://placehold.jp/7DB6FD/7DB6FD/10x10.png) #7DB6FD         | --ifm-color-primary-darker               | dark-primary-darker         |
| primary darkest                     | ![#3C91FC](https://placehold.jp/3C91FC/3C91FC/10x10.png) #3C91FC         | --ifm-color-primary-darkest              | dark-primary-darkest        |
| primary light                       | ![#EBF4FF](https://placehold.jp/EBF4FF/EBF4FF/10x10.png) #EBF4FF         | --ifm-color-primary-light                | dark-primary-light          |
| primary lighter                     | ![#FFFFFF](https://placehold.jp/FFFFFF/FFFFFF/10x10.png) #FFFFFF         | --ifm-color-primary-lighter              | dark-primary-lighter        |
| primary lightest                    | ![#FFFFFF](https://placehold.jp/FFFFFF/FFFFFF/10x10.png) #FFFFFF         | --ifm-color-primary-lightest             | dark-primary-lightest       |
| docusaurus-highlighted-code-line-bg | ![#0000004D](https://placehold.jp/0000004D/0000004D/10x10.png) #0000004D | --docusaurus-highlighted-code-line-bg    | Not set                     |

**\***: These are not default WindiCSS utilities. It is defined in `windi.config.ts`.
See example configuration below.

**\*\***: These variables applies to selector `[data-theme='dark']` only.

- **WindiCSS colors**:

You can style your components with WindiCSS colors. See color reference at
[WindiCSS color utility](https://windicss.org/utilities/general/colors.html).

---

<details>
<summary>Configure WindiCSS colors</summary>

```ts
// windi.config.ts
export default {
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

  > **Note**: It's recommended that the token has the following scopes:
  > `repo.public_repo`.

  `PDF_EMBED_CLIENT_ID` (optional): Client ID (API Key) for Adobe PDF Embed API.
  You can checkout the
  [documentation](https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/),
  or generate a new one
  [here](https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api).

  > **Note**: This is optional because the default client id for domains: `localhost`
  > (development) and `the-company-tcus.netlify.app` (production) are already
  > set in the file `docusaurus.config.js`.

E.g:

```
# .env
GH_TOKEN=ghp_HH8T***
PDF_EMBED_CLIENT_ID=e11a5***
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
Deployment](./docs/production-setup/document-site.md).

<!-- Usage -->

## :eyes: Usage

### Guides

- [Architecture](./docs/_usage/architecture.md).
- [Components Management](./docs/_usage/components.md).
- [Dynamic Routes](./docs/_usage/dynamic-routes.md).
- Production Setup:
  - [Document Site Deployment](./docs/production-setup/document-site.md).
  - [Domain Setup](./docs/production-setup/domain-setup.md).
  - [Mail Server](./docs/production-setup/mail-server.md).
- [API References](./docs/_usage/api.md).

<!-- Roadmap -->

## :compass: Roadmap

- **Features**:

  - [x] Remark plugin to transform PDF links to `PDFViewer` component.
  - [x] Integrate [`remark-emoji`](https://github.com/rhysd/remark-emoji)
        plugin.

- **Blogs**:

  - [x] Add custom dynamic routes to Docusaurus.
  - [x] Add your custom navbar to Docusaurus.
  - [x] Create your first remark plugin.

- **Docs**:
  - [ ] Git branching strategy.
  - [x] Privacy Policy.
  - [ ] Terms of Service.

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
