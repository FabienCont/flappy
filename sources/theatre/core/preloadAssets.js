function loadAsset(key, module) {
  // creates a promise for current asset preloading
  return new Promise((resolve, reject) => {
    this.logger.log('load assets or reload');

    const [type, scope, name] = key.match(/(?!\.\/|\/)(.+?)(?=(?:\.[^\.\/]+$)|\/)/g);

    const asset = {
      key,
      name,
      scope,
      source: module,
      type: type.substring(0, type.length - 1),
    };

    // if current asset is a dataset then preload it
    if (asset.type === 'dataset') {
      asset.getter = () => asset.source;

      resolve(asset);
    } else if (asset.type === 'sprite') {
      asset.source.forEach((grid) => {
        grid.animations.forEach((sprite) => {
          if (sprite.alias) {
            sprite.scope = scope;
            sprite.file = name;
            this.sprites[sprite.alias] = () => sprite;
          } else reject(new Error('no alias defined for this sprite'));
        });
      });

      asset.getter = () => asset.source;

      resolve(asset);
    } else if (asset.type === 'image') {
      const image = new Image();

      image.src = asset.source;

      // when current image is loaded then resolve current promise
      image.onload = function onloadImage() {
        asset.getter = () => image;

        resolve(asset);
      };
    } else if (asset.type === 'sound') {
      const sound = new Audio(asset.source);

      // when current sound is loaded then resolve current promise
      sound.oncanplaythrough = function oncanplaythrough() {
        asset.getter = () => sound.cloneNode();

        resolve(asset);
      };
    }
  });
}

const preloadAssets = function preloadAssets(ctx) {
  return new Promise((resolve, reject) => {
    const context = ctx || require.context('assets/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy');

    const promiseArray = [];
    if (!this.assets.spritesAlias) this.assets.spritesAlias = {};
    this.assetsLoaded = [];
    if (context.keys === undefined)resolve();

    context.keys().forEach((key) => {
      const promise = new Promise((resolve, reject) => {
        context(key).then((module) => {
          const assetLoaded = this.assetsLoaded.find((asset) => asset.key == key);

          if ((assetLoaded && assetLoaded.source !== module) || assetLoaded === undefined) {
            if (assetLoaded !== undefined && assetLoaded.source !== module) {
              const index = this.assetsLoaded.indexOf(assetLoaded);
              if (index > -1) {
                this.assetsLoaded.splice(index, 1);
              }
            }

            loadAsset.call(this, key, module).then((asset) => {
              this.assetsLoaded.push(asset);

              if (typeof this.assets[`${asset.type}s`] === 'undefined') {
                this.assets[`${asset.type}s`] = {};
              }

              if (typeof this.assets[`${asset.type}s`][asset.scope] === 'undefined') {
                this.assets[`${asset.type}s`][asset.scope] = {};
              }

              this.assets[`${asset.type}s`][asset.scope][asset.name] = asset.getter;
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
                preloadAssets.call(this);
            }); */
        module.hot.accept(context.id, (contextId) => {
          preloadAssets.call(this);
        });
      }
      resolve();
    });
  });
};

export { preloadAssets };
