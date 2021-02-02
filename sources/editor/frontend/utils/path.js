const cutFilePath = function cutFilePath(path) {
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
  return {
    paths, folder, type, scope, fileName,
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
