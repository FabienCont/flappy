function Camera(name, type, screenSize, attr) {
  let scale = () => Math.min((screenSize.width / attr.width), (screenSize.height / attr.height));
  this.screen = {};
  this.screen.opacity = typeof attr.opacity === 'number' ? attr.opacity : 1;

  switch (type) {
    case 'contain-frameless':

      this.screen.x = () => 0;
      this.screen.y = () => 0;
      this.screen.z = () => 0;
      this.screen.width = () => screenSize.width;
      this.screen.height = () => screenSize.height;

      break;

    case 'contain-framed':

      this.screen.x = () => (screenSize.width - attr.width * scale()) / 2;
      this.screen.y = () => (screenSize.height - attr.height * scale()) / 2;
      this.screen.z = () => 0;
      this.screen.width = () => attr.width * scale();
      this.screen.height = () => attr.height * scale();

      break;

    case 'contain-framed-center':

      // scale = () => Math.min((screenSize.width / attr.width), (screenSize.height / attr.height));

      this.screen.x = () => (attr.width * scale()) / 2;
      this.screen.y = () => (attr.height * scale()) / 2;
      this.screen.z = () => 0;
      this.screen.width = () => attr.width * scale();
      this.screen.height = () => attr.height * scale();

      break;
    case 'cover':

      scale = () => Math.max((screenSize.width / attr.width), (screenSize.height / attr.height));

      this.screen.x = () => 0;
      this.screen.y = () => 0;
      this.screen.z = () => 0;
      this.screen.width = () => screenSize.width;
      this.screen.height = () => screenSize.height;

      break;
    default:
      throw new Error('incorrect camera type');
  }

  function emptyDico() {
    this.dico = {};
  }

  function getDico() {
    return this.dico;
  }

  function getDicoElement(key) {
    if (this.dico[key]) {
      return this.dico[key];
    } return [];
  }

  function add(dicoType, element) {
    if (this.dico[dicoType] === undefined) {
      this.dico[dicoType] = [element];
    }
    this.dico[dicoType].push(element);
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

  this.screen.scale = scale;
  this.dico = {};
  this.add = add;
  this.look = look;
  this.visible = visible;
  this.getDico = getDico;
  this.getDicoElement = getDicoElement;
  this.emptyDico = emptyDico;
}

// exports current module as an object
export { Camera };
