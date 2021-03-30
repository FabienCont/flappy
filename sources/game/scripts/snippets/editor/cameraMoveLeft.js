export default function cameraMoveLeft() {
  if (this.$cameras.debug) {
    this.scripts.snippets.editor.cameraMove({ x: -this.$variables.$debug.stepSize, y: 0 });
  }
}
