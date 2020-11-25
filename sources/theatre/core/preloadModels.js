const preloadModels = function preloadModels() {
  return new Promise((resolve) => {
    const context = require.context('models/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy');

    const promiseArray = [];

    this.modelsLoaded = [];
    context.keys().forEach((key) => {
      const promise = new Promise((resolve, reject) => {
        context(key).then((module) => {
          const componentLoaded = this.modelsLoaded.find((component) => component.key == key);

          if ((componentLoaded && componentLoaded.source != module) || componentLoaded === undefined) {
            if (componentLoaded !== undefined && componentLoaded.source != module) {
              const index = this.modelsLoaded.indexOf(componentLoaded);
              if (index > -1) {
                this.modelsLoaded.splice(index, 1);
              }
            }

            loadModel.call(this, key, module).then((component) => {
              this.modelsLoaded.push(component);

              if (typeof this.models[`${component.type}s`] === 'undefined') {
                this.models[`${component.type}s`] = {};
              }

              if (typeof this.models[`${component.type}s`][component.scope] === 'undefined') {
                this.models[`${component.type}s`][component.scope] = {};
              }

              this.models[`${component.type}s`][component.scope][component.name] = component.getter;
            });
          }
          resolve(module);
        });
      });
      promiseArray.push(promise);
    });

    Promise.all(promiseArray).then((modules) => {
      if (module.hot) {
        /*  module.hot.dispose(context.id, (contextId) => {
                preloadModels.call(this);
            }); */
        module.hot.accept(context.id, (contextId) => {
          preloadModels.call(this);
        });
      }
      resolve();
    });
  });
};

function loadModel(key, module) {
  // creates a promise for current asset preloading
  return new Promise((resolve, reject) => {
    console.log('load models or reload');

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
export { preloadModels };
