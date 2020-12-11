const preloadScenes = function preloadScenes(ctx) {
  const context = ctx || require.context('scenes/', true, /^\.\/[^/]+\/index\.js$/, 'sync');

  context.keys().forEach((key) => {
    const match = key.match(/^\.\/([^/]+)\/index\.js$/);
    if (match) {
      const name = match[1];
      this.scenes[name] = context(key);
    }
  });
};

export { preloadScenes };
