// initial state
import { cutFolderPath, createFilePath } from 'editor/frontend/utils/path';
import { isAddable, getDefaultExt, getDefaultContent } from 'editor/frontend/utils/folderType';

const state = () => ({
  all: [],
  active: 0,
});

const removeInactiveTempFile = function removeInactiveTempFile(state) {
  if (state.all[state.active] && state.all[state.active].temp) {
    this.$app.$delete(state.all, state.active);
  }
};

// actions
const actions = {
  openNewFile({ commit, dispatch, state }, path) {
    let {
      paths, folder, type, scope,
    } = cutFolderPath(path);
    scope = scope === '' ? 'common' : scope;
    const ext = getDefaultExt(type);
    const newPath = createFilePath(folder, type, scope, `newFile.${ext}`);
    const index = state.all.findIndex((pane) => pane.path === path);
    if (index === -1 && paths.length === 2 && isAddable(type)) {
      const newPane = {
        path: newPath, temp: true,
      };
      const content = getDefaultContent(type);
      dispatch('files/newFile', { path: newPath, content }, { root: true });
      commit('add', newPane);
    }
  },
  open({ commit, dispatch, state }, path) {
    const index = state.all.findIndex((pane) => pane.path === path);
    if (index === -1) {
      const newPane = {
        path,
      };
      dispatch('files/retrieve', path, { root: true });
      commit('add', newPane);
    } else {
      dispatch('files/retrieve', path, { root: true });
      commit('activate', path);
    }
  },
  close({ commit, dispatch, state }, path) {
    commit('remove', path);
    if (state.all.length > 0) {
      dispatch('files/retrieve', state.all[state.active].path, { root: true });
    } else {
      dispatch('files/inactive', null, { root: true });
    }
  },
};

// mutations
const mutations = {
  add(state, newPane) {
    removeInactiveTempFile.call(this, state);
    const length = state.all.push(newPane);
    state.active = length - 1;
  },
  remove(state, path) {
    this.$app.$delete(state.all, state.all.findIndex((pane) => pane.path === path));
    if (state.all.length <= state.active) state.active -= 1;
  },
  activate(state, path) {
    removeInactiveTempFile.call(this, state);
    state.active = state.all.map((pane) => pane.path).indexOf(path);
  },
};

const getTypeFromPath = (path) => {
  const paths = path.path.split('/');
  if (paths.length > 2) {
    return paths[1];
  }
  return '';
};

const getFolderFromPath = (path) => {
  const paths = path.path.split('/');
  return paths[0];
};

// getters
const getters = {
  currentPane: (state) => (state.all.length > 0 ? state.all[state.active] : null),
  currentType: (state) => (state.all.length > 0 ? getTypeFromPath(state.all[state.active]) : ''),
  currentFolder: (state) => (state.all.length > 0 ? getFolderFromPath(state.all[state.active]) : ''),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
