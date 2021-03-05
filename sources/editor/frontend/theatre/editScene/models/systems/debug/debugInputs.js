function removeFocus() {
  this.$variables.$debug.isFocus = false;
  this.$variables.$debug.focusElement = null;
}

function debugInputs() {
  const debugVariables = this.$variables.$debug;
  this.$controllers.inputs.forEach(({
    action, state, x, y,
  }) => {
    const inputsCombine = state ? `${action}_${state}` : action;
    switch (inputsCombine) {
      case 'SCROLL_UP':
        this.models.snippets.debug.zoom({ x, y });
        break;
      case 'SCROLL_DOWN':
        this.models.snippets.debug.dezoom({ x, y });
        break;
      case 'CLICK_LEFT_DOWN':
        this.models.snippets.debug.select({ x, y });
        break;
      case 'MOVE':
        if (debugVariables.isFocus) {
          if (debugVariables.focusElement) {
            debugVariables.commands.entityDrag = { x, y };
          } else {
            debugVariables.commands.cameraDrag = { x, y };
          }
        } else {
          this.models.snippets.debug.hover({ x, y });
        }
        break;
      case 'MOVE_LEAVE':
      case 'CLICK_LEFT_UP':
        debugVariables.commands = {};
        removeFocus.call(this);
        break;
      case 'KEY_UP_UP':
        delete debugVariables.commands.cameraMoveUp;
        removeFocus.call(this);
        break;
      case 'KEY_LEFT_UP':
        delete debugVariables.commands.cameraMoveLeft;
        removeFocus.call(this);
        break;
      case 'KEY_DOWN_UP':
        delete debugVariables.commands.cameraMoveDown;
        removeFocus.call(this);
        break;
      case 'KEY_RIGHT_UP':
        delete debugVariables.commands.cameraMoveRight;
        removeFocus.call(this);
        break;
      case 'KEY_DOWN_DOWN':
        debugVariables.commands.cameraMoveDown = null;
        break;
      case 'KEY_LEFT_DOWN':
        debugVariables.commands.cameraMoveLeft = null;
        break;
      case 'KEY_UP_DOWN':
        debugVariables.commands.cameraMoveUp = null;
        break;
      case 'KEY_RIGHT_DOWN':
        debugVariables.commands.cameraMoveRight = null;
        break;
      default:
    }
  });
}

export { debugInputs };
