import React, { Component } from 'react';
import '../style.css';



class keyboard extends Component {

  render() {
    return (
      <div id="keyboard">
        <button className="operator" id="clear-entry" onClick={e => this.props.onClick(e.target.id)}>CE</button>
        <button className="operator" id="clear" onClick={e => this.props.onClick(e.target.id)}>C</button>
        <button className="operator" id="backspace" onClick={e => this.props.onClick(e.target.id)}>&#8656;</button>
        <button className="operator" id="%" onClick={e => this.props.onClick(e.target.id)}>%</button>
        <button className="operator" id="R" onClick={e => this.props.onClick(e.target.id)}><small><sup>1</sup>/<sub>x</sub></small></button>
        <button className="number" id="7" onClick={e => this.props.onClick(e.target.id)}>7</button>
        <button className="number" id="8" onClick={e => this.props.onClick(e.target.id)}>8</button>
        <button className="number" id="9" onClick={e => this.props.onClick(e.target.id)}>9</button>
        <button className="operator" id="√" onClick={e => this.props.onClick(e.target.id)}>&#8730;</button>
        <button className="operator" id="^" onClick={e => this.props.onClick(e.target.id)}>X<sup>&#696;</sup></button>
        <button className="number" id="4" onClick={e => this.props.onClick(e.target.id)}>4</button>
        <button className="number" id="5" onClick={e => this.props.onClick(e.target.id)}>5</button>
        <button className="number" id="6" onClick={e => this.props.onClick(e.target.id)}>6</button>
        <button className="operator" id="*" onClick={e => this.props.onClick(e.target.id)}>&times;</button>
        <button className="operator" id="/" onClick={e => this.props.onClick(e.target.id)}>&#247;</button>
        <button className="number" id="1" onClick={e => this.props.onClick(e.target.id)}>1</button>
        <button className="number" id="2" onClick={e => this.props.onClick(e.target.id)}>2</button>
        <button className="number" id="3" onClick={e => this.props.onClick(e.target.id)}>3</button>
        <button className="operator" id="+" onClick={e => this.props.onClick(e.target.id)}>+</button>
        <button className="operator" id="-" onClick={e => this.props.onClick(e.target.id)}>-</button>
        <input type="checkbox" id="skull" name="theme" /><label htmlFor="skull">&#128128;</label>
        <button className="number" id="0" onClick={e => this.props.onClick(e.target.id)}>0</button>
        <button className="comma" id="." onClick={e => this.props.onClick(e.target.id)}>.</button>
        <button className="sign" id="±" onClick={e => this.props.onClick(e.target.id)}>&#177;</button>
        <button className="operator" id="=" onClick={e => this.props.onClick(e.target.id)}>=</button>
      </div>
    );
  }
}

export default keyboard;