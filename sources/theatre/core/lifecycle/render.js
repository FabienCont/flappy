import { updateRenderers } from 'core/loadRenderers';
// import { draw, createSquare } from 'core/webGL';

function render() {
  // this.logger.log('render loading scene');

  this.cleanCanvas();

  updateRenderers.call(this, this.$renderers);
}

export { render };
