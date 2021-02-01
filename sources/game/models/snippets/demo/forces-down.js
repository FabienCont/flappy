import { createComponentFromModel } from 'core/loadEntities.js';

export default function forcesDown(entity) {
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: [{
        x: 0,
        y: 8,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 60,
        duration: 250,
        easing: {
          type: 'snippets',
          scope: 'demo',
          name: 'ease-in',
        },
        handling: {
          type: 'snippets',
          scope: 'demo',
          name: 'rotation-limit',
        },
        elapsed: 0,
      }],
    },
  };

  const newForces = createComponentFromModel.call(this, forces);

  entity.get('forces').parts.push(newForces.parts[0]);
}
