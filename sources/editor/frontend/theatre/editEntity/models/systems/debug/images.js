import { getCamera } from 'core/loadCameras';

function images(entities) {
  Object.values(entities).forEach((entity) => {
    const cameraComponent = entity.get('camera');
    const camera = getCamera.call(this, cameraComponent.cameraName);
    const imagesComponent = entity.get('images');
    const positionComponent = entity.get('position');
    const rotateComponent = entity.get('rotate');

    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;
    if (rotateComponent) {
      rotateX = rotateComponent.x;
      rotateY = rotateComponent.y;
      rotateZ = rotateComponent.z;
    }
    Object.values(imagesComponent.parts).forEach((image) => {
      try {
        const {
          opacity, source,
        } = image;

        let sourceImage = '';

        const destination = image.destination || {
          x: 0, y: 0, z: 0,
        };

        sourceImage = this.assets.images[source.scope][source.file]();

        const size = image.size || {
          width: sourceImage.naturalWidth, height: sourceImage.naturalHeight,
        };

        camera.add('images', {
          rotate: {
            x: rotateX,
            y: rotateY,
            z: rotateZ,
          },
          source: sourceImage,
          frame: {
            x: 0,
            y: 0,
            width: sourceImage.naturalWidth,
            height: sourceImage.naturalHeight,
          },
          destination: {
            x: (positionComponent.x + destination.x - size.width / 2),
            y: (positionComponent.y + destination.y - size.height / 2),
            z: positionComponent.z + destination.z,
            width: (size.width),
            height: (size.height),
          },
          opacity: cameraComponent.opacity * opacity,
        });
      } catch (err) {

      }
    });
  });
}

export { images };
