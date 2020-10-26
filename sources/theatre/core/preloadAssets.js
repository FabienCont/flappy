const preloadAssets = function() {
  return new Promise((resolve, reject) => {

    const context = require.context('assets/', true, /^.\/.+\.[a-zA-Z0-9]+$/, 'lazy');

    let promiseArray = [];

    this.assetsLoaded=[];
    context.keys().forEach((key) => {

        let promise = new Promise((resolve, reject) => {
            context(key).then((module) => {

                var assetLoaded = this.assetsLoaded.find((asset) => {
                    return asset.key == key
                })

                if ((assetLoaded && assetLoaded.source != module) || assetLoaded === undefined) {

                    if (assetLoaded !== undefined && assetLoaded.source != module) {
                        let index = this.assetsLoaded.indexOf(assetLoaded)
                        if (index > -1) {
                            this.assetsLoaded.splice(index, 1);
                        }
                    }

                    loadAsset(key, module).then((asset) => {

                        this.assetsLoaded.push(asset);

                        if (typeof this.assets[asset.type + 's'] === 'undefined') {

                            this.assets[asset.type + 's'] = {};
                        }

                        if (typeof this.assets[asset.type + 's'][asset.scope] === 'undefined') {

                            this.assets[asset.type + 's'][asset.scope] = {};
                        }

                        this.assets[asset.type + 's'][asset.scope][asset.name] = asset.getter;

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
            });*/
            module.hot.accept(context.id, (contextId) => {
                preloadAssets.call(this);
            });
        }
        resolve()
    });

  });
}

function loadAsset(key,module) {

    // creates a promise for current asset preloading
    return new Promise(function (resolve, reject) {

        console.log("load assets or reload")

        const [type, scope, name] = key.match(/(?!\.\/|\/)(.+?)(?=(?:\.[^\.\/]+$)|\/)/g);

        const asset = {
            'key': key,
            'name': name,
            'scope': scope,
            'source': module,
            'type': type.substring(0, type.length - 1)
        };


        // if current asset is a dataset then preload it
        if (asset.type === 'dataset') {

            asset.getter = () => asset.source;

            resolve(asset);
        }

        // if current asset is an image then preload it
        if (asset.type === 'image' || asset.type === 'spritesheet') {

            const image = new Image();

            image.src =  asset.source;

            // when current image is loaded then resolve current promise
            image.onload = function () {

                asset.getter = () => image;

                resolve(asset);
            };
        }

        // if current asset is a sound then preload it
        else if (asset.type === 'sound') {

            const sound = new Audio(asset.source);

            // when current sound is loaded then resolve current promise
            sound.oncanplaythrough = function () {

                asset.getter = () => sound.cloneNode();

                resolve(asset);
            };
        }
    });

}


export {preloadAssets}
