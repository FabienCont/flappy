import { after } from 'core/lifecycle/after';
import { before } from 'core/lifecycle/before';
import { destroy } from 'core/lifecycle/destroy';
import { render } from 'core/lifecycle/render';
import { resize } from 'core/lifecycle/resize';
import { setup } from 'core/lifecycle/setup';
import { start } from 'core/lifecycle/start';
import { update } from 'core/lifecycle/update';

const preloadScenes = function preloadScenes(scenesCtx,hooksCtx) {
  const hooks = {
    after, before, destroy, render, resize, setup, start, update,
  };
  const scenarioCtx = scenesCtx || require.context('scenes/', true, /^\.\/scenario\.json$/, 'sync');
  const hooksOverrideCtx = hooksCtx || require.context('scenes/', true, /\.\/(\w+)\/(\w+)\.js$/, 'sync');

  const scenario = scenarioCtx(scenarioCtx.keys()[0]);
  const scenes = {};

  scenario.forEach((scene, i) => {
    scenes[scene]={};
  });

  if(hooksOverrideCtx.keys!==undefined){
    hooksOverrideCtx.keys().forEach((key) => {
      const matches = key.match(/\.\/(\w+)\/(\w+)\.js$/);
      const name = matches[1];
      const hook = matches[2];
      if (Object.keys(hooks).indexOf(hook) !== -1) {
        scenes[name][hook] = hooksOverrideCtx(key)[hook];
      }
    });
  }

  Object.keys(scenes).forEach((key) => {
    let hooksOverride=Object.keys(scenes[key]);
    let defaultHooks=Object.keys(hooks).filter((hook)=>{
        return hooksOverride.indexOf(hook)===-1
      })
      defaultHooks.forEach((hook) => {
        scenes[key][hook]=hooks[hook];
      });
  });

  this.scenes=scenes;

};

export { preloadScenes };
