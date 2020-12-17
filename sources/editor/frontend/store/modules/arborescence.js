import { getArborescence } from 'editor/frontend/api/arborescence';

// initial state
const state = () => ({
  all: {},
});

// actions
const actions = {
  getAllArborescence({ commit }) {
    getArborescence().then((arborescence) => {
      commit('setArborescence', arborescence);
    });
  },
};

// mutations
const mutations = {
  setArborescence(state, arborescence) {
    state.all = arborescence;
  },
  toggleOpenElement(state, element) {
    this.$app.$set(element, 'isOpen', !element.isOpen);
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
