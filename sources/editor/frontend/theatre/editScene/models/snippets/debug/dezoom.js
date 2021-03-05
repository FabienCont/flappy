const dezoomCamera = function (camera) {
  const cameraScale = camera.screen.scale();
  const scale = cameraScale < 1 ? cameraScale * 0.9 : cameraScale - 0.2;
  camera.screen.scale = () => scale;
};

export default function dezoom({ x, y }) {
  const cameras = Object.entries(this.$cameras).forEach(([key, value], i) => {
    dezoomCamera(value);
  });
}
