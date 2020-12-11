import { loadRenderers } from 'core/loadRenderers';
import { loadSystems } from 'core/loadSystems';
import { loadCameras } from 'core/loadCameras';
import { loadEntities } from 'core/loadEntities';
import { loadWorld } from 'core/loadWorld';

function start() {
  console.log('start loading scene');

  this.$world = loadWorld.call(this);
  this.$cameras = loadCameras.call(this);
  this.$renderers = loadRenderers.call(this);
  this.$systems = loadSystems.call(this);
  const entities = loadEntities.call(this);

  this.$world.add(entities);

  this.state.redirect = false;
}

export { start };
