const { spawn } = require('child_process');

module.exports = (path, args) => new Promise((res, rej) => {
  const installer = spawn(path, args);
  
  installer.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  installer.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  
  installer.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    if (code === 0) {
      res(code);
    } else {
      rej(code);
    }
  });
});
