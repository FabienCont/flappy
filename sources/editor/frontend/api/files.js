const createApiPath = function createApiPath(folder, type, scope, name) {
  const typePath = type === '' ? '' : `${type}/`;
  const scopePath = scope === '' ? '' : `${scope}/`;
  return `/api/files/${folder}/${typePath}${scopePath}${name}`;
};

const postFile = function postFile(folder, type, scope, name, data) {
  return new Promise((resolve, reject) => {
    if (typeof folder === 'string' && typeof name === 'string' && data) {
      const xhr = new XMLHttpRequest();
      const path = createApiPath(folder, type, scope, name);
      xhr.open('POST', path, true);
      // Envoie les informations du header adaptées avec la requête
      if (type === 'images' || type === 'spritesheets') {
        xhr.setRequestHeader('Content-Type', 'image/png');
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.onreadystatechange = function () { // Appelle une fonction au changement d'état.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Requête finie, traitement ici.
          resolve();
        } else if (this.readyState === XMLHttpRequest.DONE) {
          reject();
        }
      };

      const objectToSend = {
        data,
      };
      xhr.send(JSON.stringify(objectToSend));
    } else reject();
  });
};

const getFile = function getFile(folder, type, scope, name) {
  return new Promise((resolve, reject) => {
    if (typeof folder === 'string' && typeof name === 'string') {
      const xhr = new XMLHttpRequest();
      const path = createApiPath(folder, type, scope, name);
      xhr.open('GET', path);
      // Envoie les informations du header adaptées avec la requête
      if (type === 'images' || type === 'spritesheets') {
        xhr.setRequestHeader('Content-Type', 'image/png');
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.onreadystatechange = function () { // Appelle une fonction au changement d'état.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const responseObj = xhr.response;
          // Requête finie, traitement ici.
          if (name.indexOf('.json') !== -1 && type === 'sprites') {
            resolve(JSON.parse(responseObj));
          }
          resolve(responseObj);
        } else if (this.readyState === XMLHttpRequest.DONE) {
          reject(this.status);
        }
      };
      xhr.send();
    } else reject();
  });
};
export { postFile, getFile };
