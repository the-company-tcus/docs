/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const lightCodeTheme = require('prism-react-renderer/themes/github');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
const transformEmoji = require('./src/remark/transformEmoji');
const transformVideo = require('./src/remark/transformVideo');

require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Company',
  tagline:
    'Your problems are my problems, my problems are your problems. But your tasks are your tasks.',
  url: 'https://the-company-tcus.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'the-company-tcus', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    function windicssPlugin() {
      return {
        name: 'plugin-windicss',
        configureWebpack() {
          return {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            plugins: [new WindiCSSWebpackPlugin()],
          };
        },
      };
    },

    [
      './src/plugins/plugin-dynamic-route/index.js',
      {
        routes: [
          {
            // using Route schema from react-router
            path: '/releases',
            exact: false, // this is needed for sub-routes to match!
            component: '@site/src/components/layouts/ReleaseLayout/index',
          },
          // {
          //   // using Route schema from react-router
          //   path: '/pdf-viewer',
          //   exact: false, // this is needed for sub-routes to match!
          //   component: '@site/src/components/layouts/PDFViewerLayout/index',
          // },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/the-company-tcus/docs/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          beforeDefaultRemarkPlugins: [
            [transformVideo, { patterns: ['youtube.com'] }],
            [transformEmoji, { emoticon: true }],
          ],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/the-company-tcus/docs/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        title: 'The Company',
        logo: {
          alt: 'The Company Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          { to: 'blog', label: 'Blog', position: 'left' },
          {
            to: 'releases',
            label: 'Release',
          },
          {
            href: 'https://github.com/the-company-tcus/',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'custom-cursorEffectDropdown',
            position: 'right',
            label: 'Cursor',
            // For more info about options, see:
            // https://github.com/tholman/cursor-effects
            items: [
              {
                type: 'custom-cursorEffect',
                label: '🗿 Default',
                cursorType: 'defaultCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '🌈 Rainbow',
                cursorType: 'rainbowCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '💧 Bubble',
                cursorType: 'bubbleCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '⏰ Clock',
                cursorType: 'clockCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '🦄 Emoji',
                cursorType: 'emojiCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '🧚 Fairy Dust',
                cursorType: 'fairyDustCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '⚫️ Dot',
                cursorType: 'followingDotCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '👻 Ghost',
                cursorType: 'ghostCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '❄️ Snowflake',
                cursorType: 'snowflakeCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '🪗 Springy Emoji',
                cursorType: 'springyEmojiCursor',
              },
              {
                type: 'custom-cursorEffect',
                label: '🚩 Text Flag',
                cursorType: 'textFlag',
                options: {
                  text: 'Welcome',
                },
              },
              {
                type: 'custom-cursorEffect',
                label: '👣 Trailing',
                cursorType: 'trailingCursor',
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'The Company Logo',
          src: 'https://avatars.githubusercontent.com/u/112080943?s=400&u=a6fd3da164032bbbba04dfee2c54172a3c55fa00&v=4',
          href: 'https://github.com/the-company-tcus',
          height: '100px',
        },
        copyright: `Copyright © ${new Date().getFullYear()} The Company. Built with Docusaurus.`,
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: 'docs/intro',
              },
              {
                label: 'Production Setup',
                to: '/docs/category/production-setup',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'blog',
              },
              {
                label: 'Release',
                to: 'releases',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/the-company-tcus',
              },
              {
                html: `
                <a href="https://www.netlify.com" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Netlify">
                  <img src="https://www.netlify.com/img/global/badges/netlify-color-accent.svg" alt="Deploys by Netlify" width="114" height="51" />
                </a>
              `,
              },
            ],
          },
          {
            title: 'Legal',
            // Please don't remove the privacy and terms, it's a legal
            // requirement.
            items: [
              {
                label: 'Privacy',
                href: '/legal/privacy',
              },
              {
                label: 'Terms',
                href: 'https://the-company-tcus.netlify.app/',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),

  customFields: {
    clientId:
      process.env.PDF_EMBED_CLIENT_ID ||
      (process.env.NODE_ENV === 'production'
        ? '4d2152eafeec48ea934a8f5ad365879f' // Token for production url
        : 'e11a56067bc646fcbbf5b6486f14283c'), // Token for localhost

    // ghToken: process.env.GH_TOKEN,
  },
};

module.exports = config;
