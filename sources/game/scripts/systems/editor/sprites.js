import { getCamera } from 'core/loadCameras';

function sprites(entities) {
  Object.values(entities).forEach((entity) => {
    const cameraComponent = entity.get('camera');
    const camera = getCamera.call(this, cameraComponent.cameraName);
    const spritesComponent = entity.get('sprites');
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

    Object.values(spritesComponent.parts).forEach((sprite) => {
      try {
        const spritesDef = this.sprites[sprite.source]();

        const { opacity } = sprite;
        const {
          x, y, width, height,
        } = spritesDef.frames[sprite.animation.frame];

        const destination = sprite.destination || {
          x: 0, y: 0, z: 0,
        };

        const imageSrc = this.assets.images[spritesDef.scope][spritesDef.file]();

        const size = sprite.size || {
          width: imageSrc.naturalWidth, height: imageSrc.naturalHeight,
        };

        this.$cameras.debug.add('images', {
          rotate: {
            x: rotateX,
            y: rotateY,
            z: rotateZ,
          },
          source: imageSrc,
          frame: {
            x,
            y,
            width,
            height,
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

export { sprites };
