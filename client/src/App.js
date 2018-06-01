import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ListComponent from './components/ListComponent';
import SearchComponent from './components/SearchComponent';
import ListHeader from './components/ListHeaderComponent';

const Notes = props => {
  const divStyle = {
    textAlign: 'left',
    background: '#fff',
    padding: '15px',
    fontSize: '14px',
    marginBottom: '20px',
  };
  return (
    <div style={divStyle}>
      <ul>
        <li> Data is loaded asynchronously from the express server </li>
        <li>
          {' '}
          The data is <strong>LOADED ON SCROLL</strong> of below list(lazy load){' '}
        </li>
        <li>
          {' '}
          The Data in the can be <strong>SEARCHED</strong> from the values of
          any below column values
        </li>
        <li>
          {' '}
          The Data can be <strong>SORTED</strong> by clicking on any of column
          Headers
        </li>
        <li>
          {' '}
          The Data listed as cards below can be{' '}
          <strong>DRAGGED & REARRANGED</strong>
        </li>
      </ul>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sortField: 'name',
      sortOrder: 'asc',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleScrollLoad = this.handleScrollLoad.bind(this);
  }

  loadUsers = () => {
    fetch('/api/list/pagination/0/15')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
        });
      });
  };

  handleScrollLoad() {
    console.log(' Scroll from APp');
    if (!this.state.done) {
      let start = this.state.users.length;
      let end = start + 10;
      fetch('/api/list/pagination/' + start + '/' + end)
        .then(res => res.json())
        .then(users => {
          if (users.length !== this.state.users.length) {
            this.setState(prevState => {
              return {
                users: [...prevState.users, ...users],
                done: true,
              };
            });
          }
        });
    }
  }
  handleSort(val) {
    console.log('Sort Called | ' + val);

    fetch('/api/list/sort/' + val)
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
        });
      });
  }

  handleSearch(val) {
    console.log('Search Value | ' + val);

    if (val === '') {
      this.loadUsers();
      return;
    }

    fetch('/api/list/filter/' + val)
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
        });
      });
  }

  componentWillMount() {
    this.loadUsers();
    // setInterval(() => this.loadUsers(), 1000);
  }

  render() {
    const appDivStyle = {
      width: '90vw',
      margin: 'auto',
      background: '#fcfcfc',
      padding: '20px',
    };
    const divStyle = {
      textAlign: 'left',
      margin: '20px 0px',
      fontSize: '24px',
    };
    return (
      <div style={appDivStyle} className="App">
        <div style={divStyle}> Service Now Test</div>
        <Notes />
        <SearchComponent handleSearch={this.handleSearch} />
        <ListHeader data={this.state.users} handleSort={this.handleSort} />
        <ListComponent
          handleScroll={this.handleScrollLoad}
          handleSort={this.handleSort}
          data={this.state.users}
        />
      </div>
    );
  }
}

export default App;
