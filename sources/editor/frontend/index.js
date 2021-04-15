import Vue from 'vue';
import App from 'editor/frontend/App.vue';
import router from 'editor/frontend/router';
import store from 'editor/frontend/store';
import { baseComponentAutoImport } from './baseComponentAutoImport';

baseComponentAutoImport();

const app = new Vue({
  el: '.theatre-editor',
  template: '<app></app>',
  store,
  router,
  components: {
    App,
  },
});

store.$app = app;
