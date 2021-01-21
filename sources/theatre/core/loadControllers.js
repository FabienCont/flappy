import { Controllers } from 'modules/controllers';

const loadControllers = function loadControllers() {
  if(this.models.scenes[this.currentScene].inputs !== undefined){
    return new Controllers(this.element, this.models.scenes[this.currentScene].inputs());
  }
  return new Controllers(this.element, []);
};

export { loadControllers };
