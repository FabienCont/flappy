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

app.get('/api/assets/:type/:scope/:name', (req, res) => {
  console.log('get Api Assets');
  console.log(req.params);
  const { type } = req.params;
  const { scope } = req.params;
  let { name } = req.params;

  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
    try {
      if (type === 'images') {
        if (name.indexOf('.') === -1) {
          if (type === 'datasets' || type === 'sprites') {
            name += '.json';
          } else if (type === 'images') {
            name += '.png';
          }
        }
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

const jsonParser = bodyParser.json();

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

app.get('/api/arborescence', (req, res) => {
  console.log('get Api Arborescence');
  res.send(arborescence);
});

const obserser = new Obserser();

const regex = new RegExp(/(?<=sources\\game\\)(.*)/, 'gm');

obserser.on('file-added', (file) => {
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
