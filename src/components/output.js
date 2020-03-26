import React, {Component} from 'react';

class output extends Component {


    render() {
        let {outputValue} = this.props;
        return (
            <div id="output">
                <p id="output-value">{outputValue}</p>
            </div>
    )
        ;
    }
}


export default output;