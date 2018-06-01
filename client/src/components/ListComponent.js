import React, { Component } from 'react';

class ListComponent extends Component {
  dragSource;
  dragSourceIndex;
  dragTargetIndex;
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dragSource: '',
      dragTarget: '',
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.executeDragAndDrop = this.executeDragAndDrop.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    console.log(this.state.data);
  }

  handleSort(val) {
    console.log('Click');
    //this.props.handleSort();
  }

  handleDragStart(e) {
    // e.preventDefault();
    console.log('Drag Start' + e.currentTarget.dataset.tag);

    this.dragSourceIndex = e.currentTarget.dataset.tag;
    this.dragSource = this.state.data[e.currentTarget.dataset.tag];
  }

  handleDragEnd(e) {
    // e.preventDefault();
    // console.log('Drag End');
  }
  handleDragOver(e) {
    e.preventDefault();
    // console.log('DragOver');
  }

  handleDragEnter(e) {
    e.preventDefault();
    // console.log('DragEnter');
  }

  handleDragLeave(e) {
    e.preventDefault();
    // console.log('DragLeave');
  }

  handleDrop(e) {
    e.preventDefault();
    console.log('Drop' + e.currentTarget.dataset.tag);

    this.dragTargetIndex = e.currentTarget.dataset.tag;

    this.executeDragAndDrop();
  }

  executeDragAndDrop() {
    if (this.dragSourceIndex && this.dragTargetIndex) {
      console.log('EXE DnD | ' + this.dragSource);

      let preArr, postArr;
      if (this.dragSourceIndex < this.dragTargetIndex) {
        preArr = this.state.data.slice(0, parseInt(this.dragTargetIndex) + 1);
        postArr = this.state.data.slice(
          parseInt(this.dragTargetIndex) + 1,
          this.state.data.length,
        );
      } else {
        preArr = this.state.data.slice(0, parseInt(this.dragTargetIndex));
        postArr = this.state.data.slice(
          parseInt(this.dragTargetIndex),
          this.state.data.length,
        );
      }

      let finalArr = [...preArr, this.dragSource, ...postArr];

      if (this.dragSourceIndex < this.dragTargetIndex) {
        finalArr.splice(this.dragSourceIndex, 1);
      } else {
        finalArr.splice(parseInt(this.dragSourceIndex) + 1, 1);
      }

      console.log(
        this.state.data.length,
        '/',
        preArr.length,
        '/',
        postArr.length,
        '/',
        finalArr.length,
      );

      this.setState({
        data: finalArr,
      });
    } else {
      console.log('EXE DnD | NOPE');
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  renderRow(data, index) {
    const keyArray = Object.keys(this.state.data[0]);
    const keyCount = keyArray.length;

    const divStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + keyCount + ',1fr)',
      gridGap: '15px',
      textAlign: 'left',
      margin: '10px 0px',
      border: '1px solid #eee',
      padding: '10px 15px',
      fontSize: '.75em',
      background: '#fff',
      cursor: 'move',
    };

    const cellStyle = {
      wordBreak: 'break-all',
    };
    return (
      <div
        data-tag={index}
        style={divStyle}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}>
        {Object.keys(data).map(key => <div style={cellStyle}>{data[key]}</div>)}
      </div>
    );
  }

  renderList() {
    if (this.state.data.length === 0) return;
    let resultList = this.state.data.map((data, index) =>
      this.renderRow(data, index),
    );
    return resultList;
  }

  handleScroll(e) {
    // console.log(
    //   'Scrolling ',
    //   e.target.scrollTop,
    //   '/',
    //   e.target.scrollHeight,
    //   '/',
    //   e.target.offsetHeight,
    //   '/',
    //   e.target.scrollHeight - e.target.offsetHeight,
    // );

    if (
      parseInt(e.target.scrollHeight - e.target.offsetHeight) ==
      parseInt(e.target.scrollTop)
    ) {
      console.log(' Scroll End ');
      this.props.handleScroll();
    }
  }
  render() {
    const ListDivStyle = {
      height: '55vh',
      overflow: 'scroll',
      padding: '5px',
      background: '#fcfcfc',
      cursor: 'pointer',
    };
    const ListStyle = {};
    return (
      <div style={ListStyle} onScroll={this.handleScroll}>
        <div style={ListDivStyle}>{this.renderList()}</div>
      </div>
    );
  }
}

export default ListComponent;
