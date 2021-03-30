export default function copyEntity() {
  if (this.$variables.$debug.focusElement) {
    this.params.copyEntity(this.$variables.$debug.focusElement.index);
  }
}
