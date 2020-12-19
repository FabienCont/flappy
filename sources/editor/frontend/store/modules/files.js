import { getAsset } from 'editor/frontend/api/assets';

// initial state
const state = () => ({
  all: {},
});

// actions
const actions = {
  retrieve({ commit, state }, path) {
    const paths = path.split('/');
    if (paths > 2) {
      const fileName = paths[3];
      const scope = paths[2];
      const type = paths[1];
      const folder = paths[0];
      if (paths.length === 4) {
        if (folder === 'assets') {
          getAsset(type, scope, fileName).then((content) => {
            commit('setFile', { path, content });
          });
        }
      } else if (paths.length === 3) {
        // TODO: get All files from arbo
      }
    }
  },
};

// mutations
const mutations = {
  setFile(state, file) {
    state.all[file.path] = content;
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
