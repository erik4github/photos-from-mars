import React from 'react';
import { Rover } from './rover';
import { Toggler } from '../toggler/toggler';
import { fetchRoverManifest } from '../api/getManifests';
import './form.css';

export class RoverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rover: '',
      sol: '',
      maxSol: 'Sol',
      spiritMaxSol: '',
      opportunityMaxSol: '',
      curiosityMaxSol: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(value) {
    this.setState({ rover: value });
    if (value === 'Spirit') {
      this.setState({ maxSol: 'Max Sol: ' + this.state.spiritMaxSol });
    } else if (value === 'Opportunity') {
      this.setState({ maxSol: 'Max Sol: ' + this.state.opportunityMaxSol });
    } else if (value === 'Curiosity') {
      this.setState({ maxSol: 'Max Sol: ' + this.state.curiosityMaxSol });
    }
  }

  componentDidMount() {
    fetchRoverManifest('spirit').then((maxSol) => { this.setState({ spiritMaxSol: maxSol }); });
    fetchRoverManifest('opportunity').then((maxSol) => { this.setState({ opportunityMaxSol: maxSol }); });
    fetchRoverManifest('curiosity').then((maxSol) => { this.setState({ curiosityMaxSol: maxSol }); });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.props.handleSubmit}>
        <label htmlFor="rover">Rover</label>
        <Rover handleSelect={this.handleSelect} value={this.state.rover} />
        <label htmlFor="sol">Sol</label>
        <input
          required
          id="sol"
          name="sol"
          type="number"
          placeholder={this.state.maxSol}
          className="form-control mr-sm-2"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <input
          className="submit btn my-2 my-sm-0"
          type="submit"
          defaultValue="submit"
        />
        <Toggler
          togglerSize={this.props.togglerSize}
          toggleSidebar={this.props.toggleSidebar}
        />
      </form>
    );
  }
}
