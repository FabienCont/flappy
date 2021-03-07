const zoomCamera = function (camera) {
  const scale = camera.screen.scale() + 0.1;
  camera.screen.scale = () => scale;
};

export default function dezoom({ x, y }) {
  const cameras = Object.entries(this.$cameras).forEach(([key, value], i) => {
    zoomCamera(value);
  });
}
