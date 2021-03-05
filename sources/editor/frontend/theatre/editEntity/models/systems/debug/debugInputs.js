function debugInputs() {
  this.$controllers.inputs.forEach(({
    action, state, x, y,
  }) => {
    const inputsCombine = `${action}_${state}`;
    switch (inputsCombine) {
      case 'SCROLL_UP':
        this.models.snippets.debug.zoom({ x, y });
        break;
      case 'SCROLL_DOWN':
        this.models.snippets.debug.dezoom(x, y);
        break;
      default:
    }
  });
}

export { debugInputs };
