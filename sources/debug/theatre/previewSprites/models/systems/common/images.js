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
    imagesComponent.parts.forEach((image) => {
      const {
        frames, opacity,
      } = image;

      let { source } = image;

      let [x, y, width, height] = frames[image.frame];

      const destination = image.destination || {
        x: 0, y: 0, z: 0, width, height,
      };

      if (typeof source === 'undefined') {
        source = this.assets.images.common['placeholder-8x1']();

        x %= 8;
        y %= 1;
        width = 1;
        height = 1;
      }

      camera.add('images', {
        rotate: {
          x: rotateX,
          y: rotateY,
          z: rotateZ,
        },
        source: this.assets.images[source.scope][source.file](),
        frame: {
          x,
          y,
          width,
          height,
        },
        destination: {
          x: (positionComponent.x + destination.x),
          y: (positionComponent.y + destination.y),
          z: positionComponent.z + destination.z,
          width: (destination.width),
          height: (destination.height),
        },
        opacity: cameraComponent.opacity * opacity,
      });
    });
  });
}

export { images };
