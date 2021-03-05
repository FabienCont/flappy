export default function entityDrag({ x, y }) {
  if (this.$cameras.debug) {
    const $camera = this.$cameras.debug;
    const xPointer = (x - $camera.screen.x()
    + $camera.position.x() * $camera.screen.scale()
    - $camera.screen.width() / 2) / $camera.screen.scale();

    const yPointer = (y - $camera.screen.y()
    + $camera.position.y() * $camera.screen.scale()
    - $camera.screen.height() / 2) / $camera.screen.scale();

    this.models.snippets.debug.entityMove({ x: xPointer, y: yPointer });
  }
}
