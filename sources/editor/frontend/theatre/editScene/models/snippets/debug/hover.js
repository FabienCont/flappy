const dezoomCamera = function (camera) {
  const scale = camera.screen.scale() + 0.2;
  camera.screen.scale = () => scale;
};

export default function hover({ x, y }) {
  const $camera = this.$cameras.debug;
  if ($camera) {
    const xPointer = (x - $camera.screen.x()
    + $camera.position.x() * $camera.screen.scale()
    - $camera.screen.width() / 2) / $camera.screen.scale();

    const yPointer = (y - $camera.screen.y()
    + $camera.position.y() * $camera.screen.scale()
    - $camera.screen.height() / 2) / $camera.screen.scale();

    const entitiesHover = [];

    Object.entries(this.$world.entities).forEach(([key, value], i) => {
      const pos = value.get('position');

      if (pos) {
        if (Math.abs(pos.x - xPointer) < 16 && Math.abs(pos.y - yPointer) < 16) {
          entitiesHover.push({ pos, entity: value });
        }
      }
    });

    if (entitiesHover.length === 0) {
      this.$variables.$debug.oldPos = { x, y };
      this.$variables.$debug.focusElement = null;
    } else {
      this.$variables.$debug.oldPos = entitiesHover[0].pos;
      this.$variables.$debug.focusElement = entitiesHover[0].entity;
    }
  }
}
