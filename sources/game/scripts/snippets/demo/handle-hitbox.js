import { createComponentFromModel, generateEntities } from 'core/loadEntities.js';

export default function (entity, collision) {
  const newEntities = generateEntities.call(this, [this.models.entities.demo.splashEnd()]);

  this.$world.add(newEntities);

  entity.remove('inputs');
  entity.remove('hitbox');
  entity.remove('forces');

  const timeout = {
    name: 'timeout',
    scope: 'common',
    params: {
      duration: 2000,
      elapsed: 0,
      ending: {
        scope: 'demo',
        name: 'timeout-ending',
      },
    },
  };

  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        fall:
        {
          x: 0,
          y: -20,
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
        },
      },
    },
  };

  const newForces = createComponentFromModel.call(this, forces);
  const newTimeout = createComponentFromModel.call(this, timeout);

  this.assets.sounds.demo.explode().play();
  entity.add(newForces);
  entity.add(newTimeout);
}
