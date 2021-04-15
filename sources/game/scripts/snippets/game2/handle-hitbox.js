export default function (entity, collision, entityB) {
  const { from } = collision;
  if (from.bottom) {
    entity.get('position').y -= collision.delta.bottom;
  } else if (from.top) {
    entity.get('position').y -= collision.delta.top;
  } else if (from.left) {
    entity.get('position').x -= collision.delta.left;
  } else if (from.right) {
    entity.get('position').x -= collision.delta.right;
  }
}
