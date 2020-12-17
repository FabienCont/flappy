// initial state
const state = () => ({
  all: [],
  active: 0,
});

// actions
const actions = {

};

// mutations
const mutations = {
  setAllPanes(state, all) {
    state.all = arborescence;
  },
  add(state, path) {
    const index = state.all.indexOf(path);
    if (index === -1) {
      const length = state.all.push(path);
      state.active = length - 1;
    } else {
      state.active = index;
    }
  },
  remove(state, path) {
    this.$app.$delete(state.all, state.all.indexOf(path));
    if (state.all.length <= state.active) state.active -= 1;
  },
  activate(state, path) {
    state.active = state.all.indexOf(path);
  },

};
// getters
const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
