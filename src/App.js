import logo from './logo.svg';
import './App.css';
import Cell from './Cell';
import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();    

    this.state = this.getInitialState();
    this.reset = this.reset.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  getInitialState() {
    var values = new Array(3);
    for (var i = 0; i < values.length; ++i) {
      values[i] = new Array(3);
    }
    return {
      nextClick: "X",
      values: values,
      winner: null
    };
  }

  reset() {
    this.setState(this.getInitialState());
  }

  handleCellClick(x, y) {
    if (this.state.winner) return;
    this.setState((state, props) => {
      var values = this.state.values.slice();
      values[x][y] = this.state.nextClick;
      var next = ((state.nextClick === "X") ? "O" : "X");
      var winner = this.checkForWinners(values);
      return {
        nextClick: next,
        values: values,
        winner: winner
      }
    });
  };

  checkForWinners(values) {
    var winner = null;
    winner = this.checkHorizontal(values, 0);
    if (!winner) winner = this.checkHorizontal(values, 1);
    if (!winner) winner = this.checkHorizontal(values, 2);
    if (!winner) winner = this.checkVertical(values, 0);
    if (!winner) winner = this.checkVertical(values, 1);
    if (!winner) winner = this.checkVertical(values, 2);
    if (!winner) winner = this.checkDiagonal1(values);
    if (!winner) winner = this.checkDiagonal2(values);

    return winner;
  }

  checkHorizontal(values, index) {
    var winner = null;
    if (values[0][index]
      && ((values[0][index] === values[1][index]) && (values[1][index] === values[2][index]))) {
        winner = values[0][index];
    }
    return winner;
  }

  checkVertical(values, index) {
    var winner = null;
    if (values[index][0]
      && ((values[index][0] === values[index][1]) && (values[index][1] === values[index][2]))) {
        winner = values[index][0];
    }
    return winner;
  }

  checkDiagonal1(values) {
    var winner = null;
    if (values[0][0]
      && ((values[0][0] === values[1][1]) && (values[1][1] === values[2][2]))) {
        winner = values[0][0];
    }
    return winner;
  }
  checkDiagonal2(values) {
    var winner = null;
    if (values[2][0]
      && ((values[2][0] === values[1][1]) && (values[1][1] === values[0][2]))) {
        winner = values[2][0];
    }
    return winner;
  }

  render() {
    return (
    <div>
      <div className="App">
        <Cell posX={0} posY={0} value={this.state.values[0][0]} onClick={this.handleCellClick} />
        <Cell posX={1} posY={0} value={this.state.values[1][0]} onClick={this.handleCellClick} />
        <Cell posX={2} posY={0} value={this.state.values[2][0]} onClick={this.handleCellClick} />
        <Cell posX={0} posY={1} value={this.state.values[0][1]} onClick={this.handleCellClick} />
        <Cell posX={1} posY={1} value={this.state.values[1][1]} onClick={this.handleCellClick} />
        <Cell posX={2} posY={1} value={this.state.values[2][1]} onClick={this.handleCellClick} />
        <Cell posX={0} posY={2} value={this.state.values[0][2]} onClick={this.handleCellClick} />
        <Cell posX={1} posY={2} value={this.state.values[1][2]} onClick={this.handleCellClick} />
        <Cell posX={2} posY={2} value={this.state.values[2][2]} onClick={this.handleCellClick} />
      </div>
      <div className="result">
        Winner is {this.state.winner}
      </div>
      <button onClick={this.reset}>Reset</button>
    </div>
  )};
}

export default App;
