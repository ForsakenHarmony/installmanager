const assert = require('assert');
const app = require('../../src/app');

describe('\'defaultapps\' service', () => {
  it('registered the service', () => {
    const service = app.service('defaultapps');

    assert.ok(service, 'Registered the service');
  });
});
