import {Camera} from 'modules/camera.js';
import {Controllers} from 'modules/controllers.js';
import {World} from 'modules/world.js';
import {getRenderers} from 'core/loadRenderers';
import {getSystems} from 'core/loadSystems';

function setup() {

    console.log('setup demo scene');

    this.$origins = {
        'default': {
            'x': this.size.width / 2,
            'y': this.size.height / 2,
            'z': 0,
            'scale': 1
        }
    };

    this.$controllers = new Controllers(this.element, this.models.scenes[this.currentScene]['inputs']());
    this.$world = new World(this);
    this.$camera = new Camera(this.context, this.size.width, this.size.height);
    this.$renderers=getRenderers.call(this);
    this.$systems=getSystems.call(this);

}

export {setup};
