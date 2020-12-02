import { World } from 'modules/world';

const loadWorld = function loadWorld() {
  return new World(this);
};

export { loadWorld };
