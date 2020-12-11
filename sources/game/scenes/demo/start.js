import { loadEntities } from 'core/loadEntities';
import { loadControllers } from 'core/loadControllers';
import { loadWorld } from 'core/loadWorld';
import { loadRenderers } from 'core/loadRenderers';
import { loadCameras } from 'core/loadCameras';
import { loadSystems } from 'core/loadSystems';
import { generateDecor } from 'systems/demo/generateDecor';

function start() {
  console.log('start demo scene');

  this.$controllers = loadControllers.call(this);

  this.$world = loadWorld.call(this);
  this.$cameras = loadCameras.call(this);
  this.$renderers = loadRenderers.call(this);
  this.$systems = loadSystems.call(this);
  const entities = loadEntities.call(this);
  this.$world.add(entities);

  this.$infos = {
    bestScoreEntity: '', scoreEntity: '', birdEntity: '', started: false,
  };

  this.$infos.birdEntity = Object.values(this.$world.entities).find((entity) => entity.name === 'character');
  this.$infos.bestScoreEntity = Object.values(this.$world.entities).find((entity) => entity.name === 'bestScore');
  this.$infos.scoreEntity = Object.values(this.$world.entities).find((entity) => entity.name === 'score');

  generateDecor.call(this, []);
  this.$cameras.default.look(() => this.$infos.birdEntity.get('position').x + 48, () => 72, () => this.$infos.birdEntity.get('position').z);
}

export { start };
