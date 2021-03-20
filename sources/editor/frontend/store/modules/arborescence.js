import { getArborescence } from 'editor/frontend/api/arborescence';

// initial state
const state = () => ({
  all: {},
});

const reduceFindOrCreatePath = function reduceFindOrCreatePath(pathInState, subPath, i, paths) {
  if (i !== paths.length - 1) {
    if (!pathInState[subPath] || !pathInState[subPath].content) {
      this.$app.$set(pathInState, subPath, { type: 'folder', content: {} });
    }
    return pathInState[subPath].content;
  }
  return { file: subPath, path: pathInState };
};

const findPath = function findPath(pathInState, paths) {
  let foundPath = pathInState;
  for (let i = 0; i < paths.length; i++) {
    const subPath = paths[i];
    if (i === paths.length - 1 && foundPath[subPath]) {
      break;
    } else if (foundPath[subPath]) {
      foundPath = foundPath[subPath].content;
    } else {
      foundPath = null;
      break;
    }
  }
  if (foundPath === pathInState) return null;
  return foundPath;
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
    const pathInState = paths.reduce(reduceFindOrCreatePath.bind(this), state.all);
    if (!pathInState.path[pathInState.file]) {
      this.$app.$set(pathInState.path, pathInState.file, { type: 'file' });
    }
  },
  deleteElement(state, path) {
    const paths = path.split('/');
    const elementPathName = paths[paths.length - 1];
    const pathInState = findPath(state.all, paths);
    if (pathInState) {
      this.$app.$delete(pathInState, elementPathName);
      const scopeKeys = Object.keys(pathInState);
      if (scopeKeys.length === 0 && paths.length === 4) {
        paths.pop();
        const folderPathName = paths[paths.length - 1];
        const folderPathInstate = findPath(state.all, paths);
        this.$app.$delete(folderPathInstate, folderPathName);
      }
    }
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
  getComponents: (state) => () => state.all.models.content.components.content,
  getSnippets: (state) => () => state.all.models.content.snippets.content,
  getEntities: (state) => () => state.all.models.content.entities.content,
  getScene: (state) => (scope) => state.all.models.content.scenes.content[scope].content,
  getImageFromSprites: (state) => (scope, fileName) => {
    const nameToFind = fileName.split('.json')[0];
    return Object.keys(state.all.assets.content.images.content[scope].content).find((name) => {
      if (name.split('.')[0] === nameToFind) {
        return true;
      }
      return false;
    });
  },
  snippetDico: (state) => {
    const snippetDico = {};
    Object.entries(state.all.models.content.snippets.content).forEach(([scope, value]) => {
      Object.entries(value.content).forEach(([filename, info]) => {
        if (!snippetDico[scope]) snippetDico[scope] = {};
        snippetDico[scope][filename] = info;
      });
    });
    return snippetDico;
  },
  componentDico: (state) => {
    const componentDico = {};
    Object.entries(state.all.models.content.components.content).forEach(([scope, value]) => {
      Object.entries(value.content).forEach(([filename, info]) => {
        if (!componentDico[scope]) componentDico[scope] = {};
        componentDico[scope][filename] = info;
      });
    });
    return componentDico;
  },
  entityDico: (state) => {
    const entityDico = {};
    Object.entries(state.all.models.content.entities.content).forEach(([scope, value]) => {
      Object.entries(value.content).forEach(([filename, info]) => {
        if (!entityDico[scope]) entityDico[scope] = {};
        entityDico[scope][filename] = info;
      });
    });
    return entityDico;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
