import { createComponentFromModel } from 'core/loadEntities';

export default function moveRight(entity) {
  this.$variables.started = true;
  const forces = {
    name: 'forces',
    scope: 'common',
    params: {
      parts: {
        moveRight: {
          x: 15,
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
  
  const spriteSheets = entity.get('sprites');
 
  spriteSheets.parts.ninja.source='ninja_run_right'
  
  //spriteSheets.parts.ninja.source='template_run'
  spriteSheets.parts.ninja.size.width=64;
  spriteSheets.parts.ninja.animation.frame=0;
  
  delete entityForces.parts.moveLeft;
  entityForces.parts.moveRight = newForces.parts.moveRight;
}
