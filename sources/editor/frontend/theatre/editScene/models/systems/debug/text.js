import { getCamera } from 'core/loadCameras';

function text(entities) {
  Object.values(entities).forEach((entity) => {
    const cameraComponent = entity.get('camera');
    const camera = getCamera.call(this, cameraComponent.cameraName);
    const textComponent = entity.get('text');
    const positionComponent = entity.get('position');
    const rotateComponent = entity.get('rotate');

    const {
      x, y, z,
      color,
      text,
      fontFamily,
      fontWeight,
      fontSize,
      lineWidth,
      letterSpacing,
      textBaseline,
      textAlign,
      drawType,
      opacity,
    } = textComponent;

    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;
    if (rotateComponent) {
      rotateX = rotateComponent.x;
      rotateY = rotateComponent.y;
      rotateZ = rotateComponent.z;
    }

    this.$cameras.debug.add('text', {
      rotate: {
        x: rotateX,
        y: rotateY,
        z: rotateZ,
      },
      info: {
        text,
        fontSize,
        color,
        fontFamily,
        fontWeight,
        lineWidth,
        letterSpacing,
        textBaseline,
        textAlign,
        drawType,
        opacity,
      },
      destination: {
        x: (positionComponent.x + x),
        y: (positionComponent.y + y),
        z,
      },
    });
  });
}

export { text };
