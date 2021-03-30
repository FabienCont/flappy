export default function cameraMoveUp() {
  if (this.$cameras.debug) {
    this.scripts.snippets.editor.cameraMove({ x: 0, y: -this.$variables.$debug.stepSize });
  }
}
