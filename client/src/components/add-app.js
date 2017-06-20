import { Component } from 'preact';
import { bind } from 'decko';

import { files, uploads, apps } from '../util/feathers';

export default class AddApp extends Component {
  state = {
    local : true,
    args  : '',
    fileId: null,
  };
  
  @bind
  addArg(e) {
    e.preventDefault();
    this.state.args.push('');
    this.setState({ args: this.state.args });
  }
  
  @bind
  updateCheckbox(e) {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  }
  
  @bind
  update(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  @bind
  async upload(e) {
    e.preventDefault();
    const file = this.file.files[0];
    if (file === undefined) return;
    const uri    = await new Promise((res) => {
      const fileReader  = new FileReader();
      fileReader.onload = (e) => {
        res(e.target.result);
      };
      fileReader.readAsDataURL(file);
    });
    const result = await uploads.create({ id: file.name, uri });
    this.setState({ fileId: result.fileId });
  }
  
  @bind
  async setRemote(e) {
    e.preventDefault();
    const path = this.file.value;
    const name = path.split('/');
    const result = await files.create({ path, filename: name[name.length - 1], local: false });
    this.setState({ fileId: result.id });
  }
  
  @bind
  async createApp(e) {
    e.preventDefault();
    const { fileId, name } = this.state;
    
    const args = JSON.stringify(this.state.args.split(" "));
    await apps.create({ fileId, name, args });
    this.props.close(); 
  }
  
  @bind
  fileRef(el) {
    this.file = el;
  }
  
  render({ close }, { local, args, fileId }, {}) {
    return (
      <form style={{ border: '1px solid' }} onSubmit={this.createApp}>
        <h4>Add</h4>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            onInput={this.update}/>
        </div>
        <div>
          <label htmlFor="args">Args</label>
          <input
            type="text"
            name="args"
            value={args}
            onInput={this.update}/>
        </div>
        {fileId === null ? (
          <div>
            <label htmlFor="local">Local</label>
            <input
              id="local"
              type="checkbox"
              name="local"
              checked={local}
              onChange={this.updateCheckbox}/>
            {local ? (
              <div style={{ border: '1px solid' }}>
                <input ref={this.fileRef} type="file" name="file" id="file"/>
                <button onClick={this.upload}>upload</button>
              </div>
            ) : (
              <div style={{ border: '1px solid' }}>
                <label htmlFor="url">URL</label>
                <input ref={this.fileRef} type="text" name="url" id="url"/>
                <button onClick={this.setRemote}>Ok</button>
              </div>
            )}
          </div>
        ) : (
          <div><input type="hidden" value={fileId} name="file"/>File set.</div>
        )}
        <input type="submit"/>
        <button onClick={(e) => {
          e.preventDefault();
          close();
        }}>cancel
        </button>
      </form>
    );
  }
}
