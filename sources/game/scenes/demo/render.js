// import {fade} from 'systems/common/fade.js';
import { loadRenderers } from 'core/loadRenderers';
// import { showHitbox } from 'systems/common/showHitbox';

function render() {
  // console.log('render demo scene');

  this.cleanCanvas();

  loadRenderers.call(this, this.$renderers);
}

export { render };
