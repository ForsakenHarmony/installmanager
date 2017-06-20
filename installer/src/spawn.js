const { spawn } = require('child_process');

const debug = require('debug')('installapp:spawn');

module.exports = (path, args) => new Promise((res, rej) => {
  const installer = spawn(path, args);
  
  installer.stdout.on('data', (data) => {
    debug(`stdout: ${data}`);
  });
  
  installer.stderr.on('data', (data) => {
    debug(`stderr: ${data}`);
  });
  
  installer.on('close', (code) => {
    debug(`child process exited with code ${code}`);
    if (code === 0) {
      res(code);
    } else {
      rej(code);
    }
  });
});
