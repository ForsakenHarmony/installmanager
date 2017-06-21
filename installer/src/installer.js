const fs = require('fs');
const debug = require('debug')('installapp:installer');

const download = require('./download');
const spawn    = require('./spawn');

const host = require('./config').host;

const downloadQueue = [];
const installQueue  = [];

let isDownloading = false;
let isInstalling  = false;

const installApp = async (data) => {
  try {
    await spawn('dl/' + data.file.filename, data.args);
  } catch (e) {
    debug(null, 'Error while installing', e);
  }
  await new Promise(res => setTimeout(res, 100));
  fs.unlinkSync('dl/' + data.file.filename);
  debug('deleted', data.file.filename);
  if (installQueue.length > 0) {
    installApp(installQueue.shift());
  } else {
    isInstalling = false;
  }
};

const downloadApp = async (data) => {
  await download(data.file.local ? host + data.file.path : data.file.path, data.file.filename);
  await new Promise(res => setTimeout(res, 100));
  installQueue.push(data);
  if (!isInstalling) {
    isInstalling = true;
    installApp(installQueue.shift());
  }
  if (downloadQueue.length > 0) {
    downloadApp(downloadQueue.shift());
  } else {
    isDownloading = false;
  }
};

module.exports = (app, mid) => {
  const apps    = app.service('apps');
  const install = app.service('install');
  
  install.on('created', async (data) => {
    if (data.machineid !== mid) return;
    console.log('created', data);
    const appsToInstall = await apps.find({
      query: {
        $or: data.apps.map(id => ({ id: parseInt(id, 10) })),
      },
    });
    appsToInstall.data.map((d) => {
      d.args = JSON.parse(d.args);
      return d;
    });
    downloadQueue.push(...appsToInstall.data);
    if (!isDownloading) {
      isDownloading = true;
      downloadApp(downloadQueue.shift());
    }
  });
}