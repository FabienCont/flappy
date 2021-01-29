import { getFile, postFile } from 'editor/frontend/api/files';
// initial state
const state = () => ({
  all: {},
  active: [],
});

// actions
const actions = {
  retrieve({ commit, state, rootGetters }, path) {
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

    if (type === 'sprites' && paths.length === 4) {
      //      dispatch('files/inactive', null, { root: true });

      const pngFileName = rootGetters['arborescence/getImageFromSprites'](scope, fileName);
      const pngPath = [folder, 'images', scope, pngFileName].join('/');
      commit('cleanActiveFiles');
      getFile(folder, type, scope, fileName).then((content) => {
        commit('addFile', {
          path, content,
        });
      }, (err) => {
        if (err === 404) {
          commit('addFile', {
            path, content: [],
          });
        }
      });
      getFile(folder, 'images', scope, pngFileName).then((content) => {
        commit('addFile', {
          path: pngPath, content,
        });
      });
    } else {
      commit('cleanActiveFiles');
      getFile(folder, type, scope, fileName).then((content) => {
        commit('addFile', {
          path, content,
        });
      });
    }
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

    postFile(folder, type, scope, fileName, content).then(() => {
      commit('replaceFile', {
        path, content,
      });
    });
  },
};

// mutations
const mutations = {
  replaceFile(state, { path, content }) {
    this.$app.$set(state.all, path, { content, path });
    state.all = { ...state.all };
  },
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
