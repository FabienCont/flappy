import { getArborescence } from 'editor/frontend/api/arborescence';

// initial state
const state = () => ({
  all: {},
});

const reduceFindPath = function reduceFindPath(pathInState, subPath, i, paths) {
  if (i !== paths.length - 1) {
    return pathInState[subPath].content;
  }
  return { file: subPath, path: pathInState };
};

// actions
const actions = {
  retrieveAllArborescence({ commit }) {
    getArborescence().then((arborescence) => {
      commit('setArborescence', arborescence);
    });
  },
  deleteElement({ commit }, path) {
    commit('deleteElement', path);
  },
  addElement({ commit, state }, { path, content }) {
    commit('addElement', { path });
  },
};

// mutations
const mutations = {
  addElement(state, { path }) {
    const paths = path.split('/');
    const pathInState = paths.reduce(reduceFindPath, state.all);
    if (!pathInState.path[pathInState.file]) {
      this.$app.$set(pathInState.path, pathInState.file, { type: 'file' });
    }
  },
  deleteElement(state, path) {
    const paths = path.split('/');
    const pathInState = paths.reduce(reduceFindPath, state.all);
    this.$app.$delete(pathInState.path, pathInState.file);
  },
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
