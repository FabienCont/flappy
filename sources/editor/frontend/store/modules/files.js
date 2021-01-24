import { getFile, postFile } from 'editor/frontend/api/files';
// initial state
const state = () => ({
  all: {},
  active: [],
});

// actions
const actions = {
  retrieve({ commit, state }, path) {
    const paths = path.split('/');
    const folder = paths[0];
    let type = '';
    let scope = '';
    let fileName = '';
    if (paths.length === 4) {
      type = paths[1];
      scope = paths[2];
      fileName = paths[3];
    } else if (paths.length === 3) {
      type = paths[1];
      fileName = paths[2];
    } else if (paths.length === 2) {
      fileName = paths[1];
    } else {
      throw new Error('wrong path format');
    }
    commit('cleanActiveFiles');
    getFile(folder, type, scope, fileName).then((content) => {
      commit('addFile', {
        path, content,
      });
    });
  },
  inactive({ commit, state }) {
    commit('cleanActiveFiles');
  },
  save({ commit, state }, { path, content }) {
    const paths = path.split('/');
    const folder = paths[0];
    let type = '';
    let scope = '';
    let fileName = '';
    if (paths.length === 4) {
      type = paths[1];
      scope = paths[2];
      fileName = paths[3];
    } else if (paths.length === 3) {
      type = paths[1];
      fileName = paths[2];
    } else if (paths.length === 2) {
      fileName = paths[1];
    } else {
      throw new Error('wrong path format');
    }
    commit('cleanActiveFiles');
    postFile(folder, type, scope, fileName, content).then(() => {
      commit('addFile', {
        path, content,
      });
    });
  },
};

// mutations
const mutations = {
  addFile(state, { path, content }) {
    state.all[path] = { content, path };
    state.active.push(path);
  },
  cleanActiveFiles(state) {
    state.active.splice(0);
  },
};

// getters
const getters = {
  currentFiles: (state) => state.active.map((filePath) => state.all[filePath]),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
