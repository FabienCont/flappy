import { getCamera } from 'core/loadCameras';

function grids(entities) {
  Object.values(entities).forEach((entity) => {
    const cameraComponent = entity.get('camera');
    const camera = getCamera.call(this, cameraComponent.cameraName);
    const gridComponent = entity.get('grid');
    camera.add('grids', gridComponent);
  });
}

export { grids };
