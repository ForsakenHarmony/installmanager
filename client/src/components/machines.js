import { Component } from 'preact';

import { machines } from '../util/feathers';

export default class MachinesView extends Component {
  state = {
    machines: [],
  };
  
  componentDidMount() {
    this.machines = machines.find().subscribe(machines => this.setState({ machines }));
  }
  
  componentWillUnmount() {
    this.machines.unsubscribe();
  }
  
  render({}, { machines }, {}) {
    return (
      <ul>
        <optgroup>
          {machines.data && machines.data.map(m => (
            <option value={m.mid} name={m.mid} id={m.mid}>{m.mid}</option>
          ))}
        </optgroup>
      </ul>
    );
  }
}