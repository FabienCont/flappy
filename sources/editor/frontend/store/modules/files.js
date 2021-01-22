import { getAsset } from 'editor/frontend/api/assets';
import { getModels } from 'editor/frontend/api/models';

// initial state
const state = () => ({
  all: {},
  active: [],
});

// actions
const actions = {
  retrieve({ commit, state }, path) {
    const paths = path.split('/');
    if (paths.length > 2) {
      const scope = paths[2];
      const type = paths[1];
      const folder = paths[0];
      if (paths.length === 4) {
        const fileName = paths[3];
        if (folder === 'assets') {
          commit('cleanActiveFiles');
          getAsset(type, scope, fileName).then((content) => {
            commit('addFile', {
              path, content,
            });
          });
        }else if(folder === 'models'){
          commit('cleanActiveFiles');
          getModels(type, scope, fileName).then((content) => {
            commit('addFile', {
              path, content,
            });
          });
        }
      } else if (paths.length === 3) {
        // TODO: get All files from arbo
      }
    }
  },
  inactive({ commit, state }) {
    commit('cleanActiveFiles');
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
