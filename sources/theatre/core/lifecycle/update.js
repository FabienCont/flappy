import { updateSystems } from 'core/loadSystems';

function update() {
  // console.log(`update ${this.currentScene} scene`);

  updateSystems.call(this, this.$systems);
}

export { update };
