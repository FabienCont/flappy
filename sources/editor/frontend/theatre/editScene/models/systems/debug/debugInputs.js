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
      case 'KEY_CTRL_DOWN':
        debugVariables.inputs.push(['KEY_CTRL']);
        break;
      case 'KEY_CTRL_UP':
        debugVariables.inputs.splice(debugVariables.inputs.indexOf('KEY_CTRL'));
        break;
      case 'KEY_C_DOWN':
        if (debugVariables.inputs.indexOf('KEY_CTRL') != null) {
          this.models.snippets.debug.copyEntity();
        }
        break;
      case 'KEY_V_DOWN':
        if (debugVariables.inputs.indexOf('KEY_CTRL') != null) {
          this.models.snippets.debug.pasteEntity();
        }
        break;
      case 'KEY_DEL_DOWN':
        this.models.snippets.debug.deleteEntity();
        break;
      case 'SCROLL_UP':
        this.models.snippets.debug.zoom({ x, y });
        break;
      case 'SCROLL_DOWN':
        this.models.snippets.debug.dezoom({ x, y });
        break;
      case 'CLICK_LEFT_DOWN':
        this.models.snippets.debug.select();
        break;
      case 'MOVE':
        const camera = this.$cameras.debug;
        const { cursorPos } = this.$variables.$debug;
        cursorPos.x = (x - camera.screen.x()
      + camera.position.x() * camera.screen.scale()
      - camera.screen.width() / 2) / camera.screen.scale();

        cursorPos.y = (y - camera.screen.y()
      + camera.position.y() * camera.screen.scale()
      - camera.screen.height() / 2) / camera.screen.scale();

        if (debugVariables.isFocus) {
          if (debugVariables.focusElement) {
            debugVariables.commands.entityDrag = cursorPos;
          } else {
            debugVariables.commands.cameraDrag = { x, y };
          }
        } else {
          this.models.snippets.debug.hover({ x, y });
        }
        break;
      case 'MOVE_LEAVE':
      case 'CLICK_LEFT_UP':
        debugVariables.inputs.splice(0);
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
