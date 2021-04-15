import { createComponentFromModel } from 'core/loadEntities';

export default function gravity(entity) {
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: [{
        y: 8,
        duration: 0,
        easing: {
          type: 'snippets',
          scope: 'game2',
          name: 'easeInQuart',
        },
        elapsed: 0,
      }],
    },
  };

  const newForces = createComponentFromModel.call(this, forces);

  entity.get('forces').parts.push(newForces.parts[0]);
}
