import { loadEntities } from 'core/loadEntities';
import { loadControllers } from 'core/loadControllers';
import { loadWorld } from 'core/loadWorld';
import { loadRenderers } from 'core/loadRenderers';
import { loadCameras } from 'core/loadCameras';
import { loadSystems } from 'core/loadSystems';
import { generateDecor } from 'systems/demo/generateDecor';
import * as memory from 'modules/memory';

function start() {
  console.log('start demo scene');

  this.$controllers = loadControllers.call(this);

  this.$world = loadWorld.call(this);
  this.$cameras = loadCameras.call(this);
  this.$renderers = loadRenderers.call(this);
  this.$systems = loadSystems.call(this);
  const entities = loadEntities.call(this);
  this.$world.add(entities);

  this.$infos = { started: false };
  generateDecor.call(this, []);
  this.$cameras.default.look(() => this.$world.entities.character.get('position').x + 48, () => 72, () => this.$world.entities.character.get('position').z);

  const bestScoreSaved = memory.get('bestScore');
  if (bestScoreSaved != undefined) {
    this.$world.entities.bestScore.get('score').value = bestScoreSaved;
  }
}

export { start };
