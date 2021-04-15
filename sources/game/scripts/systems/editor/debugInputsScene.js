function removeClicked() {
  this.$variables.$debug.isClicked = false;
}

function debugInputsScene() {
  const debugVariables = this.$variables.$debug;
  this.$controllers.inputs.forEach(({
    action, state, x, y,
  }) => {
    const inputsCombine = state ? `${action}_${state}` : action;
    switch (inputsCombine) {
      case 'KEY_CTRL_DOWN':
        debugVariables.inputs.push('KEY_CTRL');
        break;
      case 'KEY_CTRL_UP':
        debugVariables.inputs.splice(debugVariables.inputs.indexOf('KEY_CTRL'));
        break;
      case 'KEY_SHIFT_DOWN':
        this.scripts.snippets.editor.changeHoverLevel();
        break;
      case 'KEY_C_DOWN':
        if (debugVariables.inputs.indexOf('KEY_CTRL') !== -1) {
          this.scripts.snippets.editor.copyEntities();
        }
        break;
      case 'KEY_E_DOWN':
        if (debugVariables.inputs.indexOf('KEY_CTRL') !== -1) {
          debugVariables.multipleSelection = true;
          debugVariables.entitySelection = true;
        } else {
          debugVariables.multipleSelection = false;
          debugVariables.entitySelection = true;
        }
        break;
      case 'KEY_F_DOWN':
        debugVariables.multipleSelection = false;
        debugVariables.entitySelection = false;
        break;
      case 'KEY_V_DOWN':
        if (debugVariables.inputs.indexOf('KEY_CTRL') !== -1) {
          this.scripts.snippets.editor.pasteEntities();
        }
        break;
      case 'KEY_DEL_DOWN':
        this.scripts.snippets.editor.deleteEntities();
        break;
      case 'SCROLL_UP':
        this.scripts.snippets.editor.zoom({ x, y });
        break;
      case 'SCROLL_DOWN':
        this.scripts.snippets.editor.dezoom({ x, y });
        break;
      case 'CLICK_LEFT_DOWN':
        debugVariables.isClicked = true;
        if (debugVariables.inputs.indexOf('KEY_CTRL') === -1 && debugVariables.multipleSelection === true) {
          this.scripts.snippets.editor.multipleSelect();
        } else if (debugVariables.multipleSelection === false && debugVariables.entitySelection === true) {
          this.scripts.snippets.editor.select();
        }
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
        if (debugVariables.isClicked) {
          if (!debugVariables.entitySelection) {
            debugVariables.commands.cameraDrag = cursorPos;
          } else if (debugVariables.selectedElements.length > 0) {
            if (debugVariables.focusElement) {
              // this.scripts.snippets.editor.focusEntity();
            } else if (debugVariables.entitySelection === true && debugVariables.multipleSelection === true) {
              debugVariables.commands.multipleEntityMove = cursorPos;
            } else if (debugVariables.entitySelection === true && debugVariables.multipleSelection === false) {
              debugVariables.commands.entityDrag = cursorPos;
            }
          }
        } else {
          this.scripts.snippets.editor.hover(cursorPos);
        }
        break;
      case 'MOVE_LEAVE':
      case 'CLICK_LEFT_UP':
        debugVariables.commands = {};
        removeClicked.call(this);
        break;
      case 'KEY_UP_UP':
        delete debugVariables.commands.cameraMoveUp;
        removeClicked.call(this);
        break;
      case 'KEY_LEFT_UP':
        delete debugVariables.commands.cameraMoveLeft;
        removeClicked.call(this);
        break;
      case 'KEY_DOWN_UP':
        delete debugVariables.commands.cameraMoveDown;
        removeClicked.call(this);
        break;
      case 'KEY_RIGHT_UP':
        delete debugVariables.commands.cameraMoveRight;
        removeClicked.call(this);
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

export { debugInputsScene };
