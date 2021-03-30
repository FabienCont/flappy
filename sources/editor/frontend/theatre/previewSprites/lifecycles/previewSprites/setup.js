function setup() {
  // setup demo
  this.logger.log('setup edit animations scene');

  const imageGetter = () => this.params.sprite;
  if (!this.assets.images) this.assets.images = {};
  if (!this.assets.images.common) this.assets.images.common = {};

  this.assets.images.common.sprite = imageGetter;
}

export { setup };
