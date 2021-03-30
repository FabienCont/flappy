import catchError from 'core/catchError';

const updateSystems = function (sceneSystems) {
  sceneSystems.forEach((system) => {
    const updateSystem = getSystem.call(this, system.name, system.scope);
    this.$world.system(system.components, updateSystem);
  });
};

const loadSystems = function () {
  try {
    const sceneScript = this.models.scenes[this.currentScene];
    if (sceneScript !== undefined && sceneScript.systems !== undefined) {
      return sceneScript.systems();
    }
    return [];
  } catch (err) {
    this.logger.error(`no systems found for this scene :${this.currentScene}`);
  }
};
const getSystem = function (systemName, systemScope) {
  try {
    if (typeof systemName !== 'string' || systemName === '') {
      throw 'no system name defined';
    }
    const systemModule = this.scripts.systems[systemScope][systemName]();
    if (systemModule[systemName]) {
      return systemModule[systemName];
      return catchError.bind(this, systemModule[systemName]);
    } throw "system don't export good systemName";
    // return require('components/common/'+componentRef.name+'.json');
  } catch (err) {
    throw `no system found with name :${systemName} and scope : ${systemScope}`;
  }
};

export { updateSystems, loadSystems };
