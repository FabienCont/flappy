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
const getters = {
  getImageFromSprites: (state) => (scope, fileName) => {
    const nameToFind = fileName.split('.json')[0];
    return Object.keys(state.all.assets.content.images.content[scope].content).find((name) => {
      if (name.split('.')[0] === nameToFind) {
        return true;
      }
      return false;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
