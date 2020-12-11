function generateSprites(entities) {
  if (this.saveAnimation !== JSON.stringify(this.params.animation)) {
    const images = Object.values(entities)[0].get('images');
    const { animation } = this.params;
    images.parts[0].frames = animation.frames;
    images.parts[0].destination = [0, 0, 0, animation.width, animation.height];
    images.parts[0].framerate = animation.framerate;
    this.saveAnimation = JSON.stringify(this.params.animation);
  }
}
export { generateSprites };
