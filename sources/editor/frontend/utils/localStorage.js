const saveStorage = function (name, value) {
  localStorage.setItem(name, value);
};

const getStorageValue = function (name) {
  localStorage.get(name);
};

export {
  saveStorage, getStorageValue,
};
