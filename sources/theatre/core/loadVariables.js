const generateVariables = function generateVariables(sceneVariables) {
  const variables = {};

  try {
    Object.entries(sceneVariables).forEach(([name, value]) => {
      if (typeof value === 'object' && value.$snippet !== undefined) {
        const snippet = value.$snippet;
        variables[name] = this.models.snippets[snippet.scope][snippet.name]();
      } else {
        variables[name] = value;
      }
    });
  } catch (err) {
    this.logger.error(err);
  }

  return variables;
};

const getVariablesScene = function getVariablesScene() {
  try {
    const currentScene = this.models.scenes[this.currentScene];
    if (currentScene && currentScene.variables !== undefined) {
      return currentScene.variables();
    }
    return {};
  } catch (err) {
    this.logger.error(`no variables found for this scene :${this.currentScene}`);
  }
};

const loadVariables = function loadVariables() {
  const sceneVariables = getVariablesScene.call(this);
  if (sceneVariables !== undefined) {
    return generateVariables.call(this, sceneVariables);
  }
};

export { loadVariables };
