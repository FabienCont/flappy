const getArborescence = function () {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/arborescence');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () { // Appelle une fonction au changement d'état.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const responseObj = xhr.response;
        // Requête finie, traitement ici.
        resolve(JSON.parse(responseObj));
      } else if (this.readyState === XMLHttpRequest.DONE) {
        reject();
      }
    };
    xhr.send();
  });
};

export { getArborescence };
