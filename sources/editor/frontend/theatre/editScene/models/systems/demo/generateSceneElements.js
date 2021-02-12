import { generateEntities } from 'core/loadEntities';
import { generateCameras } from 'core/loadCameras';
import { generateVariables } from 'core/loadVariables';

function generateSceneElements() {
  const { sceneFiles } = this.params;
  const sceneInfo = JSON.stringify(sceneFiles);

  if (this.savedSceneInfo !== sceneInfo && sceneInfo !== 'null') {
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
    // this.$variables = generateVariables.call(this, variables);
    }

    if (cameras) {
      this.$cameras = generateCameras.call(this, cameras);
    }

    if (entities) {
      const sceneEntities = generateEntities.call(this, entities);
      this.$world.add(sceneEntities);
    }

    this.savedSceneInfo = sceneInfo;
  }
}
export { generateSceneElements };
