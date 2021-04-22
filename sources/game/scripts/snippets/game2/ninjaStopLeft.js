export default function (entity) {
  const entityForces = entity.get('forces');
  if (entityForces && entityForces.parts && entityForces.parts.moveLeft) {
    delete entityForces.parts.moveLeft;
    
  }

  if(!entityForces.parts.moveRight){
          
      const spriteSheets = entity.get('sprites');
     
      spriteSheets.parts.ninja.source='ninja_idle'
      spriteSheets.parts.ninja.animation.frame=0;
      spriteSheets.parts.ninja.size.width=32;
  }
}
