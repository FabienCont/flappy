export default function changeHoverLevel() {
  this.$variables.$debug.hoverLevel++;
  if (this.$variables.$debug.hoverLevel > this.$variables.$debug.hoverElements.length - 1) {
    this.$variables.$debug.hoverLevel = 0;
  }
}
