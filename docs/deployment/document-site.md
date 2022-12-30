---
id: document-site
title: Document Site Deployment
sidebar_position: 2
tags:
  - guide
  - deployment
---

# Document Site Deployment

This section will guide how to deploy the document site to various platforms.

## Getting Started

This document will guide to deploy the document site to:

- [Netlify](https://www.netlify.com/) (Current): a platform for building,
  deploying, and hosting modern web projects.
- [Vercel](https://vercel.com/) (Recommend): a platform for static sites and
  Serverless Functions.
- [Render](https://render.com/): a platform for deploying and hosting modern
  apps.
- [GitHub Pages](https://pages.github.com/): a static site hosting service
  that takes HTML, CSS, and JavaScript files straight from a repository on
  GitHub, optionally runs the files through a build process, and publishes a
  website.

For more information, please refer to the [official
documentation](https://docusaurus.io/docs/deployment).

:::note

This document assumes that you have already created an account and logged in
with the above platforms.

:::

## Deploying to Netlify

To deploy your Docusaurus 2 sites to Netlify, first make sure the following options are properly configured:

```js title=docusaurus.config.js
module.exports = {
  url: 'https://demo-company-se.netlify.app', // Url to your site with no trailing slash
  baseUrl: '/', // Base directory of your site relative to your repo
  // ...
};
```

Then, [create your site with Netlify](https://app.netlify.com/start).

![netlify-import-project](https://user-images.githubusercontent.com/64480713/209609212-20a1355a-cb79-4f50-b9e3-bc61de81e944.png)

Choose `GitHub` as the Git provider and select your repository.

While you set up the site, specify the build commands and directories as follows:

- build command: `pnpm run build`
- publish directory: `build`

![netlify-site-settings](https://user-images.githubusercontent.com/64480713/209609424-0239f5f5-796e-4213-b3b4-c9712d4374a6.png)

:::info

If you did not configure these build options, you may still go to "Site
settings" -> "Build & deploy" after your site is created.

:::

Then click `Deploy site`.

Once properly configured with the above options, your site should deploy and
automatically redeploy upon merging to your deploy branch, which defaults to
`main`.

Change site name in `Site settings` -> `General` -> `Site details` -> `Site
name` to your own site name (configured in `docusaurus.config.js`).

![netlify-change-sitename](https://user-images.githubusercontent.com/64480713/209609820-c699a01b-75cb-4fd3-85b1-54f7b0208aaa.png)

Your site should be deployed and available at the URL specified in the `url`:

![netlify-demo](https://user-images.githubusercontent.com/64480713/209820269-92fbc170-f3a8-4596-8828-5deac5b13b73.png)

## Deploying to Vercel

You should configure the following options in `docusaurus.config.js`:

```js title=docusaurus.config.js
module.exports = {
  url: 'https://demo-company-se.vercel.app', // Url to your site with no trailing slash
  baseUrl: '/', // Base directory of your site relative to your repo
  // ...
};
```

[Create your site with Vercel](https://vercel.com/new) by importing your GitHub
repository.

![vercel-import-project](https://user-images.githubusercontent.com/64480713/209610425-3cda5708-d595-4b8e-8dbb-fa094ffa8f5b.png)

By default Vercel have already configured the build command and output directory
for you:

![vercel-site-settings](https://user-images.githubusercontent.com/64480713/209610612-9fdd69e9-e168-4098-ac52-fd0a6d9abbfa.png)

Then click `Deploy`.

Change your domains in `Domains` -> `Edit` -> `Domain` to your configured `url`
in `docusaurus.config.js`:

![vercel-change-domain](https://user-images.githubusercontent.com/64480713/209610847-0fd1c970-7086-45a2-8d26-54dcd3d2b8fa.png)

Click `Save` and your site should be deployed and available at the URL
specified:

![vercel-demo](https://user-images.githubusercontent.com/64480713/209820948-159ae08a-5361-4c38-a4cb-6b75f9f842ad.png)

## Deploying to Render

You should configure the following options in `docusaurus.config.js`:

```js title=docusaurus.config.js
module.exports = {
  url: 'https://demo-company-se.onrender.com', // Url to your site with no trailing slash
  baseUrl: '/', // Base directory of your site relative to your repo
  // ...
};
```

Connect your GitHub repository to Render:

![render-connect-project](https://user-images.githubusercontent.com/64480713/209611124-caca256c-1b73-43b7-bffb-5ca2c3f276d9.png)

While you set up the site, specify the build commands and directories as follows:

- name: your site name (configured in `docusaurus.config.js`, e.g.
  `demo-company-se`)
- build command: `pnpm install; pnpm run build`
- publish directory: `build`

![render-site-settings](https://user-images.githubusercontent.com/64480713/209611444-cad5837f-68b0-4a22-8b29-ac972cecc439.png)

Click `Create Static Site` and your site should be deployed:

![render-demo](https://user-images.githubusercontent.com/64480713/209821454-050b5774-ffc2-4619-881e-1ae54f12b4e5.png)

## Deploying to GitHub Pages

You should configure the following options in `docusaurus.config.js`:

| Name               | Description                                                                                                                                                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `organizationName` | The GitHub user or organization that owns the deployment repository.                                                                                                                                                        |
| `projectName`      | The name of the deployment repository.                                                                                                                                                                                      |
| `deploymentBranch` | The name of deployment branch. Defaults to `'gh-pages'` for non-organization GitHub Pages repos (`projectName` not ending in `.github.io`). Otherwise, this needs to be explicit as a config field or environment variable. |

```js title=docusaurus.config.js
module.exports = {
  url: 'https://duckymomo20012.github.io', // Url to your site with no trailing slash
  baseUrl: '/docs', // Base directory of your site relative to your repo
  projectName: 'docs',
  organizationName: 'duckymomo20012',
  trailingSlash: false,
  // ...
};
```

:::caution

You will have to manually change link in your pages to use `baseUrl` instead of
`/`, e.g.: `<Link to="/docs">` to `<Link to=/docs/docs/intro>`.

:::

Finally, to deploy your site to GitHub Pages, run:

```bash
GIT_USER=<GITHUB_USERNAME> pnpm run deploy
```

:::info

For automated deployment, you can use GitHub Actions, following the steps in the [official documentation](https://docusaurus.io/docs/deployment#triggering-deployment-with-github-actions).

:::

And your site should be deployed properly:

![gh-pages-demo](https://user-images.githubusercontent.com/64480713/209821670-9bd280d2-cf55-4420-b342-dd05e2b7c6a5.png)
