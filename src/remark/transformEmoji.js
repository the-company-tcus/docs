function plugin(options) {
  async function load() {
    const { default: emojiPlugin } = await import('remark-emoji');

    return emojiPlugin(options);
  }

  return async (tree) => {
    const transformer = await load();
    transformer(tree);
  };
}

module.exports = plugin;
