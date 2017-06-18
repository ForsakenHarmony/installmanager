import { Component } from 'preact';
import { bind } from 'decko';

import { machines } from '../util/feathers';

export default class Machines extends Component {
  state = {
    machines: [],
  };
  
  componentDidMount() {
    this.machines = machines.find().subscribe(machines => this.setState({ machines }));
  }
  
  componentWillUnmount() {
    this.machines.unsubscribe();
  }
  
  @bind
  handleRadio(e) {
    if (e.target.checked === false) return;
    this.props.select(e.target.value);
  }
  
  render({}, { machines }, {}) {
    return (
      <div>
        {machines.data && machines.data.map(e => (
          <div>
            <input
              type="radio"
              name="machine"
              value={e.machineid}
              onChange={this.handleRadio}/>
            {e.name} - {e.machineid}
          </div>
        ))}
      </div>
    );
  }
}