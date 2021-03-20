export default function deleteEntity() {
  if (this.$variables.$debug.focusElement) {
    this.params.deleteEntity({ index: this.$variables.$debug.focusElement.index });
    this.$variables.$debug.focusElement = null;
  }
}
