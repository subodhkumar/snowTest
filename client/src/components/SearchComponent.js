import React, { Component } from 'react';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {}

  handleChange(e) {
    this.props.handleSearch(e.target.value);
  }

  render() {
    const compStyle = {};
    const searchStyle = {
      fontSize: '14px',
      width: '100%',
      padding: '15px',
      boxSizing: 'border-box',
    };
    return (
      <div style={compStyle}>
        <input
          placeholder="Please Search here across below fields"
          style={searchStyle}
          type="text"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchComponent;
