export default function (entity, collision, entityB) {
  const { from } = collision;

  if (from.top) {
    console.log('!! top collision');
    entity.get('position').y -= collision.delta.top;
  }
  if (from.bottom) {
    console.log('collision');
    entity.get('position').y -= collision.delta.bottom;
  }
  if (from.left) {
    console.log('!! left collision');
    entity.get('position').x -= collision.delta.left;
  }
  if (from.right) {
    console.log('!! right collision');
    entity.get('position').x -= collision.delta.right;
  }

  console.log(entity.get('position'));
}
