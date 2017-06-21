const feathers          = require('feathers/client');
const socketio          = require('feathers-socketio/client');
const io                = require('socket.io-client');
const os                = require('os');
const { machineIdSync } = require('node-machine-id');

require('debug').enable('*');
const debug = require('debug')('installapp:main');

const installer = require('./src/installer');
const config    = require('./src/config');

if (os.platform() !== 'win32') {
  debug('This currently only supports windows!');
  process.exit(1);
}

const mid = machineIdSync();
console.log('ID', mid);

process.stdin.resume();

const host   = config.host;

const socket = io(host);
const app    = feathers()
  .configure(socketio(socket));

const machines = app.service('machines');
machines.create({ name: os.hostname(), id: mid });

installer(app, mid);

socket.on('connect', () => console.log('connected'));
socket.on('disconnect', () => console.log('disconnected'));

function exit(options, err) {
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

process.on('exit', exit.bind(null, { cleanup: true }));
process.on('SIGINT', exit.bind(null, { exit: true }));
process.on('uncaughtException', exit.bind(null, { exit: true }));
