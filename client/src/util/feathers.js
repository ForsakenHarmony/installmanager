import feathers from 'feathers/client';
import socketio from 'feathers-socketio/client';
import reactive from 'feathers-reactive';
import rxjs from 'rxjs';
import io from 'socket.io-client';

const config = require('../../../server/config/default.json');
const host   = 'http://' + config.host + ':' + config.port;

const socket = io(host);

const app = feathers()
  .configure(socketio(socket))
  .configure(reactive(rxjs));

export default app;
export const install  = app.service('install');
export const machines = app.service('machines');
export const apps     = app.service('apps');
