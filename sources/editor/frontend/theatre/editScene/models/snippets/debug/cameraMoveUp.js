export default function cameraMoveUp() {
  if (this.$cameras.debug) {
    this.models.snippets.debug.cameraMove({ x: 0, y: -this.$variables.$debug.stepSize });
  }
}