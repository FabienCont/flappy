export default function rotateLimit(entity, x, y, z, rotateX, rotateY, rotateZ, elapsed) {
  const maxRotate = 60;
  const rotate = entity.get('rotate');
  if (Math.abs(rotate.z) > maxRotate) {
    rotate.z = Math.sign(rotate.z) * maxRotate;
  }
}

export { rotateLimit };
