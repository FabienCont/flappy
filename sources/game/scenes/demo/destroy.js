function destroy() {
  console.log('destroy demo scene');
  console.log('-------');

  this.$controllers.destroy();

  delete this.$camera;
  delete this.$controllers;
  delete this.$world.entities;
  delete this.$world;
  delete this.$systems;
  delete this.$renderers;
}

export { destroy };
