export default function (entity) {
  const entityForces = entity.get('forces');
  if (entityForces && entityForces.parts && entityForces.parts.moveRight) {
    delete entityForces.parts.moveRight;
    
        
      const spriteSheets = entity.get('sprites');
     
      spriteSheets.parts.ninja.source='ninja_idle'
      
      spriteSheets.parts.ninja.size.width=32;
  }
}
