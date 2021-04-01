import { createComponentFromModel } from 'core/loadEntities';

export default function moveLeft(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: [
        {
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
      ],
    },
  };
  const newForces = createComponentFromModel.call(this, forces);

  const entityForces = entity.get('forces');
  if (entityForces) {
    if (entityForces.parts.length > 0) {
      entityForces.parts.pop();
    }
    entityForces.parts.push(newForces.parts[0]);
  } else {
    entity.add('forces').parts.push(newForces.parts[0]);
  }
}
