import { getCamera } from 'core/loadCameras';

function renderText(entities) {
  Object.values(entities).forEach((entity) => {
    const pos = entity.get('position');
    const textComponent = entity.get('text');
    const cameraComponent = entity.get('camera');
    const camera = getCamera.call(this, cameraComponent.cameraName);
    const screenCam = camera.screen;
    const textString = textComponent.text;
    const textFontSize = textComponent.fontSize * screenCam.scale();

    const xOffset = textComponent.x;
    const yOffset = textComponent.y;
    this.context.lineWidth = textComponent.lineWidth * screenCam.scale();
    this.context.font = `${textComponent.fontWeight} ${textFontSize}px ${textComponent.fontFamily}`;
    this.context.fillStyle = textComponent.color;
    this.context.textBaseline = textComponent.textBaseline;
    this.context.textAlign = textComponent.textAlign;
    this.context.canvas.style.letterSpacing = `${textComponent.letterSpacing}px`;
    const textMeasure = this.context.measureText(textString);

    const textWidth = textMeasure.width;
    const textHeight = -textMeasure.actualBoundingBoxDescent;

    const xPos = ((pos.x + xOffset) * screenCam.scale())
    - (textWidth / 2)
    + screenCam.x();

    const yPos = ((pos.y + yOffset) * screenCam.scale())
    + (textHeight / 2)
    + screenCam.y();

    if (textComponent.drawType === 'fill') {
      this.context.fillText(textComponent.text, xPos, yPos);
    } else if (textComponent.drawType === 'stroke') {
      this.context.strokeText(textComponent.text, xPos, yPos);
    }
  });
}

export { renderText };
