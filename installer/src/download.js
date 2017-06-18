const request     = require('request');
const ProgressBar = require('progress');
const fs          = require('fs');

const makeRequest = (path, filename) => {
  return new Promise((resolve, reject) => {
    const req = request.get(path);
    
    const file = fs.createWriteStream('dl/' + filename, {
      flags: 'a',
    });
    
    console.log('to download:', path);
    
    req.on('response', (res) => {
      const len = parseInt(res.headers['content-length'], 10);
      
      const bar = new ProgressBar('downloading ' + filename + ' [:bar] :rate/bps :percent :etas', {
        complete  : '=',
        incomplete: ' ',
        width     : 50,
        total     : len,
      });
      
      res.on('data', (chunk) => {
        file.write(chunk, 'binary');
        bar.tick(chunk.length);
      });
      
      res.on('end', () => {
        file.end();
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.error('ERROR', error);
      reject(error);
    });
  });
};

module.exports = makeRequest;
