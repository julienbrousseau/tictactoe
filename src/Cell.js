import React, { Component } from 'react';

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { valueSet: false };

        this.cellClicked = this.cellClicked.bind(this);
    }
    
    cellClicked() {
        if (this.state.valueSet) return;
        this.props.onClick(this.props.posX, this.props.posY);
        this.setState({
            valueSet: true
        });
    }

    render() {
        return (
            <div className={("cell cell" + this.props.value)} onClick={this.cellClicked}></div>
        );
    }
}

export default Cell;