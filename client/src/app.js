import { Component } from 'preact';
import { bind } from 'decko';

import Mach from './components/machines';
import Inst from './components/install';

export default class App extends Component {
  state = {
    selected: '',
  };
  
  @bind
  select(selected) {
    this.setState({ selected });
  }
  
  render({}, { selected }, {}) {
    return (
      <div>
        <hr/>
        <Mach select={this.select}/>
        <hr/>
        <Inst selected={selected}/>
      </div>
    );
  }
}
