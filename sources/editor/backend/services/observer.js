const chokidar = require('chokidar');
const { EventEmitter } = require('events');
const fsExtra = require('fs-extra');
const fs = require('fs');

const fsPromises = fs.promises;

class Observer extends EventEmitter {
  logInfo(info) {
    fsPromises.appendFile('watcher.log', `[${new Date().toLocaleString()}]${info}\n`)
      .then((data) => console.log(data))
      .catch((err) => console.error('cannot append log file', err));
  }

  watchFolder(folder) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for folder changes on: ${folder}`,
      );

      const watcher = chokidar.watch(folder, { persistent: true });
      watcher.on('error', (error) => console.log(`Watcher error: ${error}`));

      watcher.on('ready', () => {
        watcher.on('change', async (filePath) => {
          const info = `${filePath} has been change.`;
          this.logInfo(info);
          // Read content of new file
          const fileContent = await fsExtra.readFile(filePath);

          // emit an event when new file has been added
          this.emit('file-change', {
            filePath,
            message: fileContent.toString(),
          });
        });

        watcher.on('unlink', async (filePath) => {
          const info = `${filePath} has been deleted.`;
          this.logInfo(info);

          this.emit('file-deleted', {
            filePath,
          });
        });

        watcher.on('add', async (filePath) => {
          const info = `${filePath} has been added.`;
          this.logInfo(info);

          // Read content of new file
          const fileContent = await fsExtra.readFile(filePath);

          // emit an event when new file has been added
          this.emit('file-added', {
            filePath,
            message: fileContent.toString(),
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Observer;
