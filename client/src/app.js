import { Component } from 'preact';

import Mach from './components/machines';
import Inst from './components/install';

export default class App extends Component {
  select() {
  
  }
  
  render({}, {}, {}) {
    return (
      <div>
        <Mach select={this.select}/>
        <Inst selected="fff"/>
      </div>
    );
  }
}
