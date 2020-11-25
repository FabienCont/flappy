import { createComponentFromModel } from 'core/loadEntities.js';

export default function (entity) {
  const rotateForce = 5 - entity.get('rotate').rotate;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: [{
        x: 0,
        y: 8,
        z: 0,
        rotateX: rotateForce,
        rotateY: rotateForce,
        rotateZ: rotateForce,
        duration: 250,
        easing: {
          type: 'snippets',
          scope: 'demo',
          name: 'ease-in',
        },
        elapsed: 0,
        ending: null,
        handling: null,
      }],
    },
  };

  const newForces = createComponentFromModel.call(this, forces);

  entity.get('forces').parts.push(newForces.parts[0]);
}
