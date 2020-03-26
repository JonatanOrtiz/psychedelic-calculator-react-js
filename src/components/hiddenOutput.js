import React, {Component} from 'react';

class hiddenOutput extends Component {


    render() {
        let {hiddenOutputValue} = this.props;
        return (
            <div id="hidden-output">
                <p id="hidden-output-value">{hiddenOutputValue}</p>
            </div>
    )
        ;
    }
}


export default hiddenOutput;