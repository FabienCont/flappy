const dezoomCamera = function (camera) {
  const scale = camera.screen.scale() + 0.2;
  camera.screen.scale = () => scale;
};

export default function hover({ x, y }) {
  const $camera = this.$cameras.debug;
  const debugVariables = this.$variables.$debug;
  if ($camera) {
    const entitiesHover = [];
    Object.entries(this.$world.entities).forEach(([key, value], i) => {
      const pos = value.get('position');

      if (pos) {
        const distance = debugVariables.stepGrid;
        if (Math.abs(pos.x - x) < distance && Math.abs(pos.y - y) < distance) {
          entitiesHover.push(value);
        }
      }
    });

    if (debugVariables.entitySelection === false) {
      debugVariables.oldPos = { x, y };
      debugVariables.hoverElements.splice(0);
    } else {
      debugVariables.hoverElements.splice(0);
      debugVariables.hoverElements = [...debugVariables.hoverElements, ...entitiesHover];
      if (debugVariables.hoverElements[debugVariables.hoverLevel]) {
        debugVariables.oldPos = debugVariables.hoverElements[debugVariables.hoverLevel].get('position');
      } else if (debugVariables.hoverLevel > debugVariables.hoverElements.length - 1 && debugVariables.hoverElements.length > 0) {
        debugVariables.hoverLevel = 0;
        debugVariables.oldPos = debugVariables.hoverElements[debugVariables.hoverLevel].get('position');
      } else {
        debugVariables.oldPos = { x, y };
      }
    }
  }
}
