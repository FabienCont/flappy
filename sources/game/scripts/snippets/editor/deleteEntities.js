export default function deleteEntities() {
  const debugVariables = this.$variables.$debug;
  const arrayIndex = [];
  debugVariables.selectedElements.forEach((entity) => {
    arrayIndex.push(entity.index);
  });

  this.params.deleteEntities({ indexes: arrayIndex });
  debugVariables.selectedElements.splice(0);
}
