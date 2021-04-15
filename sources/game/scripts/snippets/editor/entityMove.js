export default function entityMove({ x, y }) {
  if (this.$cameras.debug) {
    const debugVariables = this.$variables.$debug;
    debugVariables.selectedElements.forEach((entity) => {
      const pos = entity.get('position');
      let newPosX = Math.round(x);
      let newPosY = Math.round(y);
      if (debugVariables.followGrid) {
        newPosX -= (newPosX % debugVariables.stepGrid);
        newPosY -= (newPosY % debugVariables.stepGrid);
      }
      const object = {
        index: entity.index,
        component: pos,
        val: { x: newPosX, y: newPosY, z: pos.z },
      };
      this.params.updateComponent(object);
    });
  }
}
