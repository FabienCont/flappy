import { updateRenderers } from 'core/loadRenderers';

function render() {
  this.cleanCanvas();

  updateRenderers.call(this, this.$renderers);
}

export { render };
