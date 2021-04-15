export default function multipleSelect() {
  const debugVariables = this.$variables.$debug;
  debugVariables.isClicked = true;
  if (debugVariables.hoverElements.length > 0 && debugVariables.multipleSelection === true) {
    const clickedElement = debugVariables.hoverElements[debugVariables.hoverLevel];
    const index = debugVariables.selectedElements.indexOf(clickedElement);
    debugVariables.isFocus = false;
    debugVariables.focusElement = null;
    if (index === -1) {
      debugVariables.selectedElements.push(clickedElement);
    } else {
      debugVariables.selectedElements.splice(index, 1);
    }
  } else {
    debugVariables.isFocus = false;
    debugVariables.selectedElements.splice(0);
    debugVariables.focusElement = null;
  }
}
