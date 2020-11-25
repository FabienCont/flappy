import * as Ease from './ease';

function Camera(name, screen) {
  function emptyDico() {
    this.dico = {};
  }

  function getDico() {
    return this.dico;
  }

  function add(type, element) {
    if (this.dico[type] === undefined) {
      this.dico[type] = [element];
    }
    this.dico[type].push(element);
  }

  function look(x, y, z) {
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  function visible(x, y, width, height) {
    const camera = {

      x: this.position.x() * this.screen.scale() - this.screen.width() / 2,
      y: this.position.y() * this.screen.scale() - this.screen.height() / 2,
      width: this.screen.width(),
      height: this.screen.height(),
    };

    if (x + width <= camera.x
        || x >= camera.x + camera.width
        || y + height <= camera.y
        || y >= camera.y + camera.height) {
      return false;
    }

    return true;
  }

  this.name = name;

  this.position = {

    x: () => 0,
    y: () => 0,
    z: () => 0,
  };

  this.screen = {
    x: screen.x,
    y: screen.y,
    z: screen.z,
    width: screen.width,
    height: screen.height,
    scale: screen.scale,
  };

  this.dico = {};
  this.add = add;
  this.look = look;
  this.visible = visible;
  this.getDico = getDico;
  this.emptyDico = emptyDico;
}

// exports current module as an object
export { Camera };
