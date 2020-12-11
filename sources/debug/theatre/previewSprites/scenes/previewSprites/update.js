import { updateSystems } from 'core/loadSystems';

function update() {
  updateSystems.call(this, this.$systems);
}

export { update };
