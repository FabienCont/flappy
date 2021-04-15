export default function copyEntities() {
  const debugVariables = this.$variables.$debug;
  const arrayIndex = [];
  debugVariables.selectedElements.forEach((entity) => {
    arrayIndex.push(entity.index);
  });

  this.params.copyEntities({ indexes: arrayIndex, pos: debugVariables.cursorPos });
}
