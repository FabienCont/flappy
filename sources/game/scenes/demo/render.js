//import {fade} from 'systems/common/fade.js';
import {loadRenderers} from 'core/loadRenderers';

function render() {
    // console.log('render demo scene');

    this.context.fillStyle = '#cbdbfc';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    //this.$world.system(['camera', 'fade'], fade);

    loadRenderers.call(this,this.$renderers);

    this.$camera.render();
}

export {render};
