import { createComponentFromModel } from 'core/loadEntities';

export default function forceTest(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        forceTest: {
          x: 5,
          y: 5,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 100,
          easing: {
            scope: 'demo',
            name: 'ease-linear',
          },
          ending:false,
        },
      },
    },
  };
  const newForces = createComponentFromModel.call(this, forces);

  const entityForces = entity.get('forces');
  entityForces.parts.forceTest = newForces.parts.forceTest;
}
