import React, { Component } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);

        this.cellClicked = this.cellClicked.bind(this);
    }
    
    cellClicked() {
        if (this.props.value) return;
        this.props.onClick(this.props.posX, this.props.posY);
    }

    render() {
        return (
            <div className={("cell cell" + this.props.value + " " + this.props.winnerClass)} onClick={this.cellClicked}></div>
        );
    }
}

export default Cell;