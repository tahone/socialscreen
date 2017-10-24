import React from 'react';
import Transmit from 'react-transmit';

import randomDilbert from 'random-dilbert';

export default class DilbertBrick extends React.Component {

    size = 6;

    componentWillMount() {

    }

    render() {
        return (
            <img style={{objectFit: 'contain', height: '100%', width: '100%'}} src={this.props.data.url} data-date={this.props.date}/>
        );
    }
}

const Static = Transmit.createContainer(DilbertBrick, {
    // These must be set or else it would fail to render
    initialVariables: {},
    // Each fragment will be resolved into a prop
    fragments: {
        date: () => {
            return Promise.resolve(new Date());
        },
        data: () => {
            return new Promise((resolve, reject) => {
                randomDilbert((error, data) => {
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
