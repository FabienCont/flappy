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
        destination, framerate, frames, opacity,
      } = image;

      const { source } = image;

      let sourceImage = '';

      let [x, y, width, height] = frames[image.frame];
      try {
        if (typeof source === 'undefined') {
          sourceImage = this.assets.images.common['placeholder-8x1']();

          x %= 8;
          y %= 1;
          width = 1;
          height = 1;
        } else sourceImage = this.assets.images[source.scope][source.file]();

        camera.add('images', {
          rotate: {
            x: rotateX,
            y: rotateY,
            z: rotateZ,
          },
          source: sourceImage,
          frame: {
            x: width * x,
            y: height * y,
            width,
            height,
          },
          destination: {

            x: (positionComponent.x + destination[0]),
            y: (positionComponent.y + destination[1]),
            z: positionComponent.z + destination[2],
            width: (destination[3]),
            height: (destination[4]),
          },
          opacity: cameraComponent.opacity * opacity,
        });
      } catch (err) {
      }
    });
  });
}

export { images };
