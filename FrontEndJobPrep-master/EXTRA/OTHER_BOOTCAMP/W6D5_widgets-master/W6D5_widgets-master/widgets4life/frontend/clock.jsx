import React from 'react'

class Clock extends React.Component {
    constructor() {
        super();
        this.state = { time: new Date()}

    }

    tick() {
        this.setState({
            time: new Date(),
        });
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.tick(), 1000);
    }

    render() {
        return (
        <h1 className="clock">           
            Widgets4Life <br/>
            {this.state.time.getHours()}:
            {this.state.time.getMinutes()}:
            {this.state.time.getSeconds()}            
        </h1>
        );
    }
}

// module.exports = Clock; 

export default Clock;