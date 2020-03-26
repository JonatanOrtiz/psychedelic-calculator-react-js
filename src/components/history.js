import React, {Component} from 'react';

class history extends Component {


    render() {
        let {historyValue} = this.props;
        return (
            <div id="history">
                <p id="history-value">{historyValue}</p>
            </div>
    )
        ;
    }
}


export default history;