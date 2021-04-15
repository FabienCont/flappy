import { createComponentFromModel } from 'core/loadEntities.js';

export default function fall(entity) {
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        fall: {
          x: 0,
          y: 20,
          z: 0,
          duration: 250,
          easing: {
            scope: 'ease',
            name: 'easeInCubic',
          },
          elapsed: 0,
        },
      },
    },
  };

  const newForces = createComponentFromModel.call(this, forces);

  entity.get('forces').parts.fall = newForces.parts.fall;
}
