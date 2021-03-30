import { Rectangle } from 'modules/shape.js';

function showCameras(entities) {
  if (this.$variables.$debug.cameras) {
    this.context.save();

    const width = 2;
    const offset = width / 2;
    this.context.lineWidth = width;

    this.context.strokeStyle = '#639bff';
    const $cameras = Object.entries(this.$variables.$debug.cameras).forEach(([name, camera]) => {
      const $debugCamera = this.$cameras.debug;

      const cameraRect = new Rectangle(
        $debugCamera.screen.x() + (camera.position.x() - camera.size.width() / 2) * $debugCamera.screen.scale() - ($debugCamera.position.x() * $debugCamera.screen.scale() - $debugCamera.screen.width() / 2),
        $debugCamera.screen.y() + (camera.position.y() - camera.size.height() / 2) * $debugCamera.screen.scale() - ($debugCamera.position.y() * $debugCamera.screen.scale() - $debugCamera.screen.height() / 2),
        (camera.screen.width() / camera.screen.scale()) * $debugCamera.screen.scale(),
        (camera.screen.height() / camera.screen.scale()) * $debugCamera.screen.scale(),
      );

      this.context.strokeRect(cameraRect.x + offset, cameraRect.y + offset, cameraRect.width - width, cameraRect.height - width);
    });

    this.context.restore();
  }
}

export { showCameras };
