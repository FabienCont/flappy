export default function (entity, forceX, forceY, forceZ) {
  if (Math.abs(forceX) > 20) {
    entity.get('position').x -= Math.sign(forceX) * (Math.abs(forceX) - 20);
  }
  if (Math.abs(forceY) > 20) {
    entity.get('position').y -= Math.sign(forceY) * (Math.abs(forceY) - 20);
  }
  if (Math.abs(forceZ) > 20) {
    entity.get('position').z -= Math.sign(forceZ) * (Math.abs(forceZ) - 20);
  }
}
