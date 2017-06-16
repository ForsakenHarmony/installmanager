import { Component } from 'preact';

import { install, apps } from '../util/feathers';

export default class MachinesView extends Component {
  state = {
    apps: [],
  };
  
  componentDidMount() {
    this.apps = apps.find().subscribe(apps => this.setState({ apps }));
  }
  
  componentWillUnmount() {
    this.apps.unsubscribe();
  }
  
  installApps() {
    install.create();
  }
  
  render({}, { apps }, {}) {
    return (
      <ul>
        <optgroup>
          {apps.data && apps.data.map(e => (
            <option value={e.name} name={e.name} id={e.name}>{e.name}</option>
          ))}
        </optgroup>
      </ul>
    );
  }
}