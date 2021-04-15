import { createComponentFromModel } from 'core/loadEntities';

export default function moveTop(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        jump: {
          x: 0,
          y: -35,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 300,
          elapsed: 0,
          easing: {
            scope: 'ease',
            name: 'easeOutCubic',
          },
          ending: {
            scope: 'game2',
            name: 'fall',
          },
        },
      },
    },
  };
  const newForces = createComponentFromModel.call(this, forces);

  const entityForces = entity.get('forces');
  if (entityForces.parts.fall) {
    delete entityForces.parts.fall;
  }

  entityForces.parts.jump = newForces.parts.jump;
}
