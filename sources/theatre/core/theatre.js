import { Canvas } from 'core/canvas';
import { Loop } from 'core/loop';
import Logger from 'core/logger';
import { generateUUID } from 'core/uuidv4';

import { preloadAssets } from 'core/preloadAssets';
import { preloadModels } from 'core/preloadModels';
import { preloadLifecycles } from 'core/preloadLifecycles';

function Theatre(config) {
  const { container } = config;

  const expose = config.expose || false;
  const framerate = config.framerate || 60;
  const sharp = config.sharp || false;
  const speed = config.speed || 1;
  const loadingTime = typeof config.loadingTime === 'number' ? config.loadingTime : 2000;
  const { scenarioCtx } = config;
  const { hooksCtx } = config;
  const { assetsCtx } = config;
  const { modelsCtx } = config;
  const focus = typeof config.focus === 'boolean' ? config.focus : true;
  const silentLog = typeof config.focus === 'boolean' ? config.focus : false;

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
    this.logger = new Logger(this.silentLog);

    const type = '2d';

    canvas = new Canvas(type, 'theatre', this.uuid, this.size.width, this.size.height, this.logger, sharp);

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
    if (focus) {
      canvas.focus();
    }

    this.context = canvas.context;
    this.container = container;
    this.element = canvas.element;
    this.models = {};
    this.assets = {};
    this.delta = 0;

    this.loop = new Loop(forward.bind(this), this.logger, framerate, speed);
    preloadLifecycles.call(this, scenarioCtx, hooksCtx);
    const promisePreloadAssets = preloadAssets.call(this, assetsCtx);
    const promisePreloadModels = preloadModels.call(this, modelsCtx);

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

      this.scene.update.call(this);

      updates -= 1;
    }
  }

  function destroy() {
    this.logger.log(`destroy theatre instance ${this.uuid}`);
    if (this.scene && this.scene.destroy) this.scene.destroy.call(this);
    this.loop.destroy();
    /*
      scenarioCtx
      hooksCtx
      assetsCtx
      modelsCtx
    */
    delete this;
  }

  this.playing = true;
  this.preloading = true;
  this.currentScene = 'loading';
  this.scenes = {};
  this.size = size;
  this.state = {};
  this.loadingTime = loadingTime;
  this.version = '0.39.0';
  this.cachedEntities = {};
  this.load = load;
  this.pause = pause;
  this.play = play;
  this.restart = restart;
  this.tick = tick;
  this.destroy = destroy;
  this.cameras = {};
  this.params = config.params || {};
  this.uuid = generateUUID();
  this.silentLog = silentLog;
  this.logger = {};
  this.sprites = {};

  initialize.call(this, config);

  if (expose === true) {
    window.theatre = this;
  }
}

// exports current module as an object
export default Theatre;
