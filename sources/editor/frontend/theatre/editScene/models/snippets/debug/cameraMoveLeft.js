export default function cameraMoveLeft() {
  if (this.$cameras.debug) {
    this.models.snippets.debug.cameraMove({ x: -this.$variables.$debug.stepSize, y: 0 });
  }
}
