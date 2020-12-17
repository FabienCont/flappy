import Vue from 'vue';
import App from 'editor/frontend/App.vue';
import { baseComponentAutoImport } from './baseComponentAutoImport.js';
import store from './store';

baseComponentAutoImport();

const app = new Vue({
  el: '.theatre-editor',
  template: '<app></app>',
  store,
  components: {
    App,
  },
});

store.$app = app;
