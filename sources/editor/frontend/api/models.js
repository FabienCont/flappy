const postModels = function (type, scope, name, data) {
  return new Promise((resolve, reject) => {
    if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string' && data) {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `/api/models/${type}/${scope}/${name}`, true);
      // Envoie les informations du header adaptées avec la requête
      xhr.setRequestHeader('Content-Type', 'application/json');
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

const getModels = function (type, scope, name) {
  return new Promise((resolve, reject) => {
    if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/models/${type}/${scope}/${name}`);
      // Envoie les informations du header adaptées avec la requête
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () { // Appelle une fonction au changement d'état.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const responseObj = xhr.response;
          // Requête finie, traitement ici.
          resolve(responseObj);
        } else if (this.readyState === XMLHttpRequest.DONE) {
          reject();
        }
      };
      xhr.send();
    } else reject();
  });
};
export { postModels, getModels };
