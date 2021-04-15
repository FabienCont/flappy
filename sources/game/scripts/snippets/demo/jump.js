import { createComponentFromModel } from 'core/loadEntities';

export default function jump(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        jump: {
          x: 0,
          y: -20,
          z: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: -180,
          duration: 200,
          easing: {
            scope: 'demo',
            name: 'ease-out',
          },
          elapsed: 0,
          ending: {
            scope: 'demo',
            name: 'forces-down',
          },
          handling: {
            scope: 'demo',
            name: 'rotation-limit',
          },
        },
      },
    },
  };
  const newForces = createComponentFromModel.call(this, forces);

  const { parts } = entity.get('forces');
  Object.keys(parts).forEach((key) => {
    if (key !== 'infiniteMove') delete parts[key];
  });

  this.assets.sounds.demo.jump().play();
  parts.jump = newForces.parts.jump;
}
