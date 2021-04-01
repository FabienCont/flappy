export default function pasteEntity() {
  console.log('paste', this.$variables.$debug.cursorPos);
  let newPosX = this.$variables.$debug.cursorPos.x;
  let newPosY = this.$variables.$debug.cursorPos.y;
  if (this.$variables.$debug.followGrid) {
    newPosX -= (newPosX % this.$variables.$debug.stepGrid);
    newPosY -= (newPosY % this.$variables.$debug.stepGrid);
  }
  this.params.pasteEntity(newPosX, newPosY);
}
