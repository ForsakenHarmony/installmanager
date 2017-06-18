import { Component } from 'preact';
import { bind } from 'decko';

import { install, apps } from '../util/feathers';

import AddApp from './add-app';

export default class Install extends Component {
  state = {
    apps : [],
    error: null,
    flash: false,
    add  : false,
  };
  
  componentDidMount() {
    this.apps = apps.find().subscribe(apps => this.setState({ apps }));
  }
  
  componentWillUnmount() {
    this.apps.unsubscribe();
  }
  
  @bind
  installApps(e) {
    e.preventDefault();
    const data   = new FormData(e.target);
    const target = data.get('target');
    
    if (target === '') {
      this.setState({ error: 'You have to select a target machine' });
      this.flash();
      return;
    }
    
    this.setState({ error: null });
    
    const toInstall = data.getAll('apps');
    console.log('install', target, toInstall);
    install.create({ machineid: target, apps: toInstall.map(e => parseInt(e, 10)) });
  }
  
  @bind
  flash() {
    this.setState({ flash: true });
    setTimeout(() => this.setState({ flash: false }), 200);
  }
  
  @bind
  addApp(e) {
    e.preventDefault();
    this.setState({ add: true });
  }
  
  render({ selected }, { apps, error, flash, add }, {}) {
    return (
      <div>
        <form onSubmit={this.installApps}>
          <h3>Selected: {selected}</h3>
          <input type="hidden" name="target" value={selected}/>
          {apps.data && apps.data.map(e => (
            <div>
              <input type="checkbox" name="apps" value={e.id}/>{e.name}
            </div>
          ))}
          <br/>
          {add ? <AddApp close={() => this.setState({ add: false })}/>
            : <button onClick={this.addApp}>Add New App</button>}
          <br/>
          <br/>
          <input type="submit" value="Install"/>
        </form>
        <div>
          {error !== null
           && <p style={flash === true && { color: 'red' }}>Error: {error}</p>}
        </div>
      </div>
    );
  }
}
