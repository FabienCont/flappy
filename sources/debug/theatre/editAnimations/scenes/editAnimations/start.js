import { loadEntities } from 'core/loadEntities';
import { loadControllers } from 'core/loadControllers';
import { loadWorld } from 'core/loadWorld';
import { loadRenderers } from 'core/loadRenderers';
import { loadCameras } from 'core/loadCameras';
import { loadSystems } from 'core/loadSystems';

function start() {
  console.log('start edit animations scene');

  this.$controllers = loadControllers.call(this);

  this.$world = loadWorld.call(this);
  this.$cameras = loadCameras.call(this);
  this.$renderers = loadRenderers.call(this);
  this.$systems = loadSystems.call(this);
  const entities = loadEntities.call(this);
  this.$world.add(entities);
  const sprite = this.assets.images.common.sprite();
  this.$cameras.default.look(() => sprite.naturalWidth / 2, () => sprite.naturalHeight / 2, () => 0);
}

export { start };
