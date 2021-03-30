export default function entityMove({ x, y }) {
  if (this.$cameras.debug) {
    const pos = this.$variables.$debug.focusElement.get('position');
    let newPosX = Math.round(x);
    let newPosY = Math.round(y);
    if (this.$variables.$debug.followGrid) {
      newPosX -= (newPosX % this.$variables.$debug.stepGrid);
      newPosY -= (newPosY % this.$variables.$debug.stepGrid);
    }
    const object = {
      index: this.$variables.$debug.focusElement.index,
      component: pos,
      val: { x: newPosX, y: newPosY, z: pos.z },
    };
    this.params.updateComponent(object);
    // move(pos, x, y);
  }
}
