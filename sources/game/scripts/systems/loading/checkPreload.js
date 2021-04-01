function checkPreload() {
  if (this.preloading === false && this.$variables.redirect === false) {
    setTimeout(() => {
      this.load(this.$variables.nextScene);
    }, this.loadingTime);

    this.$variables.redirect = true;
  }
}

export { checkPreload };
