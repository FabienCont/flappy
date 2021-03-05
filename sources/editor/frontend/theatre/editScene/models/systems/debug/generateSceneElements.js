import { generateEntities } from 'core/loadEntities';
import { generateCameras } from 'core/loadCameras';
import { generateVariables } from 'core/loadVariables';
import { loadWorld } from 'core/loadWorld';

function generateSceneElements() {
  const { sceneFiles } = this.params;
  const sceneInfo = JSON.stringify(sceneFiles);

  if (this.$variables.$debug.savedSceneInfo !== sceneInfo && sceneInfo !== 'null') {
    let systems; let variables; let cameras; let entities; let renderers; let inputs;
    Object.values(sceneFiles).forEach((file) => {
      const name = file.name.split('.')[0];
      if (name === 'variables') {
        variables = file.content;
      } else if (name === 'cameras') {
        cameras = file.content;
      } else if (name === 'entities') {
        entities = file.content;
      } else if (name === 'renderers') {
        renderers = file.content;
      } else if (name === 'systems') {
        systems = file.content;
      } else if (name === 'inputs') {
        inputs = file.content;
      }
    });

    if (variables) {
      const debug = this.$variables.$debug;
      this.$variables = generateVariables.call(this, variables);
      this.$variables.$debug = debug;
    }

    this.$world = loadWorld.call(this);

    if (cameras) {
      this.$variables.$debug.cameras = generateCameras.call(this, cameras);
    }

    if (entities) {
      const sceneEntities = generateEntities.call(this, entities);
      this.$world.add(sceneEntities);
      Object.entries(this.$world.entities).forEach(([key, value], i) => {
        value.index = i;
      });
    }

    this.$variables.$debug.savedSceneInfo = sceneInfo;
  }
}
export { generateSceneElements };
