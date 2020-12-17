function checkPreload() {
  if (this.preloading === false && this.state.redirect === false) {
    setTimeout(() => {
      this.load('demo');
    }, this.loadingTime);

    this.state.redirect = true;
  }
}

export { checkPreload };
