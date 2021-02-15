import { generateCameras } from 'core/loadCameras';

function mockCamera(entities) {
  Object.values(entities).forEach((entity) => {
    const cameraComponent = entity.get('camera');
    if (!this.$cameras[cameraComponent.cameraName]) {
      const cameraInfo = [
        {
          name: cameraComponent.cameraName,
          type: 'contain-framed',
          params: {
            width: 200,
            height: 200,
          },
        },
      ];
      this.$cameras = generateCameras.call(this, cameraInfo);
    }
  });
}

export { mockCamera };
