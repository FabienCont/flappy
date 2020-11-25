// import * as scenes from 'scenes/index.js';
import { Canvas } from 'core/canvas';
import { Loop } from 'core/loop';

import { preloadAssets } from 'core/preloadAssets';
import { preloadModels } from 'core/preloadModels';
import { preloadScenes } from 'core/preloadScenes';

function Theatre(config) {
  const { container } = config;

  const expose = config.expose || false;
  const framerate = config.framerate || 60;
  const sharp = config.sharp || false;
  const speed = config.speed || 1;

  const size = {
    height: container.offsetHeight,
    width: container.offsetWidth,
  };

  let canvas = null;
  let loading = null;
  let restarting = false;
  let updates = 0;

  function forward(timeframe) {
    this.delta = timeframe;

    if (container.offsetWidth !== this.size.width
            || container.offsetHeight !== this.size.height) {
      resize.call(this);
    }

    if (this.playing === true) {
      this.tick();
    }

    this.scene.before.call(this);

    if (updates > 0) {
      update.call(this);
    }

    this.scene.render.call(this);
    this.scene.after.call(this);
  }

  function initialize() {
    const type = '2d';

    canvas = new Canvas(type, 'theatre', this.size.width, this.size.height, sharp);

    this.cleanCanvas = () => {};

    if (type === 'webgl') {
      this.cleanCanvas = () => {
        canvas.context.clear(canvas.context.COLOR_BUFFER_BIT);
      };
    } else if (type === '2d') {
      this.cleanCanvas = () => {
        canvas.context.fillStyle = '#000000';
        canvas.context.fillRect(0, 0, canvas.context.canvas.width, canvas.context.canvas.height);
      };
    }

    container.appendChild(canvas.element);

    canvas.focus();

    this.context = canvas.context;
    this.container = container;
    this.element = canvas.element;
    this.models = {};
    this.assets = {};
    this.delta = 0;

    this.loop = new Loop(forward.bind(this), framerate, speed);
    const promisePreloadAssets = preloadAssets.call(this);
    const promisePreloadModels = preloadModels.call(this);
    preloadScenes.call(this);

    promisePreloadAssets.then(() => {
      this.preloading = false;
    });

    promisePreloadModels.then(() => {
      this.scene = this.scenes.loading;
      this.scene.setup.call(this);
      this.scene.start.call(this);

      this.loop.update();
    });
  }

  function load(scene) {
    loading = scene;
  }

  function pause() {
    this.playing = false;
  }

  function play() {
    this.playing = true;
  }

  function resize() {
    this.size.width = container.offsetWidth;
    this.size.height = container.offsetHeight;

    canvas.resize(this.size.width, this.size.height);

    this.scene.resize.call(this);
  }

  function restart() {
    restarting = true;
  }

  function tick(times = 1) {
    updates += times;
  }

  function update() {
    while (updates > 0) {
      this.scene.update.call(this);

      updates -= 1;

      if (restarting === true) {
        this.scene.start.call(this);

        restarting = false;

        continue;
      }

      if (loading !== null) {
        this.scene.destroy.call(this);
        this.scene = this.scenes[loading];
        this.currentScene = loading;
        this.scene.setup.call(this);
        this.scene.start.call(this);

        loading = null;

        continue;
      }
    }
  }

  this.playing = true;
  this.preloading = true;
  this.currentScene = 'loading';
  this.$ = {};
  this.scenes = {};
  this.size = size;
  this.snippets = {};
  this.state = {};
  this.version = '0.39.0';
  this.cachedEntities = {};
  this.load = load;
  this.pause = pause;
  this.play = play;
  this.restart = restart;
  this.tick = tick;
  this.cameras = {};

  initialize.call(this, config);

  if (expose === true) {
    window.theatre = this;
  }
}

// exports current module as an object
export default Theatre;
