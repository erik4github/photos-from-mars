import React from 'react';

export class Rover extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.roverDropdown = React.createRef();
  }

  handleSelect(event) {
    this.props.handleSelect(event.target.value);
  }

  render() {
    return (
      <select
        required
        ref={this.roverDropdown}
        className="form-control mr-sm-2"
        value={this.props.value}
        onChange={this.handleSelect}
        name="rover"
      >
        <option disabled selected value="">
          Select A Rover
        </option>
        <option value="Curiosity">Curiousity</option>
        <option value="Spirit">Spirit</option>
        <option value="Opportunity">Opportunity</option>
      </select>
    );
  }
}
