function update() {
  // this.logger.log('update loading scene');
  if (this.preloading === false && this.$variables.redirect === false) {
    setTimeout(() => {
      this.load('demo');
    }, this.loadingTime);

    this.$variables.redirect = true;
  }
}

export { update };
