import { Camera } from 'modules/camera';

const generateCameras = function generateCameras(sceneCameras) {
  const cameras = {};
  try {
    sceneCameras.forEach((cam) => {
      if (cam.params.$snippet !== undefined) {
        const snippet = cam.params.$snippet;
        cam.params = this.models.snippets[snippet.scope][snippet.name]();
      } else {
        Object.entries(cam.params).forEach(([paramKey, paramValue]) => {
          if (typeof paramValue === 'object' && paramValue.$snippet !== undefined) {
            const snippet = paramValue.$snippet;
            cam.params[paramKey] = this.models.snippets[snippet.scope][snippet.name]();
          }
        });
      }

      cameras[cam.name] = new Camera(cam.name, cam.type, this.size, cam.params);
    });
  } catch (err) {
    console.error(err);
  }

  return cameras;
};

const getCamera = function getSystem(cameraName) {
  try {
    if (typeof cameraName !== 'string' || cameraName === '') {
      throw 'no camera name defined';
    }
    return this.$cameras[cameraName];
  } catch (err) {
    throw `no camera found with name :${cameraName}`;
  }
};

const getCamerasScene = function getCamerasScene() {
  try {
    const currentScene = this.models.scenes[this.currentScene];
    if (currentScene && currentScene.cameras !== undefined) {
      return JSON.parse(JSON.stringify(currentScene.cameras()));
    }
    return [];
  } catch (err) {
    console.error(`no cameras found for this scene :${this.currentScene}`);
  }
};

const loadCameras = function loadCameras() {
  const sceneCameras = getCamerasScene.call(this);
  return generateCameras.call(this, sceneCameras);
};

export { loadCameras, generateCameras, getCamera };
