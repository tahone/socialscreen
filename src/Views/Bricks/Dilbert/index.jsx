import React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import Transmit from 'react-transmit';

import randomDilbert from 'random-dilbert';

export default class DilbertBrick extends React.Component {

    size = 6;

    componentWillMount() {

    }

    render() {
        return (
            <img src={this.props.data.url}/>
        );
    }
}

const Static = Transmit.createContainer(DilbertBrick, {
    // These must be set or else it would fail to render
    initialVariables: {},
    // Each fragment will be resolved into a prop
    fragments: {
        data: () => {
            return new Promise((resolve, reject) => {
                randomDilbert((error, data) => {
                    console.log('Dilbert', error, data);
                    if (error) {
                        reject(new Error(error));
                    }
                    resolve(data);
                })
            });
        }
    }
});

export {Static};
