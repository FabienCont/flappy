function destroy() {
  console.log(`destroy ${this.currentScene} scene`);
  console.log('-------');

  this.$controllers.destroy();

  delete this.state.redirect;
  delete this.$cameras;
  delete this.$controllers;
  delete this.$world.entities;
  delete this.$world;
  delete this.$systems;
  delete this.$renderers;
}

export { destroy };
