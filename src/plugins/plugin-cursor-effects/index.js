module.exports = function cursorEffectPlugin(context, options) {
  const { cursorType = 'rainbowCursor', opts = {} } = options;
  return {
    name: 'plugin-cursor-effects',
    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'module',
            },
            innerHTML: `import { ${cursorType} } from 'https://unpkg.com/cursor-effects@latest/dist/esm.js';\nnew ${cursorType}(${JSON.stringify(
              opts,
            )});
            `,
          },
        ],
      };
    },
  };
};
