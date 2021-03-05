const move = function move(entityPos, x, y) {
  entityPos.x = x;
  entityPos.y = y;
};

export default function entityMove({ x, y }) {
  if (this.$cameras.debug) {
    const pos = this.$variables.$debug.focusElement.get('position');
    const object = {
      index: this.$variables.$debug.focusElement.index,
      component: pos,
      val: { x, y, z: pos.z },
    };
    this.params.updateComponent(object);
    // move(pos, x, y);
  }
}
