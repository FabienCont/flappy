import Vue from 'vue';
import Vuex from 'vuex';
import arborescence from './modules/arborescence';
import panes from './modules/panes';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    arborescence,
    panes,
  },
  strict: debug,
});
