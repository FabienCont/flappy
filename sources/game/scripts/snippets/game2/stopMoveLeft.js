export default function (entity) {
  const entityForces = entity.get('forces');
  if (entityForces && entityForces.parts && entityForces.parts.moveLeft) {
    delete entityForces.parts.moveLeft;
  }
}
