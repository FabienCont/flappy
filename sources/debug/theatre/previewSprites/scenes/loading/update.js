function update() {
  // console.log('update loading scene');
  if (this.preloading === false && this.$variables.redirect === false) {
    setTimeout(() => {
      this.load('previewSprites');
    }, this.loadingTime);

    this.$variables.redirect = true;
  }
}

export { update };
