const cutFilePath = function cutFilePath(path) {
  const paths = path.split('/');
  const folder = paths[0];
  let type = '';
  let scope = '';
  let name = '';
  if (paths.length === 4) {
    type = paths[1];
    scope = paths[2];
    name = paths[3];
  } else if (paths.length === 3) {
    type = paths[1];
    name = paths[2];
  } else if (paths.length === 2) {
    name = paths[1];
  } else {
    throw new Error('wrong path format');
  }
  return {
    paths, folder, type, scope, name,
  };
};

const cutFolderPath = function cutFolderPath(path) {
  const paths = path.split('/');
  const folder = paths[0];
  let type = '';
  let scope = '';
  if (paths.length === 3) {
    type = paths[1];
    scope = paths[2];
  } else if (paths.length === 2) {
    type = paths[1];
  } else {
    throw new Error('wrong path format');
  }
  return {
    paths, folder, type, scope,
  };
};

const createFilePath = function createFilePath(folder, type, scope, fileName) {
  const typePath = type === '' ? '' : `${type}/`;
  const scopePath = scope === '' ? '' : `${scope}/`;
  return `${folder}/${typePath}${scopePath}${fileName}`;
};
export { cutFilePath, cutFolderPath, createFilePath };
