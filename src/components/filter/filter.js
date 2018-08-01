import React from 'react';
import './filter.css';

export class Filter extends React.Component {
  render() {
    return (
      <div id="filter">
        {this.props.filters.map((cameras, index) => {
          return (
            <span key={`filter for ${cameras}`}>
              <input
                className="filter-toggle"
                id={cameras}
                key={cameras}
                type="checkbox"
                name={cameras}
                value={cameras}
                onChange={this.props.checkFilters}
              />
              <label htmlFor={cameras} className="filter-label">
                {cameras}</label>
            </span>
          );
        })}
      </div>
    );
  }
}
