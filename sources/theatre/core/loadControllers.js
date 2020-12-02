import { Controllers } from 'modules/controllers';

const loadControllers = function loadControllers() {
  return new Controllers(this.element, this.models.scenes[this.currentScene].inputs());
};

export { loadControllers };
