const getRenderers = function getRenderers() {
  try {
    const sceneModel = this.models.scenes[this.currentScene];
    if (sceneModel !== undefined && sceneModel.renderers !== undefined && sceneModel.renderers()) {
      return sceneModel.renderers();
    }
  } catch (err) {
    console.error(`no renderers found for this scene :${this.currentScene}`);
  }
  return [];
};

const getSystem = function getSystem(systemName, systemScope) {
  try {
    if (typeof systemName !== 'string' || systemName === '') {
      throw 'no system name defined';
    }
    return this.models.systems[systemScope][systemName]()[systemName];
    // return require('components/common/'+componentRef.name+'.json');
  } catch (err) {
    throw `no system found with name :${systemName}`;
  }
};

const loadRenderers = function loadRenderers(sceneRenderers) {
  if (sceneRenderers) {
    sceneRenderers.forEach((renderer) => {
      const rendererSystem = getSystem.call(this, renderer.name, renderer.scope);
      this.$world.system(renderer.components, rendererSystem);
    });
  }
};

export { loadRenderers, getRenderers };
