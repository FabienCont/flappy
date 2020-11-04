//import {fade} from 'systems/common/fade.js';
import {loadRenderers} from 'core/loadRenderers';
import {showHitbox} from 'systems/common/showHitbox';
function render() {
    // console.log('render demo scene');

    this.context.fillStyle = '#000000';
    this.context.fillRect(0, 0, this.size.width, this.size.height);

    loadRenderers.call(this,this.$renderers);

    this.$camera.render();
    this.$cameraInfo.render();
   //this.$world.system(["camera", "hitbox", "origin", "position"], showHitbox);

}

export {render};
