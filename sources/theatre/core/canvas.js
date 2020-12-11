import { generateUUID } from 'core/uuidv4';

function Canvas(type, identifier, width, height, pixelated = false) {
  const element = document.createElement('canvas');
  const context = element.getContext(type);

  function focus() {
    element.setAttribute('tabindex', 0);
    element.focus();
  }

  function resize(width, height) {
    const ratio = window.devicePixelRatio || 1;

    // if (pixelated === true) {
    //   ratio = Math.floor(ratio);
    // }

    element.setAttribute('height', ratio * height);
    element.setAttribute('width', ratio * width);

    element.style.height = '100%';
    element.style.width = '100%';

    if (context.scale) {
      context.scale(ratio, ratio);
    }

    if (pixelated === true) {
      sharp();
    }
  }

  function sharp() {
    element.style.imageRendering = '-moz-crisp-edges';
    element.style.imageRendering = '-webkit-crisp-edges';
    element.style.imageRendering = 'crisp-edges';
    element.style.imageRendering = 'pixelated';
    context.imageSmoothingEnabled = false;
  }

  const uuid = generateUUID();
  element.setAttribute('id', `${identifier}_${uuid}`);
  element.addEventListener('mousedown', focus);

  resize(width, height);

  this.context = context;
  this.element = element;
  this.focus = focus;
  this.resize = resize;
}

// exports current module as an object
export { Canvas };
