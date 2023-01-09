/* eslint-disable @typescript-eslint/no-var-requires */
const transformURL = require('./transformURL');

// Ref: https://cookpete.com/react-player/
const DEFAULT_PATTERN = [
  '.mp4',
  '.webm',
  '.ogv',
  '.mp3',
  '.m3u8',
  '.mpd',
  '.mov',
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
