import {
  getFile, postFile, deleteFile,
} from 'editor/frontend/api/files';
import { cutFilePath, createFilePath } from 'editor/frontend/utils/path';

// initial state
const state = () => ({
  all: {},
  active: [],
});

// actions
const actions = {
  newFile({ commit, state, dispatch }, { path, content }) {
    commit('cleanActiveFiles');
    commit('createFile', {
      path, content,
    });
  },
  retrieve({ commit, state, rootGetters }, path) {
    const {
      paths, folder, type, scope, fileName,
    } = cutFilePath(path);

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
    } else if (type === 'entities' && paths.length === 4) {
      const componentsArbo = rootGetters['arborescence/getComponents']();
      commit('cleanActiveFiles');
      const componentsFolder = 'models';
      const componentsType = 'components';
      Object.entries(componentsArbo).forEach(([scopeComponent, value]) => {
        Object.keys(value.content).forEach((componentFileName) => {
          getFile(componentsFolder, componentsType, scopeComponent, componentFileName)
            .then((content) => {
              commit('addFile', {
                path: createFilePath(componentsFolder, componentsType, scopeComponent, componentFileName),
                content,
                folder: componentsFolder,
                type: componentsType,
                scope: scopeComponent,
                name: componentFileName,
              });
            }, (err) => {
              if (err === 404) {
                console.log('fine not found', componentsFolder, componentsType, scopeComponent, componentFileName);
              }
            });
        });
      });

      getFile(folder, type, scope, fileName).then((content) => {
        commit('addFile', {
          path,
          content,
          folder,
          type,
          scope,
          name: fileName,
        });
      }, (err) => {
        if (err === 404) {
          commit('addFile', {
            path, content: [],
          });
        }
      });
    } else if (type === 'scenes' && paths.length === 4) {
      const componentsArbo = rootGetters['arborescence/getComponents']();
      const entitiesArbo = rootGetters['arborescence/getEntities']();
      const sceneArbo = rootGetters['arborescence/getScene'](scope);
      commit('cleanActiveFiles');
      const componentsFolder = 'models';
      const componentsType = 'components';
      Object.entries(componentsArbo).forEach(([scopeComponent, value]) => {
        Object.keys(value.content).forEach((componentFileName) => {
          getFile(componentsFolder, componentsType, scopeComponent, componentFileName)
            .then((content) => {
              commit('addFile', {
                path: createFilePath(componentsFolder, componentsType, scopeComponent, componentFileName),
                content,
                folder: componentsFolder,
                type: componentsType,
                scope: scopeComponent,
                name: componentFileName,
              });
            }, (err) => {
              if (err === 404) {
                console.log('fine not found', componentsFolder, componentsType, scopeComponent, componentFileName);
              }
            });
        });
      });
      Object.entries(entitiesArbo).forEach(([scopeEntities, value]) => {
        Object.keys(value.content).forEach((entityFileName) => {
          const entitiesFolder = 'models';
          const entitiesType = 'entities';

          getFile(entitiesFolder, entitiesType, scopeEntities, entityFileName).then((content) => {
            commit('addFile', {
              path: createFilePath(entitiesFolder, entitiesType, scopeEntities, entityFileName),
              content,
              folder: entitiesFolder,
              type: entitiesType,
              scope: scopeEntities,
              name: entityFileName,
            });
          }, (err) => {
            if (err === 404) {
              console.log('fine not found', entitiesFolder, entitiesType, scopeEntities, entityFileName);
            }
          });
        });
      });

      Object.keys(sceneArbo).forEach((sceneFileName) => {
        getFile(folder, type, scope, sceneFileName).then((content) => {
          commit('addFile', {
            path: createFilePath(folder, type, scope, sceneFileName),
            content,
            folder,
            type,
            scope,
            name: sceneFileName,
          });
        }, (err) => {
          if (err === 404) {
            console.log('fine not found', folder, type, scope, sceneFileName);
          }
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
  save({ commit, state, dispatch }, { path, content }) {
    const {
      paths, folder, type, scope, fileName,
    } = cutFilePath(path);

    postFile(folder, type, scope, fileName, content).then(() => {
      dispatch('arborescence/addElement', { path }, { root: true });
      commit('saveFile', {
        path, content,
      });
    });
  },
  delete({ commit, dispatch, state }, { path }) {
    const {
      paths, folder, type, scope, fileName,
    } = cutFilePath(path);

    deleteFile(folder, type, scope, fileName).then(() => {
      dispatch('panes/close', path, { root: true });
      dispatch('arborescence/deleteElement', path, { root: true });
      commit('deleteFile', {
        path,
      });
    });
  },
};

// mutations
const mutations = {
  deleteFile(state, { path }) {
    this.$app.$delete(state.all, path);
  },
  saveFile(state, { path, content }) {
    this.$app.$set(state.all, path, { content, path });
    state.all = { ...state.all };
  },
  createFile(state, { path, content }) {
    state.all[path] = { content, path, temp: true };
    state.active.push(path);
  },
  addFile(state, {
    path, content, folder, scope, type, name,
  }) {
    state.all[path] = {
      content, path, folder, scope, type, name,
    };
    state.active.push(path);
  },
  cleanActiveFiles(state) {
    state.active.forEach((path, i) => {
      if (state.all[path].temp) {
        delete state.all[path];
      }
    });
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
