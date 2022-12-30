// Ref: https://stackoverflow.com/a/63906923/12512981
module.exports = function dynamicRoutePlugin(context, options) {
  return {
    name: 'plugin-dynamic-route',
    contentLoaded({ actions }) {
      const { routes } = options;
      const { addRoute } = actions;

      routes.forEach((route) => addRoute(route));
    },
  };
};
