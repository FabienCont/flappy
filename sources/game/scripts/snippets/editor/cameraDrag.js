export default function cameraDrag({ x, y }) {
  if (this.$cameras.debug) {
    const xStep = this.$variables.$debug.oldPos.x - x;
    const yStep = this.$variables.$debug.oldPos.y - y;
    this.scripts.snippets.editor.cameraMove({ x: xStep / 10, y: yStep / 10 });
  }
}
