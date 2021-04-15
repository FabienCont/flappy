export default function select() {
  const debugVariables = this.$variables.$debug;
  debugVariables.isClicked = true;
  if (debugVariables.hoverElements.length > 0 && debugVariables.entitySelection === true) {
    const clickedElement = debugVariables.hoverElements[debugVariables.hoverLevel];
    if (debugVariables.multipleSelection !== true
        && debugVariables.selectedElements.length === 1
        && clickedElement === debugVariables.selectedElements[0]) {
      debugVariables.isFocus = true;
      debugVariables.focusElement = clickedElement;
      this.params.focusEntity(debugVariables.focusElement.index);
    } else {
      debugVariables.isFocus = false;
      debugVariables.focusElement = null;
      debugVariables.selectedElements.splice(0);
      debugVariables.selectedElements.push(clickedElement);
    }
  } else {
    debugVariables.isFocus = false;
    debugVariables.selectedElements.splice(0);
    debugVariables.focusElement = null;
  }
}
