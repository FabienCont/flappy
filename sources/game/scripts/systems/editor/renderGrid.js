function renderGrid(entities) {
  const camera = this.$cameras.debug;
  const screenCam = camera.screen;
  const ctx = this.context;

  const step = this.$variables.$debug.stepGrid * screenCam.scale();

  const xPosScale = camera.position.x() * camera.screen.scale();
  const yPosScale = camera.position.y() * camera.screen.scale();
  const destination = {
    x: (-xPosScale + camera.screen.width() / 2) % step,
    y: (-yPosScale + camera.screen.height() / 2) % step,
    width: camera.screen.width(),
    height: camera.screen.height(),
  };

  if ((Math.abs(destination.height - destination.y) / step) < 100 || (Math.abs(destination.width - destination.x) / step) < 100) {
    ctx.beginPath();
    for (let xPos = destination.x; xPos <= destination.width; xPos += step) {
      ctx.moveTo(xPos, 0);
      ctx.lineTo(xPos, destination.height);
    }

    // the stroke will actually paint the current path
    for (let yPos = destination.y; yPos <= destination.height; yPos += step) {
      ctx.moveTo(0, yPos);
      ctx.lineTo(destination.width, yPos);
    }
    // set the color of the line
    ctx.strokeStyle = 'rgb(255,255,255)';

    const alpha = ctx.globalAlpha;

    ctx.globalAlpha = 0.3;
    // just for fun
    ctx.lineWidth = 0.5;
    // for your original question - you need to stroke only once
    ctx.stroke();

    ctx.globalAlpha = alpha;
  }
}

export { renderGrid };
