import DevImagePreview from 'editor/frontend/view/DevImagePreview.vue';
import { getAsset } from 'editor/frontend/api/assets';

// initial state
const state = () => ({
  all: [],
  active: 0,
});

// actions
const actions = {
  open({ commit, dispatch, state }, path) {
    const index = state.all.findIndex((pane) => pane.path === path);
    if (index === -1) {
      const newPane = {
        path,
      };

      dispatch('files/retrieve', path, { root: true });
      commit('add', newPane);
    } else {
      state.active = index;
    }
  },
};

// mutations
const mutations = {
  setAllPanes(state, all) {
    state.all = arborescence;
  },
  add(state, newPane) {
    const length = state.all.push(newPane);
    state.active = length - 1;
  },
  remove(state, path) {
    this.$app.$delete(state.all, state.all.findIndex((pane) => pane.path === path));
    if (state.all.length <= state.active) state.active -= 1;
  },
  activate(state, path) {
    state.active = state.all.indexOf(path);
  },

};
// getters
const getters = {
  currentPane: (state) => (state.all.length > 0 ? state.all[state.active] : null),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
