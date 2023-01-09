/* eslint-disable @typescript-eslint/no-var-requires */
const transformURL = require('./transformURL');

// Ref: https://cookpete.com/react-player/
const DEFAULT_PATTERN = ['.pdf'];

function plugin(options) {
  return async (tree) => {
    const transformer = transformURL({
      patterns: [...DEFAULT_PATTERN, ...(options?.patterns || [])],
      iframeAttrs: {
        // NOTE: Set data-type-iframe to 'pdf' to be able to differentiate
        // between pdf file and normal iframe
        'data-type-iframe': 'pdf',
        width: '100%',
        height: '100%',
        style: 'aspect-ratio: 1/1',
        title: 'PDF file',
        ...options?.iframeAttrs,
      },
    });

    await transformer(tree);
  };
}

module.exports = plugin;
