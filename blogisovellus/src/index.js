import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () => {
    return (
        <div>
            <p>Hello world</p>
        </div>
    )
}

class Testi extends React.Component {
    render() {
        const { name, age } = this.props
        return (
            <div>
                <h3>Moikkeliskoikkelis {name}, {age}</h3>
            </div>
        )
    }
}

const Display = (props) => {
    return (
        <div>{props.counter}</div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            counter: 1
        }
    }

    asetaArvoon = (arvo) => () => this.setState({ counter: arvo })

    render() {
        return (
            <div>
                <Display counter={this.state.counter} />
                <div>
                <Button handleClick={this.asetaArvoon(this.state.counter + 1)} text="Plus" />
                <Button handleClick={this.asetaArvoon(this.state.counter * 2)} text="Times two" />
                <Button handleClick={this.asetaArvoon(0)} text="Zero" />
                </div>
                <Testi name="Viivi" age="23w" />
                <Hello />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)