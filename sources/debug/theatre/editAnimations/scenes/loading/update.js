function update() {
  // console.log('update loading scene');
  if (this.preloading === false && this.state.redirect === false) {
    setTimeout(() => {
      this.load('editAnimations');
    }, this.loadingTime);

    this.state.redirect = true;
  }
}

export { update };
