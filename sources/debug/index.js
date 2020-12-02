import Vue from 'vue';
import Devpanel from 'debug/view/Devpanel.vue';
import { baseComponentAutoImport } from './baseComponentAutoImport.js';

if (window.location.hash !== '#preview') {
  baseComponentAutoImport();
  window.setTimeout(() => {
    const app = new Vue({
      el: '.game-devtool',
      template: '<devpanel></devpanel>',
      components: {
        Devpanel,
      },
    });
  }, 1000);
}
