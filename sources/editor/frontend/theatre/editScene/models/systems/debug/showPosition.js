import { Rectangle } from 'modules/shape.js';
import { getCamera } from 'core/loadCameras';

function showPosition(entities) {
  Object.entries(entities).forEach(([name, entity]) => {
    const cameraComponent = entity.get('camera');
    const positionComponent = entity.get('position');

    const $camera = this.$cameras.debug;

    const position = new Rectangle(

      $camera.screen.x() + (positionComponent.x) * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2),
      $camera.screen.y() + (positionComponent.y) * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2),
      2 * $camera.screen.scale(),
      2 * $camera.screen.scale(),
    );

    const width = 2;
    const offset = width / 2;

    this.context.save();

    this.context.lineWidth = width;
    if (this.$variables.$debug.focusElement && this.$variables.$debug.focusElement.id === entity.id) {
      this.context.fillStyle = '#32CD32';
    } else {
      this.context.fillStyle = '#A9A9A9';
    }

    this.context.fillRect(position.x, position.y, 5, 5);
    this.context.restore();
  });
}

export { showPosition };
