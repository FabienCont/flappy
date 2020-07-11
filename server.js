const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.development.js');

const app = express();
const port = 8080;

const devServerEnabled = true;

if (devServerEnabled) {
    //reload=true:Enable auto reloading when changing JS files or content
    //timeout=1000:Time from disconnecting from server to reconnecting
    config.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');

    //Add HMR plugin
    // config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/'
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('./dist'));

/// Serve the files on port 3000.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});

app.get('/alive', function(req, res){
    console.log('/ alive');
    res.send('Alive!')
});

const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()

app.get('/api/models/:type/:scope/:name', function(req, res){
    console.log(req.params);
    const fs = require('fs');
    var type=req.params.type
    var scope=req.params.scope;
    var name=req.params.name;

    if(typeof type==='string' && typeof  scope==='string' && typeof  name==='string'){
      let ext=(type==='systems'||type==='snippets')?"js":"json";
      try{
        let file=fs.readFileSync('sources/game/models/'+type+'/'+scope+'/'+name+'.'+ext,'utf-8');
        console.log('Got body:', req.params);
        res.send(file);
      }catch(err){
        console.error('error reading file:',err);
        res.sendStatus(400);
      }
    }else{
      console.error('Got wrong parameters in body:', req.params);
      res.sendStatus(400);
    }
});

app.post('/api/models', jsonParser, function(req, res){
    console.log(req.body)
    const fs = require('fs');
    var type=req.body.type;
    var scope=req.body.scope;
    var name=req.body.name;
    var data=req.body.data;
    if(typeof type==="string" && typeof  scope==="string" && typeof  name==="string"&& data){
      try{
        fs.writeFileSync('sources/game/models/'+type+'/'+scope+'/'+name+'.json', JSON.stringify(data));
        console.log('Got body:', req.body);
        res.sendStatus(200);
      }catch(err){
        console.error('error writing file:',err);
        res.sendStatus(400);
      }
    }else{
      console.error('Got wrong parameters in body:', req.body);
      res.sendStatus(400);
    }
});
