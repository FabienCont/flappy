// initial state
const state = () => ({
  all: [],
  active: 0,
});

// actions
const actions = {
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
  setAllPanes(state, all) {
    state.all = arborescence;
  },
  add(state, newPane) {
    const length = state.all.push(newPane);
    state.active = length - 1;
  },
  remove(state, path) {
    this.$app.$delete(state.all, state.all.findIndex((pane) => pane.path === path));
    if (state.all.length <= state.active) state.active -= 1;
  },
  activate(state, path) {
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
