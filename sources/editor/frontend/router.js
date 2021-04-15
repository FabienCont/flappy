import Vue from 'vue';
import VueRouter from 'vue-router';
import DevImageEdit from 'editor/frontend/view/DevImageEdit.vue';
import DevSpriteEdit from 'editor/frontend/view/DevSpriteEdit.vue';
import DevSoundEdit from 'editor/frontend/view/DevSoundEdit.vue';
import DevAceEditor from 'editor/frontend/view/DevAceEditor.vue';
import DevComponentEdit from 'editor/frontend/view/DevComponentEdit.vue';
import DevEntity from 'editor/frontend/view/DevEntity.vue';
import DevScene from 'editor/frontend/view/DevScene.vue';
import store from 'editor/frontend/store';

Vue.use(VueRouter);

const router = new VueRouter({
  base: '',
  routes: [
    { path: '/lifecycles/scenario.json', name: 'scenario', component: DevAceEditor },
    { path: '/lifecycles/:scope/:name', name: 'lifecyle', component: DevAceEditor },
    { path: '/assets/images/:scope/:name', name: 'image', component: DevImageEdit },
    { path: '/assets/sounds/:scope/:name', name: 'sound', component: DevSoundEdit },
    { path: '/assets/sprites/:scope/:name', name: 'sprite', component: DevSpriteEdit },
    { path: '/assets/datasets/:scope/:name', name: 'datasets', component: DevAceEditor },
    { path: '/scripts/snippets/:scope/:name', name: 'snippet', component: DevAceEditor },
    { path: '/scripts/systems/:scope/:name', name: 'system', component: DevAceEditor },
    { path: '/models/components/:scope/:name', name: 'component', component: DevComponentEdit },
    { path: '/models/entities/:scope/:name', name: 'entity', component: DevEntity },
    { path: '/models/scenes/:scope/:name', name: 'scene', component: DevScene },
    { path: '/*', name: 'empty', component: null },
    // dynamic segments start with a colon
  ],
});

// Add Navigation Guards for Authenticated Routes, meta "requiresAuth" is defined on route
router.afterEach((to, from) => {
  if (to.fullPath !== '/' && to.fullPath !== '') {
    if (store.getters['arborescence/isReady']()) {
      store.dispatch('panes/open', to.fullPath.substring(1));
    } else {
      const unwatch = store.watch(
        (state) => state.arborescence.ready,
        (newValue) => {
          if (newValue === true) {
            store.dispatch('panes/open', to.fullPath.substring(1));
            unwatch();
          }
        },
      );
    }
  } else {
    store.dispatch('panes/open', to.fullPath.substring(1));
  }
});

export default router;
