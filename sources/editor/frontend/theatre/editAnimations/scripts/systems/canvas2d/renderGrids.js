const renderGrids = function renderGrids() {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
  const context = this.context;

  Object.values(this.$cameras).forEach((camera) => {
    const grids = camera.getDicoElement('grids');

    grids.forEach((grid) => {
      const {
        x, y, columns, rows, width, height,
      } = grid;

      const destination = {
        x: camera.screen.x() + x * camera.screen.scale()
          - (camera.position.x() * camera.screen.scale()
          - camera.screen.width() / 2),
        y: camera.screen.y() + y * camera.screen.scale()
          - (camera.position.y() * camera.screen.scale()
          - camera.screen.height() / 2),
        width: width * camera.screen.scale(),
        height: height * camera.screen.scale(),
      };

      const rectWidth = destination.width * columns;
      const rectHeight = destination.height * rows;

      context.strokeStyle = 'red';
      context.lineWidth = 1;

      for (let i = 0; i < rows + 1; i += 1) {
        context.save();
        context.translate(destination.x, destination.y + (destination.height * i));
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(rectWidth, 0);
        context.stroke();
        context.restore();
      }

      for (let i = 0; i < columns + 1; i += 1) {
        context.save();
        context.translate(destination.x + (destination.width * i), destination.y);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, rectHeight);
        context.stroke();
        context.restore();
      }
    });
  });
};
export { renderGrids };
