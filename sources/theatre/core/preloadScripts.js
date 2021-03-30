const preloadContext = function (context, promiseArray) {
  context.keys().forEach((key) => {
    const promise = new Promise((resolve, reject) => {
      context(key).then((module) => {
        const componentLoaded = this.scriptsLoaded.find((component) => component.key == key);

        if ((componentLoaded && componentLoaded.source != module) || componentLoaded === undefined) {
          if (componentLoaded !== undefined && componentLoaded.source != module) {
            const index = this.scriptsLoaded.indexOf(componentLoaded);
            if (index > -1) {
              this.scriptsLoaded.splice(index, 1);
            }
          }

          loadScript.call(this, key, module).then((component) => {
            this.scriptsLoaded.push(component);

            if (typeof this.scripts[`${component.type}s`] === 'undefined') {
              this.scripts[`${component.type}s`] = {};
            }

            if (typeof this.scripts[`${component.type}s`][component.scope] === 'undefined') {
              this.scripts[`${component.type}s`][component.scope] = {};
            }

            this.scripts[`${component.type}s`][component.scope][component.name] = component.getter;
          });
        }
        resolve(module);
      });
    });
    promiseArray.push(promise);
  });
};

const preloadScripts = function preloadScripts(ctx) {
  return new Promise((resolve) => {
    const contextList = [require.context('scripts/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy')];
    if (ctx)contextList.push(ctx);

    const promiseArray = [];

    this.scriptsLoaded = [];
    contextList.forEach((context) => {
      preloadContext.call(this, context, promiseArray);
    });

    Promise.all(promiseArray).then((modules) => {
      contextList.forEach((context) => {
        if (module.hot) {
          /*  module.hot.dispose(context.id, (contextId) => {
                  preloadScripts.call(this);
              }); */
          module.hot.accept(context.id, (contextId) => {
            preloadScripts.call(this);
          });
        }
      });
      resolve();
    });
  });
};

function loadScript(key, module) {
  // creates a promise for current asset preloading
  return new Promise((resolve, reject) => {
    this.logger.log('load scripts or reload');

    const [type, scope, name] = key.match(/(?!\.\/|\/)(.+?)(?=(?:\.[^\.\/]+$)|\/)/g);

    const asset = {
      key,
      name,
      scope,
      source: module,
      type: type.substring(0, type.length - 1),
    };

    if (type === 'snippets') {
      asset.getter = asset.source.default.bind(this);
      resolve(asset);
    } else {
      asset.getter = () => asset.source;
    }

    resolve(asset);
  });
}
export { preloadScripts };
