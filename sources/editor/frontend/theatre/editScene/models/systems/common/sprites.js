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

    spritesComponent.parts.forEach((sprite) => {
      const spriteSource = sprite.source;
      const spritesDef = this.sprites[spriteSource.name]();
      let imageSrc = this.assets.images[spritesDef.scope][spritesDef.file]();

      const { frame, opacity } = sprite.info;
      let {
        x, y, width, height,
      } = spritesDef.frames[frame];
      const destination = sprite.info.destination || [0, 0, 0, width, height];

      if (typeof imageSrc === 'undefined') {
        imageSrc = this.assets.spritesAlias.common['placeholder-8x1']();

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
        source: imageSrc,
        frame: {
          x,
          y,
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
    });
  });
}

export { sprites };
