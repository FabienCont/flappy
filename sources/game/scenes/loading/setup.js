import {getRenderers} from 'core/loadRenderers';
import {getSystems} from 'core/loadSystems';

function setup() {

    console.log('setup loading scene');
    this.$renderers=getRenderers.call(this);
    this.$systems=getSystems.call(this);
}

export {setup};
