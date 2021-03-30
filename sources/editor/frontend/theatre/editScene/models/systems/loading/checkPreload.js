function checkPreload() {
  if (this.preloading === false && this.$variables.redirect === false) {
    setTimeout(() => {
      this.load('demo');
    }, this.loadingTime);

    this.$variables.redirect = true;
  }
}

export { checkPreload };
