const move = function move(camera, x, y) {
  const xCopy = camera.position.x();
  const yCopy = camera.position.y();
  camera.look(() => xCopy + x, () => yCopy + y, () => camera.position.z);
};

export default function cameraMove({ x, y }) {
  if (this.$cameras.debug) {
    move(this.$cameras.debug, x, y);
  }
}
