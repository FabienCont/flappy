import { Rectangle } from 'modules/shape.js';
import { getCamera } from 'core/loadCameras';

function showHitbox(entities) {
  Object.entries(entities).forEach(([name, entity]) => {
    const cameraComponent = entity.get('camera');
    const hitboxComponent = entity.get('hitbox');
    const positionComponent = entity.get('position');

    const $camera = this.$cameras.debug;

    const hitbox = new Rectangle(

      $camera.screen.x() + (positionComponent.x + hitboxComponent.x) * $camera.screen.scale() - ($camera.position.x() * $camera.screen.scale() - $camera.screen.width() / 2),
      $camera.screen.y() + (positionComponent.y + hitboxComponent.y) * $camera.screen.scale() - ($camera.position.y() * $camera.screen.scale() - $camera.screen.height() / 2),
      hitboxComponent.width * $camera.screen.scale(),
      hitboxComponent.height * $camera.screen.scale(),
    );

    const width = 2;
    const offset = width / 2;

    this.context.save();

    this.context.lineWidth = width;

    this.context.strokeStyle = '#639bff';

    this.context.strokeRect(hitbox.x + offset, hitbox.y + offset, hitbox.width - width, hitbox.height - width);

    this.context.restore();
  });
}

export { showHitbox };
