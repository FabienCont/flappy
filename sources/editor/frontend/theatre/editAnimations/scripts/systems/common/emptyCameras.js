function emptyCameras() {
  Object.values(this.$cameras).forEach((camera) => {
    camera.emptyDico();
  });
}

export { emptyCameras };
