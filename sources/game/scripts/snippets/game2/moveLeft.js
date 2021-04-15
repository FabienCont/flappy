import { createComponentFromModel } from 'core/loadEntities';

export default function moveLeft(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        moveLeft: {
          x: -5,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 100,
          easing: {
            scope: 'demo',
            name: 'ease-linear',
          },
          elapsed: 0,
        },
      },
    },
  };
  const newForces = createComponentFromModel.call(this, forces);

  const entityForces = entity.get('forces');
  entityForces.parts.moveLeft = newForces.parts.moveLeft;
}
