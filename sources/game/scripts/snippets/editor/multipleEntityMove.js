export default function multipleEntityMove({ x, y }) {
  if (this.$cameras.debug) {
    const debugVariables = this.$variables.$debug;

    let deltaX = Math.round(x - debugVariables.oldPos.x);
    let deltaY = Math.round(y - debugVariables.oldPos.y);

    if (debugVariables.followGrid) {
      deltaX -= (deltaX % debugVariables.stepGrid);
      deltaY -= (deltaY % debugVariables.stepGrid);
    }
    debugVariables.selectedElements.forEach((entity) => {
      const pos = entity.get('position');

      const object = {
        index: entity.index,
        component: pos,
        val: { x: pos.x + deltaX, y: pos.y + deltaY, z: pos.z },
      };
      this.params.updateComponent(object);
    });
  }
}
