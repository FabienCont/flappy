export default function pasteEntity() {
  console.log('paste', this.$variables.$debug.cursorPos);
  this.params.pasteEntity(this.$variables.$debug.cursorPos.x, this.$variables.$debug.cursorPos.y);
}
