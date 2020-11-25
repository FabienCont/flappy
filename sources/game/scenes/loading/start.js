import { Camera } from 'modules/camera';
import { getRenderers } from 'core/loadRenderers';
import { getSystems } from 'core/loadSystems';
import { loadEntities } from 'core/loadEntities';
import { World } from 'modules/world';

function start() {
  console.log('start loading scene');

  this.$world = new World(this);

  const scale = () => 1;

  this.$camera = new Camera('default', {
    x: () => (this.size.width * scale()) / 2,
    y: () => (this.size.height * scale()) / 2,
    z: () => 0,
    width: () => this.size.width * scale(),
    height: () => this.size.height * scale(),
    scale,
  });

  this.$renderers = getRenderers.call(this);
  this.$systems = getSystems.call(this);

  const entities = loadEntities.call(this);
  this.$world.add(entities);

  this.state.redirect = false;
}

export { start };
