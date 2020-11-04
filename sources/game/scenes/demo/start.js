import {loadEntities} from 'core/loadEntities';
import {Camera} from 'modules/camera.js';
import {Controllers} from 'modules/controllers.js';
import {World} from 'modules/world.js';
import {getRenderers} from 'core/loadRenderers';
import {getSystems} from 'core/loadSystems';
import {generateDecor} from 'systems/demo/generateDecor';

function start() {

  console.log('start demo scene');

  this.$controllers = new Controllers(this.element, this.models.scenes[this.currentScene]['inputs']());
  this.$world = new World(this);
  this.$infos = {started:false};

  this.$origins = {
      'default': {
          'x': () => 0,
          'y': () => 0,
          'z': () => 0,
          'scale': () => 1
      }
  };

  const scale = () => Math.min((this.size.width / 160), (this.size.height / 144));

  this.$camera = new Camera(this.context, 'default', {

      'x': () => (this.size.width - 160 * scale()) / 2,
      'y': () => (this.size.height - 144 * scale()) / 2,
      'width': () => 160 * scale(),
      'height': () => 144 * scale(),
      'scale': scale
  });

  this.$cameraInfo = new Camera(this.context, 'info', {

      'x': () => (this.size.width - 160 * scale()) / 2,
      'y': () => (this.size.height - 144 * scale()) / 2,
      'width': () => 160 * scale(),
      'height': () => 144 * scale(),
      'scale': scale
  });

  this.$renderers=getRenderers.call(this);
  this.$systems=getSystems.call(this);

  var entities = loadEntities.call(this);
  this.$world.add(entities);
  generateDecor.call(this,[]);
  this.$camera.look(()=>this.$world.entities.character.get('position').x+48,()=>72);
}

export {start};
