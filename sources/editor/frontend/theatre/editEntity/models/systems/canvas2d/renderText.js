const renderText = function renderText() {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
  const context = this.context;
  Object.values(this.$cameras).forEach((camera) => {
    const unsortedTexts = camera.getDicoElement('text');

    const sortText = (a, b) => a.destination.z - b.destination.z;

    const texts = unsortedTexts.sort(sortText);

    if (camera.screen.opacity === 0) {
      return;
    }

    texts.forEach((textObject) => {
      const {
        destination, info, rotate,
      } = textObject;

      const {
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
      } = info;

      const screenCam = camera.screen;
      const textFontSize = fontSize * screenCam.scale();

      this.context.lineWidth = lineWidth * screenCam.scale();
      this.context.font = `${fontWeight} ${textFontSize}px ${fontFamily}`;
      this.context.fillStyle = color;
      this.context.textBaseline = textBaseline;
      this.context.textAlign = textAlign;
      this.context.canvas.style.letterSpacing = `${letterSpacing}px`;
      const textMeasure = this.context.measureText(text);

      const textWidth = textMeasure.width;
      const textHeight = -textMeasure.actualBoundingBoxDescent;

      const isVisible = camera.visible(

        destination.x * screenCam.scale(),
        destination.x * screenCam.scale(),
        textWidth * screenCam.scale(),
        textHeight * screenCam.scale(),
      );

      const opacityGlobal = opacity * screenCam.opacity;

      if (opacityGlobal > 0
            && isVisible === true) {
        const alpha = context.globalAlpha;

        context.globalAlpha = opacityGlobal;

        const canvasX = screenCam.x() + destination.x * screenCam.scale()
            - (camera.position.x() * screenCam.scale()
            - screenCam.width() / 2);
        const canvasY = screenCam.y() + destination.y * screenCam.scale()
            - (camera.position.y() * screenCam.scale()
            - screenCam.height() / 2);
        const canvasWidth = textWidth * screenCam.scale();
        const canvasHeight = textHeight * screenCam.scale();

        context.save();
        context.translate(canvasX - (canvasWidth / 2),
          canvasY + (canvasHeight / 2));
        context.rotate((rotate.z * Math.PI) / 180);
        context.scale(1, Math.cos((rotate.x * Math.PI) / 180));
        context.scale(Math.cos((rotate.y * Math.PI) / 180), 1);

        if (drawType === 'fill') {
          this.context.fillText(text, 0, 0);
        } else if (drawType === 'stroke') {
          this.context.strokeText(text, 0, 0);
        }

        context.restore();

        context.globalAlpha = alpha;
      }
    });
  });
};
export { renderText };
