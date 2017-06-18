const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io       = require('socket.io-client');
const randomID = require('random-id');
const os       = require('os');
const fs       = require('fs');

const download = require('./src/download');
const spawn    = require('./src/spawn');

const config = require('./config.json');
const host   = 'http://' + config.host + ':' + config.port;

if (os.platform() !== 'win32') {
  console.error('This currently only supports windows!');
  process.exit(1);
}

const id = randomID(20);
console.log('ID', id);

process.stdin.resume();

const socket = io(host);

const app = feathers()
  .configure(socketio(socket));

const machines = app.service('machines');

let mid = -1;
machines
  .create({ name: os.hostname(), machineid: id })
  .then(({ id }) => {
    mid = id;
  });

const install = app.service('install');

const downloadQueue = [];
const installQueue  = [];

let isDownloading = false;
let isInstalling  = false;

const installApp = async (data) => {
  await spawn('dl/' + data.path, data.args);
  await new Promise(res => setTimeout(res, 100));
  fs.unlinkSync('dl/' + data.path);
  console.log('deleted', data.path);
};

const downloadApp = async (data) => {
  await download(data.file.local ? host + data.file.path : data.file.path);
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

const apps = app.service('apps');

install.on('created', async (data) => {
  if (data.machineid !== id) return;
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

socket.on('connect', () => console.log('connected'));
socket.on('disconnect', () => console.log('disconnected'));

function exit(options, err) {
  if (options.cleanup) {
    console.log('clean');
    machines.remove(mid);
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

process.on('exit', exit.bind(null, { cleanup: true }));
process.on('SIGINT', exit.bind(null, { exit: true }));
process.on('uncaughtException', exit.bind(null, { exit: true }));
