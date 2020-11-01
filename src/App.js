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

    this.winnerClassName = "winner";
  }

  getInitialState() {
    var values = new Array(3);
    var winners = new Array(3);
    for (var i = 0; i < values.length; ++i) {
      values[i] = new Array(3);
      winners[i] = new Array(3);
    }
    return {
      nextClick: "X",
      values: values,
      winners: winners,
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
      var winnersState = this.state.winners.slice();
      values[x][y] = this.state.nextClick;
      var next = ((state.nextClick === "X") ? "O" : "X");
      var winner = this.checkForWinners(values, winnersState);
      return {
        nextClick: next,
        values: values,
        winner: winner,
        winners: winnersState
      }
    });
  };

  checkForWinners(values, winnersState) {
    var winner = null;
    winner = this.checkHorizontal(values, winnersState, 0);
    if (!winner) winner = this.checkHorizontal(values, winnersState, 1);
    if (!winner) winner = this.checkHorizontal(values, winnersState, 2);
    if (!winner) winner = this.checkVertical(values, winnersState, 0);
    if (!winner) winner = this.checkVertical(values, winnersState, 1);
    if (!winner) winner = this.checkVertical(values, winnersState, 2);
    if (!winner) winner = this.checkDiagonal1(values, winnersState);
    if (!winner) winner = this.checkDiagonal2(values, winnersState);

    return winner;
  }

  checkHorizontal(values, winnersState, index) {
    var winner = null;
    if (values[0][index]
      && ((values[0][index] === values[1][index]) && (values[1][index] === values[2][index]))) {
        winner = values[0][index];
        winnersState[0][index] = this.winnerClassName;
        winnersState[1][index] = this.winnerClassName;
        winnersState[2][index] = this.winnerClassName;
    }
    return winner;
  }

  checkVertical(values, winnersState, index) {
    var winner = null;
    if (values[index][0]
      && ((values[index][0] === values[index][1]) && (values[index][1] === values[index][2]))) {
        winner = values[index][0];
        winnersState[index][0] = this.winnerClassName;
        winnersState[index][1] = this.winnerClassName;
        winnersState[index][2] = this.winnerClassName;
    }
    return winner;
  }

  checkDiagonal1(values, winnersState) {
    var winner = null;
    if (values[0][0]
      && ((values[0][0] === values[1][1]) && (values[1][1] === values[2][2]))) {
        winner = values[0][0];
        winnersState[0][0] = this.winnerClassName;
        winnersState[1][1] = this.winnerClassName;
        winnersState[2][2] = this.winnerClassName;
    }
    return winner;
  }
  checkDiagonal2(values, winnersState) {
    var winner = null;
    if (values[2][0]
      && ((values[2][0] === values[1][1]) && (values[1][1] === values[0][2]))) {
        winner = values[2][0];
        winnersState[2][0] = this.winnerClassName;
        winnersState[1][1] = this.winnerClassName;
        winnersState[0][2] = this.winnerClassName;
    }
    return winner;
  }

  render() {
    return (
    <div>
      <div className="App">
        <Cell posX={0} posY={0} value={this.state.values[0][0]} winnerClass={this.state.winners[0][0]} onClick={this.handleCellClick} />
        <Cell posX={1} posY={0} value={this.state.values[1][0]} winnerClass={this.state.winners[1][0]} onClick={this.handleCellClick} />
        <Cell posX={2} posY={0} value={this.state.values[2][0]} winnerClass={this.state.winners[2][0]} onClick={this.handleCellClick} />
        <Cell posX={0} posY={1} value={this.state.values[0][1]} winnerClass={this.state.winners[0][1]} onClick={this.handleCellClick} />
        <Cell posX={1} posY={1} value={this.state.values[1][1]} winnerClass={this.state.winners[1][1]} onClick={this.handleCellClick} />
        <Cell posX={2} posY={1} value={this.state.values[2][1]} winnerClass={this.state.winners[2][1]} onClick={this.handleCellClick} />
        <Cell posX={0} posY={2} value={this.state.values[0][2]} winnerClass={this.state.winners[0][2]} onClick={this.handleCellClick} />
        <Cell posX={1} posY={2} value={this.state.values[1][2]} winnerClass={this.state.winners[1][2]} onClick={this.handleCellClick} />
        <Cell posX={2} posY={2} value={this.state.values[2][2]} winnerClass={this.state.winners[2][2]} onClick={this.handleCellClick} />
      </div>
      <button onClick={this.reset}>Reset</button>
    </div>
  )};
}

export default App;
