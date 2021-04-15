import { createComponentFromModel } from 'core/loadEntities';

export default function moveRight(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        moveRight: {
          x: 5,
          y: 0,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 100,
          easing: {
            scope: 'demo',
            name: 'ease-linear',
          },
        },
      },
    },
  };
  const newForces = createComponentFromModel.call(this, forces);

  const entityForces = entity.get('forces');
  entityForces.parts.moveRight = newForces.parts.moveRight;
}
