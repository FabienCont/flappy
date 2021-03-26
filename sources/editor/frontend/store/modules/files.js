import {
  getFile, postFile, deleteFile,
} from 'editor/frontend/api/files';
import { cutFilePath, createFilePath } from 'editor/frontend/utils/path';

// initial state
const state = () => ({
  all: {},
  active: [],
});

const retrieveComponentFiles = function retrieveComponentFiles({ rootGetters }) {
  const componentsArbo = rootGetters['arborescence/getComponents']();
  const folder = 'models';
  const type = 'components';
  const promises = [];
  Object.entries(componentsArbo).forEach(([scope, value]) => {
    Object.keys(value.content).forEach((name) => {
      const path = createFilePath(folder, type, scope, name);
      promises.push(getFile(path, folder, type, scope, name));
    });
  });
  return promises;
};

const retrieveEntityFiles = function retrieveEntityFiles({ rootGetters }) {
  const entitiesArbo = rootGetters['arborescence/getEntities']();
  const folder = 'models';
  const type = 'entities';
  const promises = [];
  Object.entries(entitiesArbo).forEach(([scope, value]) => {
    Object.keys(value.content).forEach((name) => {
      const path = createFilePath(folder, type, scope, name);
      promises.push(getFile(path, folder, type, scope, name));
    });
  });
  return promises;
};

// actions
const actions = {
  newFile({
    commit, state, dispatch, rootGetters,
  }, { path, content }) {
    const {
      paths, folder, type, scope, name,
    } = cutFilePath(path);
    commit('cleanActiveFiles');

    const newFile = {
      content, path, folder, scope, type, name, temp: true,
    };

    const filesToAdd = { [newFile.path]: newFile };
    if (type === 'entities' && paths.length === 4) {
      const promiseArray = retrieveComponentFiles({ rootGetters });
      Promise.all(promiseArray).then((file) => {
        filesToAdd[file.path] = file;
      });
      commit('addMultipleFile', filesToAdd);
    } else if (type === 'scenes' && paths.length === 4) {
      commit('cleanActiveFiles');
      const sceneFiles = {
        cameras: [], inputs: [], renderers: [], systems: [], variables: {},
      };
      const entityPromises = retrieveEntityFiles({ rootGetters });
      const componentPromises = retrieveComponentFiles({ rootGetters });
      const scenesPromises = [];
      Object.keys(sceneFiles).forEach((otherName) => {
        const sceneFileName = `${otherName}.json`;
        const pathSceneFile = createFilePath(folder, type, scope, sceneFileName);
        filesToAdd[pathSceneFile] = {
          path: pathSceneFile, folder, type, scope, name: sceneFileName, temp: true, content: sceneFiles[otherName],
        };
      });

      Promise.all([...entityPromises, ...componentPromises, ...scenesPromises])
        .then((files) => {
          files.forEach((file) => filesToAdd[file.path] = file);
          commit('addMultipleFile', filesToAdd);
        });
    } else {
      commit('addMultipleFile', filesToAdd);
    }
  },
  retrieve({ commit, state, rootGetters }, path) {
    const {
      paths, folder, type, scope, name,
    } = cutFilePath(path);

    const filesToAdd = {};

    if (type === 'sprites' && paths.length === 4) {
      //      dispatch('files/inactive', null, { root: true });

      const pngFileName = rootGetters['arborescence/getImageFromSprites'](scope, name);
      const pngPath = [folder, 'images', scope, pngFileName].join('/');
      commit('cleanActiveFiles');
      const mainFilePromise = getFile(path, folder, type, scope, name);

      const pngFilePromise = getFile(pngPath, folder, 'images', scope, pngFileName);

      Promise.all([mainFilePromise.then((file) => {
        filesToAdd[path] = file;
      }, (err) => {
        if (err === 404) {
          filesToAdd[path] = {
            path, folder, type, scope, name, content: [], temp: true,
          };
        }
      }),
      pngFilePromise.then((file) => {
        filesToAdd[file.path] = file;
      }),
      ]).then(() => {
        commit('addMultipleFile', filesToAdd);
      });
    } else if (type === 'entities' && paths.length === 4) {
      commit('cleanActiveFiles');

      const promiseArray = retrieveComponentFiles({ rootGetters });

      const entityPromise = getFile(path, folder, type, scope, name);

      Promise.all([entityPromise.then((file) => {
        filesToAdd[file.path] = file;
      }, (err) => {
        if (err === 404) {
          filesToAdd[path] = {
            path, folder, type, scope, name, content: [], temp: true,
          };
        }
      }),
      Promise.all(promiseArray).then((files) => {
        files.forEach((file) => filesToAdd[file.path] = file);
      })]).then(() => {
        commit('addMultipleFile', filesToAdd);
      });
    } else if (type === 'scenes' && paths.length === 4) {
      const sceneArbo = rootGetters['arborescence/getScene'](scope);
      commit('cleanActiveFiles');
      const entityPromises = retrieveEntityFiles({ rootGetters });
      const componentPromises = retrieveComponentFiles({ rootGetters });
      const scenesPromises = [];
      Object.keys(sceneArbo).forEach((sceneFileName) => {
        const pathSceneFile = createFilePath(folder, type, scope, sceneFileName);
        scenesPromises.push(getFile(pathSceneFile, folder, type, scope, sceneFileName));
      });

      Promise.all([...entityPromises, ...componentPromises, ...scenesPromises])
        .then((files) => {
          files.forEach((file) => filesToAdd[file.path] = file);
          commit('addMultipleFile', filesToAdd);
        });
    } else {
      commit('cleanActiveFiles');
      getFile(path, folder, type, scope, name).then((file) => {
        commit('addFile', file);
      });
    }
  },
  inactive({ commit, state }) {
    commit('cleanActiveFiles');
  },
  save({ commit, state, dispatch }, { path, content }) {
    const {
      paths, folder, type, scope, name,
    } = cutFilePath(path);

    postFile(folder, type, scope, name, content).then(() => {
      dispatch('arborescence/addElement', { path }, { root: true });
      commit('saveFile', {
        path, folder, type, scope, name, content,
      });
    });
  },
  delete({ commit, dispatch, state }, { path }) {
    const {
      paths, folder, type, scope, name,
    } = cutFilePath(path);

    deleteFile(folder, type, scope, name).then(() => {
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
  saveFile(state, {
    path, content, folder, scope, type, name,
  }) {
    this.$app.$set(state.all, path, {
      content, folder, scope, type, name, path,
    });
    state.all = { ...state.all };
  },
  createFile(state, {
    path, folder, scope, type, name, content,
  }) {
    state.all[path] = {
      content, path, folder, scope, type, name, temp: true,
    };
    state.active.push(path);
  },
  addMultipleFile(state, files) {
    state.all = { ...state.all, ...files };
    state.active = [...state.active, ...Object.keys(files)];
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
