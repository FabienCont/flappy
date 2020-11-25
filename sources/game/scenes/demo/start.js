import { loadEntities } from 'core/loadEntities';
import { Camera } from 'modules/camera';
import { Controllers } from 'modules/controllers';
import { World } from 'modules/world';
import { getRenderers } from 'core/loadRenderers';
import { getSystems } from 'core/loadSystems';
import { generateDecor } from 'systems/demo/generateDecor';
import * as memory from 'modules/memory';

function start() {
  console.log('start demo scene');

  this.$controllers = new Controllers(this.element, this.models.scenes[this.currentScene].inputs());
  this.$world = new World(this);
  this.$infos = { started: false };

  const scale = () => Math.min((this.size.width / 160), (this.size.height / 144));

  this.$camera = new Camera('default', {

    x: () => (this.size.width - 160 * scale()) / 2,
    y: () => (this.size.height - 144 * scale()) / 2,
    z: () => 0,
    width: () => 160 * scale(),
    height: () => 144 * scale(),
    scale,
  });

  this.cameras[this.$camera.name] = this.$camera;

  this.$cameraInfo = new Camera('info', {

    x: () => (this.size.width - 160 * scale()) / 2,
    y: () => (this.size.height - 144 * scale()) / 2,
    z: () => 0,
    width: () => 160 * scale(),
    height: () => 144 * scale(),
    scale,
  });

  this.cameras[this.$cameraInfo.name] = this.$cameraInfo;

  this.$renderers = getRenderers.call(this);
  this.$systems = getSystems.call(this);

  const entities = loadEntities.call(this);
  this.$world.add(entities);
  generateDecor.call(this, []);
  this.$camera.look(() => this.$world.entities.character.get('position').x + 48, () => 72, () => this.$world.entities.character.get('position').z);
  const bestScoreSaved = memory.get('bestScore');
  if (bestScoreSaved != undefined) {
    this.$world.entities.bestScore.get('score').value = bestScoreSaved;
  }
}

export { start };
