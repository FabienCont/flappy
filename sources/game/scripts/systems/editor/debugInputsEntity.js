function debugInputsEntity() {
  this.$controllers.inputs.forEach(({
    action, state, x, y,
  }) => {
    const inputsCombine = `${action}_${state}`;
    switch (inputsCombine) {
      case 'SCROLL_UP':
        this.scripts.snippets.editor.zoom({ x, y });
        break;
      case 'SCROLL_DOWN':
        this.scripts.snippets.editor.dezoom(x, y);
        break;
      default:
    }
  });
}

export { debugInputsEntity };
