const renderImages = function renderImages() {
  /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */
  const context = this.context;
  Object.values(this.$cameras).forEach((camera) => {
    let { images } = camera.getDico();

    if (images) {
      const sortImages = (a, b) => a.destination.z - b.destination.z;

      images = images.sort(sortImages);

      if (camera.screen.opacity === 0) {
        return;
      }

      images.forEach((image) => {
        const {
          destination, frame, opacity, source, rotate,
        } = image;

        const isVisible = camera.visible(

          destination.x * camera.screen.scale(),
          destination.y * camera.screen.scale(),
          destination.width * camera.screen.scale(),
          destination.height * camera.screen.scale(),
        );

        const opacityGlobal = opacity * camera.screen.opacity;

        if (opacityGlobal > 0
            && isVisible === true) {
          const alpha = context.globalAlpha;

          context.globalAlpha = opacityGlobal;

          const FIELD_OF_VIEW = camera.screen.width() * 1;
          const PROJECTION_CENTER_X = camera.screen.width() / 2; // X center of the canvas HTML
          const PROJECTION_CENTER_Y = camera.screen.height() / 2; // Y center of the canvas HTML
          // const sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW + destination.z);
          const sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW + camera.position.z());
          // const xProject = (x * sizeProjection) + PROJECTION_CENTER_X;
          // const yProject = (y * sizeProjection) + PROJECTION_CENTER_X;;

          const canvas = {

            destination: {

              x: camera.screen.x() + destination.x * camera.screen.scale()
            - (camera.position.x() * camera.screen.scale()
            - camera.screen.width() / 2),
              y: camera.screen.y() + destination.y * camera.screen.scale()
            - (camera.position.y() * camera.screen.scale()
            - camera.screen.height() / 2),
              width: destination.width * camera.screen.scale(),
              height: destination.height * camera.screen.scale(),
            },
          };

          const offset = {
            top: Math.min(0, canvas.destination.y - camera.screen.y()),
            right: Math.max(0, canvas.destination.x + canvas.destination.width
            - (camera.screen.x() + camera.screen.width())),
            bottom: Math.max(0, canvas.destination.y + canvas.destination.height
            - (camera.screen.y() + camera.screen.height())),
            left: Math.min(0, canvas.destination.x - camera.screen.x()),
          };

          const dstX = canvas.destination.x - offset.left;
          const dstY = canvas.destination.y - offset.top;
          const dstWidth = canvas.destination.width - offset.right - Math.abs(offset.left);
          const dstHeight = canvas.destination.height - offset.bottom - Math.abs(offset.top);

          context.save();
          context.translate(dstX + (dstWidth / 2),
            dstY + (dstHeight / 2));
          context.rotate((rotate.z * Math.PI) / 180);
          context.scale(1, Math.cos((rotate.x * Math.PI) / 180));
          context.scale(Math.cos((rotate.y * Math.PI) / 180), 1);

          context.drawImage(
            source,
            frame.x - offset.left * (frame.width / canvas.destination.width),
            frame.y - offset.top * (frame.height / canvas.destination.height),
            frame.width - offset.right * (frame.width / canvas.destination.width)
          - Math.abs(offset.left * (frame.width / canvas.destination.width)),
            frame.height - offset.bottom * (frame.height / canvas.destination.height)
          - Math.abs(offset.top * (frame.height / canvas.destination.height)),
            -dstWidth / 2,
            -dstHeight / 2,
            dstWidth,
            dstHeight,
          );

          context.restore();

          context.globalAlpha = alpha;
        }
      });
    }
  });
};
export { renderImages };
