const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const fs = require('fs');
const config = require('./webpack.development.js');

const Obserser = require('./sources/editor/backend/services/observer');

const { readdirSync } = fs;

const app = express();
// const port = 8080;

const devServerEnabled = true;

if (devServerEnabled) {
  // reload=true:Enable auto reloading when changing JS files or content
  // timeout=1000:Time from disconnecting from server to reconnecting
  // config.entry.webpackHotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&name=editor';

  // Add HMR plugin
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  // Enable "webpack-dev-middleware"
  app.use(webpackDevMiddleware(compiler, {
    writeToDisk: false,
    publicPath: '/',
  }));

  // Enable "webpack-hot-middleware"
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('./dist'));

/// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n');
});

app.get('/alive', (req, res) => {
  console.log('/ alive');
  res.send('Alive!');
});

const gameFolder = 'sources/game/';
const generateArbo = (source) => Object.assign({}, ...readdirSync(source, { withFileTypes: true })
  .map((dirent) => {
    const graph = {};
    if (dirent.isDirectory()) {
      graph[dirent.name] = {
        type: 'folder',
        content: generateArbo(`${source}/${dirent.name}`),
      };
      return graph;
    }

    const { mtime, ctime } = fs.statSync(`${source}/${dirent.name}`);
    graph[dirent.name] = { mtime, ctime, type: 'file' };
    return graph;
  }));

const arborescence = generateArbo(gameFolder);

const checkFileExist = function checkFileExist(folder, type, scope, name) {
  try {
    let filePath = arborescence[folder].content;
    if (type !== '') {
      filePath = filePath[type].content;
    }
    if (scope !== '') {
      filePath = filePath[scope].content;
    }
    if (filePath[name]) {
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  return false;
};

const getFile = function getFile(folder, type, scope, name) {
  if (type === 'images' || type === 'sounds') {
    return fs.readFileSync(`${gameFolder}${folder}/${type}/${scope}/${name}`).toString('base64');
  }
  return fs.readFileSync(`${gameFolder}${folder}/${type}/${scope}/${name}`, 'utf-8');
};

const writeFile = function writeFile(folder, type, scope, name, data) {
  const options = {};
  let dataToWrite = data;
  if (type === 'images' || type === 'sounds') {
    dataToWrite = Buffer.from(data, 'base64');
    options.encoding = 'base64';
  }
  fs.mkdirSync(`${gameFolder}${folder}/${type}/${scope}/`, { recursive: true });
  fs.writeFileSync(`${gameFolder}${folder}/${type}/${scope}/${name}`, dataToWrite, options);
  const { mtime, ctime } = fs.statSync(`${gameFolder}${folder}/${type}/${scope}/${name}`);
  arborescence[folder].content[type].content[scope].content[name] = { mtime, ctime, type: 'file' };
};

const deleteFile = function deleteFile(folder, type, scope, name) {
  fs.unlink(`${gameFolder}${folder}/${type}/${scope}/${name}`, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }

    // file removed
  });
  delete arborescence[folder].content[type].content[scope].content[name];
  return true;
};

const jsonParser = bodyParser.json();

app.get('/api/files/:folder/:name', (req, res) => {
  console.log('get Api Files');
  console.log(req.params);
  const { folder } = req.params;
  const { name } = req.params;
  const type = '';
  const scope = '';

  if (typeof folder === 'string' && typeof name === 'string') {
    try {
      if (checkFileExist(folder, type, scope, name)) {
        const file = getFile(folder, type, scope, name);
        res.send(file);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('error reading file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.params);
    res.sendStatus(400);
  }
});

app.get('/api/files/:folder/:type/:name', (req, res) => {
  console.log('get Api Files');
  console.log(req.params);
  const { folder } = req.params;
  const { type } = req.params;
  const { name } = req.params;
  const scope = '';

  if (typeof folder === 'string' && typeof type === 'string' && typeof name === 'string') {
    try {
      if (checkFileExist(folder, type, scope, name)) {
        const file = getFile(folder, type, scope, name);
        res.send(file);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('error reading file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.params);
    res.sendStatus(400);
  }
});

app.get('/api/files/:folder/:type/:scope/:name', (req, res) => {
  console.log('get Api Files');
  console.log(req.params);
  const { folder } = req.params;
  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;

  if (typeof folder === 'string' && typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
    try {
      if (checkFileExist(folder, type, scope, name)) {
        const file = getFile(folder, type, scope, name);
        res.send(file);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('error reading file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.params);
    res.sendStatus(400);
  }
});

app.post('/api/files/:folder/:name', jsonParser, (req, res) => {
  console.log('post Api Files');
  console.log('Got params:', req.params);

  const { folder } = req.params;
  const { name } = req.params;
  const { data } = req.body;
  if (typeof folder === 'string' && typeof name === 'string' && data) {
    try {
      writeFile(folder, '', '', name, data);
      res.end();
    } catch (err) {
      console.error('error writing file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.body);
    res.sendStatus(400);
  }
});

app.post('/api/files/:folder/:type/:name', jsonParser, (req, res) => {
  console.log('post Api Files');
  console.log('Got params:', req.params);

  const { folder } = req.params;
  const { type } = req.params;
  const { name } = req.params;
  const { data } = req.body;
  if (typeof folder === 'string' && typeof type === 'string' && typeof name === 'string' && data) {
    try {
      writeFile(folder, type, '', name, data);
      res.end();
    } catch (err) {
      console.error('error writing file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.body);
    res.sendStatus(400);
  }
});

app.post('/api/files/:folder/:type/:scope/:name', jsonParser, (req, res) => {
  console.log('post Api Files');
  console.log('Got params:', req.params);

  const { folder } = req.params;
  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;
  const { data } = req.body;
  if (typeof folder === 'string' && typeof type === 'string' && typeof scope === 'string' && typeof name === 'string' && data) {
    try {
      writeFile(folder, type, scope, name, data);
      res.end();
    } catch (err) {
      console.error('error writing file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.body);
    res.sendStatus(400);
  }
});

app.delete('/api/files/:folder/:name', (req, res) => {
  console.log('delete Api Files');
  console.log('Got params:', req.params);

  const { folder } = req.params;
  const { name } = req.params;
  const type = '';
  const scope = '';
  if (typeof folder === 'string' && typeof name === 'string') {
    try {
      if (checkFileExist(folder, type, scope, name)) {
        deleteFile(folder, type, scope, name);
        res.end();
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.error('error deleting file:', err);
      res.sendStatus(500);
    }
  } else {
    console.error('Got wrong parameters in params:', req.params);
    res.sendStatus(400);
  }
});

app.delete('/api/files/:folder/:type/:name', (req, res) => {
  console.log('delete Api Files');
  console.log('Got params:', req.params);

  const { folder } = req.params;
  const { type } = req.params;
  const { name } = req.params;
  const scope = '';
  if (typeof folder === 'string' && typeof type === 'string' && typeof name === 'string') {
    try {
      if (checkFileExist(folder, type, scope, name)) {
        deleteFile(folder, type, scope, name);
        res.end();
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.error('error deleting file:', err);
      res.sendStatus(500);
    }
  } else {
    console.error('Got wrong parameters in params:', req.params);
    res.sendStatus(400);
  }
});

app.delete('/api/files/:folder/:type/:scope/:name', (req, res) => {
  console.log('delete Api Files');
  console.log('Got params:', req.params);

  const { folder } = req.params;
  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;
  if (typeof folder === 'string' && typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
    try {
      if (checkFileExist(folder, type, scope, name)) {
        deleteFile(folder, type, scope, name);
        res.end();
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.error('error deleting file:', err);
      res.sendStatus(500);
    }
  } else {
    console.error('Got wrong parameters in params:', req.params);
    res.sendStatus(400);
  }
});

app.get('/api/assets/:type/:scope/:name', (req, res) => {
  console.log('get Api Assets');
  console.log(req.params);
  const { type } = req.params;
  const { scope } = req.params;
  let { name } = req.params;

  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
    try {
      if (name.indexOf('.') === -1) {
        if (type === 'datasets' || type === 'sprites') {
          name += '.json';
        } else if (type === 'images') {
          name += '.png';
        }
      }
      if (type === 'images') {
        const file = fs.readFileSync(`sources/game/assets/${type}/${scope}/${name}`).toString('base64');
        res.end(file);
      } else if (type === 'sounds') {
        const file = fs.readFileSync(`sources/game/assets/${type}/${scope}/${name}`).toString('base64');
        res.end(file);
      } else {
        const file = fs.readFileSync(`sources/game/assets/${type}/${scope}/${name}`, 'utf-8');
        res.end(file);
      }
    } catch (err) {
      console.error('error reading file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.params);
    res.sendStatus(400);
  }
});

app.post('/api/assets/:type/:scope/:name', jsonParser, (req, res) => {
  console.log('post Api Assets');
  console.log('Got params:', req.params);
  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;
  let { data } = req.body;
  let status = 200;
  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string' && data) {
    try {
      if (name.indexOf('.') === -1) {
        if (type === 'images') {
          name += '.png';
        } else if (type === 'datasets') {
          name += '.json';
          data = JSON.stringify(data, null, 2);
        }
      }
      if (type === 'images' || type === 'sounds') {
        try {
          const binaryData = Buffer.from(data, 'base64');
          fs.mkdirSync(`sources/game/assets/${type}/${scope}/`, { recursive: true });
          fs.writeFileSync(`sources/game/assets/${type}/${scope}/${name}`, binaryData, { encoding: 'base64' });
        } catch (err) {
          console.error('error writing file:', err);
          status = 400;
        }
        res.sendStatus(status);
      } else {
        try {
          fs.mkdirSync(`sources/game/assets/${type}/${scope}/`, { recursive: true });
          fs.writeFileSync(`sources/game/assets/${type}/${scope}/${name}`, data);
        } catch (err) {
          console.error('error writing file:', err);
          status = 400;
        }
        res.sendStatus(status);
      }
    } catch (err) {
      console.error('error writing file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.body);
    res.sendStatus(400);
  }
});

app.get('/api/models/:type/:scope/:name', (req, res) => {
  console.log('get Api Models');
  console.log(req.params);
  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;

  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
    if (name.indexOf('.') === -1 && (type === 'systems' || type === 'snippets')) {
      name += '.js';
    } else if (name.indexOf('.') === -1) {
      name += '.json';
    }
    try {
      const file = fs.readFileSync(`sources/game/models/${type}/${scope}/${name}`, 'utf-8');
      res.send(file);
    } catch (err) {
      console.error('error reading file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in url:', req.params);
    res.sendStatus(400);
  }
});

app.post('/api/models/:type/:scope/:name', jsonParser, (req, res) => {
  console.log('post Api Models');
  console.log(req.params);
  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;
  let { data } = req.body;
  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string' && data) {
    if (name.indexOf('.') === -1 && (type === 'systems' || type === 'snippets')) {
      name += '.js';
    } else if (name.indexOf('.') === -1) {
      name += '.json';
      data = JSON.stringify(data, null, 2);
    }
    try {
      fs.writeFileSync(`sources/game/models/${type}/${scope}/${name}`, data);
      console.log('Got body:', req.body);
      res.sendStatus(200);
    } catch (err) {
      try {
        fs.mkdirSync(`sources/game/models/${type}/${scope}/`, { recursive: true });
        fs.writeFileSync(`sources/game/models/${type}/${scope}/${name}`, data);
      } catch (nestedErr) {
        console.error('error writing file:', nestedErr);
        res.sendStatus(400);
      }
    }
  } else {
    console.error('Got wrong parameters in url:', req.params);
    res.sendStatus(400);
  }
});

app.get('/api/arborescence', (req, res) => {
  console.log('get Api Arborescence');
  res.send(arborescence);
});

const obserser = new Obserser();

obserser.on('file-added', (file) => {
  const regex = new RegExp(/(?<=sources\\game\\)(.*)/, 'gm');
  const subPaths = regex.match(file.filePath)[0].split('/');
  let arborescenceNode = arborescence;
  subPaths.forEach((subPath, i) => {
    if (typeof arborescenceNode[subPath] === 'object') {
      arborescenceNode[subPath] = {};
      arborescenceNode = arborescenceNode[subPath];
    } else if (i === subPaths.length - 1) {
      const { mtime, ctime } = fs.statSync(file.filePath);
      arborescenceNode[subPath] = { mtime, ctime };
    } else {
      arborescenceNode = arborescenceNode[subPath];
    }
  });
});

obserser.on('file-change', (file) => {
  const regex = new RegExp(/(?<=sources\\game\\)(.*)/, 'gm');
  const subPaths = regex.match(file.filePath)[0].split('/');
  let arborescenceNode = arborescence;
  subPaths.forEach((subPath, i) => {
    if (typeof arborescenceNode[subPath] === 'object') {
      arborescenceNode[subPath] = {};
      arborescenceNode = arborescenceNode[subPath];
    } else if (i === subPaths.length - 1) {
      const { mtime, ctime } = fs.statSync(file.filePath);
      arborescenceNode[subPath] = { mtime, ctime };
    } else {
      arborescenceNode = arborescenceNode[subPath];
    }
  });
});

obserser.on('file-deleted', (file) => {
  // print error message to console
  const regex = new RegExp(/(?<=sources\\game\\)(.*)/, 'gm');
  const subPaths = regex.match(file.filePath)[0].split('/');
  let arborescenceNode = arborescence;
  subPaths.forEach((subPath, i) => {
    if (i === subPaths.length - 1) {
      arborescenceNode = arborescenceNode[subPath];
    } else {
      delete arborescenceNode[subPath];
    }
  });
});

obserser.watchFolder(gameFolder);
