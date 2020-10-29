import {Camera} from 'modules/camera.js';
import {Controllers} from 'modules/controllers.js';
import {World} from 'modules/world.js';
import {getRenderers} from 'core/loadRenderers';
import {getSystems} from 'core/loadSystems';
import {generateDecor} from 'systems/demo/generateDecor'

function setup() {

    console.log('setup demo scene');

    this.$origins = {
        'default': {
            'x': () => 0,
            'y': () => -20,
            'z': () => 0,
            'scale': () => 1
        }
    };

    this.$controllers = new Controllers(this.element, this.models.scenes[this.currentScene]['inputs']());
    this.$world = new World(this);
    this.$camera = new Camera(this.context ,'default',{
        'x': () => 0,
        'y': () => 0,
        'width': () => this.size.width,
        'height': () => this.size.height,
        'scale': () => 3
    });

    this.$renderers=getRenderers.call(this);
    this.$systems=getSystems.call(this);

    generateDecor.call(this,{});

}

export {setup};
