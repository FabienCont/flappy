import { loadSystems } from 'core/loadSystems';

function update() {
  loadSystems.call(this, this.$systems);
}

export { update };
