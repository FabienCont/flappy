import { getCamera } from 'core/loadCameras';

function renderShapes2d(entities) {
  Object.values(entities).forEach((entity) => {
    const pos = entity.get('position');
    const shapesComponent = entity.get('shapes2d');
    const cameraComponent = getCamera(entity.get('camera').name);
    const screenCam = cameraComponent.screen;
    const xOffset = shapesComponent.x;
    const yOffset = shapesComponent.y;
  });
}

export { renderShapes2d };
