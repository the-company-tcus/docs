/* eslint-disable @typescript-eslint/no-var-requires */
const Joi = require('joi');

const optionSchema = Joi.object({
  patterns: Joi.array().items(Joi.string(), Joi.object().regex()),
  iframeAttrs: Joi.object().pattern(Joi.string(), [Joi.number(), Joi.string()]),
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
    .map(([key, val]) => `${key}=${val}`)
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
