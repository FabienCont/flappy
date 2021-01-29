import { updateSystems } from 'core/loadSystems';

function update() {
  // this.logger.log(`update ${this.currentScene} scene`);

  updateSystems.call(this, this.$systems);
}

export { update };
