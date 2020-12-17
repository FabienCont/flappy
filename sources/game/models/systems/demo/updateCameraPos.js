function updateCameraPos(entities) {
  const entitiesValues = Object.values(entities);
  if (entitiesValues.length === 1) {
    const character = entitiesValues[0];
    this.$cameras.default.look(() => character.get('position').x + 48, () => 72, () => character.get('position').z);
  }
}

export { updateCameraPos };
