const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const fs = require('fs');
const config = require('./webpack.development.js');

const app = express();
// const port = 8080;

const devServerEnabled = true;

if (devServerEnabled) {
  // reload=true:Enable auto reloading when changing JS files or content
  // timeout=1000:Time from disconnecting from server to reconnecting
  config.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');

  // Add HMR plugin
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);

  // Enable "webpack-dev-middleware"
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
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
  const { name } = req.params;

  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string') {
    try {
      if (type === 'images') {
        const file = fs.readFileSync(`sources/game/assets/${type}/${scope}/${name}.png`).toString('base64');
        console.log('Got body:', req.params);
        // res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(file);
      } else {
        const file = fs.readFileSync(`sources/game/assets/${type}/${scope}/${name}.json`, 'utf-8');
        console.log('Got body:', req.params);
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

  const { type } = req.params;
  const { scope } = req.params;
  const { name } = req.params;
  const { data } = req.body;
  let status = 200;
  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string' && data) {
    try {
      console.log('Got params:', req.params);
      if (type === 'images' || type === 'spritesheets') {
        try {
          const binaryData = Buffer.from(data, 'base64');
          fs.mkdirSync(`sources/game/assets/${type}/${scope}/`, { recursive: true });
          fs.writeFileSync(`sources/game/assets/${type}/${scope}/${name}.png`, binaryData, { encoding: 'base64' });
        } catch (err) {
          console.error('error writing file:', err);
          status = 400;
        }
        res.sendStatus(status);
      } else {
        try {
          fs.mkdirSync(`sources/game/assets/${type}/${scope}/`, { recursive: true });
          fs.writeFileSync(`sources/game/assets/${type}/${scope}/${name}.json`, JSON.stringify(data, null, 2));
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
    const ext = (type === 'systems' || type === 'snippets') ? 'js' : 'json';
    try {
      const file = fs.readFileSync(`sources/game/models/${type}/${scope}/${name}.${ext}`, 'utf-8');
      console.log('Got body:', req.params);
      res.send(file);
    } catch (err) {
      console.error('error reading file:', err);
      res.sendStatus(400);
    }
  } else {
    console.error('Got wrong parameters in body:', req.params);
    res.sendStatus(400);
  }
});

app.post('/api/models', jsonParser, (req, res) => {
  console.log('post Api Models');
  console.log(req.body);
  const { type } = req.body;
  const { scope } = req.body;
  const { name } = req.body;
  const { data } = req.body;
  if (typeof type === 'string' && typeof scope === 'string' && typeof name === 'string' && data) {
    try {
      fs.writeFileSync(`sources/game/models/${type}/${scope}/${name}.json`, JSON.stringify(data, null, 2));
      console.log('Got body:', req.body);
      res.sendStatus(200);
    } catch (err) {
      try {
        fs.mkdirSync(`sources/game/models/${type}/${scope}/`, { recursive: true });
        fs.writeFileSync(`sources/game/models/${type}/${scope}/${name}.json`, JSON.stringify(data, null, 2));
      } catch (nestedErr) {
        console.error('error writing file:', nestedErr);
        res.sendStatus(400);
      }
    }
  } else {
    console.error('Got wrong parameters in body:', req.body);
    res.sendStatus(400);
  }
});
