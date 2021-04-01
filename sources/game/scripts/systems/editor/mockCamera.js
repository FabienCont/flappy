import { generateCameras } from 'core/loadCameras';

function mockCamera(entities) {
  Object.values(entities).forEach((entity) => {
    const cameraComponent = entity.get('camera');
    if (cameraComponent) {
      cameraComponent.cameraName = 'debug';
      cameraComponent.opacity = 1;
    }
  });
}

export { mockCamera };
