const preloadScenes =function() {

    const context = require.context('scenes/', true, /^\.\/[^\/]+\/index\.js$/, 'sync');

    context.keys().forEach((key) => {

        const name = key.match(/^\.\/([^\/]+)\/index\.js$/)[1];

        this.scenes[name] = context(key);
    });
}

export {preloadScenes};
