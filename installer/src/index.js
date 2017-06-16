const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io       = require('socket.io-client');
const randomID = require('random-id');

const download = require('./download');
const spawn    = require('./spawn');

const config = require('../../server/config/default.json');
const host   = 'http://' + config.host + ':' + config.port;

const id = randomID(10);
console.log('ID', id);

process.stdin.resume();

const socket = io(host);

const app = feathers()
  .configure(socketio(socket));

const machines = app.service('machines');
machines.create({ mid: id });

const install = app.service('install');

install.on('created', async (data, params) => {
  if (data.machineid !== id) return;
  console.log('created', data, params);
  await download(host, data.path);
  await new Promise(res => setTimeout(res, 100));
  await spawn('dl/' + data.path, data.args);
  await new Promise(res => setTimeout(res, 100));
  require('fs').unlinkSync('dl/' + data.path);
  console.log('deleted', data.path);
});

socket.on('connect', () => {
  console.log('connected');
});

socket.on('event', (data) => {
  console.log(data);
});

socket.on('disconnect', () => {
  console.log('disconnected');
});

function exit(options, err) {
  if (options.cleanup) {
    console.log('clean');
    machines.remove(null, { query: { mid: id } });
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

process.on('exit', exit.bind(null, { cleanup: true }));
process.on('SIGINT', exit.bind(null, { exit: true }));
process.on('uncaughtException', exit.bind(null, { exit: true }));
