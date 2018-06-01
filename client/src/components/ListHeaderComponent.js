import React, { Component } from 'react';

const Header = props => (
  <div onClick={props.onClick}>
    <strong>{props.value}</strong>
  </div>
);

const HeaderRow = props => {
  let result = null;

  if (props.data.length) {
    let keyRow = props.data[0];
    const keyCount = Object.keys(keyRow).length;
    const divStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + keyCount + ',1fr)',
      gridGap: '10px',
      padding: '5px',
      cursor: 'pointer',
      textAlign: 'left',
    };

    result = (
      <div style={divStyle}>
        {Object.keys(keyRow).map(key => (
          <Header onClick={props.onClick} value={key} />
        ))}
      </div>
    );
  }
  return result;
};

class ListHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.data,
    });
  }

  handleSort(e) {
    console.log('LH Clicked | ', e.target.innerHTML);
    console.log(e.target.innerHTML.length);
    this.props.handleSort(e.target.innerHTML);
  }
  render() {
    const divStyle = {
      marginTop: '15px',
      padding: '5px',
    };
    return (
      <div style={divStyle}>
        <HeaderRow onClick={this.handleSort} data={this.state.data} />
      </div>
    );
  }
}

export default ListHeader;
