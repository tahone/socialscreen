import React from 'react';
import {action, observable, toJS} from 'mobx';
import {observer} from 'mobx-react';
import _difference from 'lodash/difference';
import _each from 'lodash/each';
import _filter from 'lodash/filter';

import Brick from '../Bricks'

import styles from './styles.scss';

@observer
export default class Screen extends React.Component {

    @observable config = [];
    @observable brickStack = [];
    @observable currentBricks = [];
    availableBricks = [];

    componentWillMount() {
        this.fetchConfig();
    }

    fetchConfig() {
        console.log(`Fetching config from ${process.env.REACT_APP_SERVER}`);
        fetch(process.env.REACT_APP_SERVER).then((response) => {
            return response.json();
        }).then(action((json) => {
            this.availableBricks = json;
            this.getBricks();
        })).catch(console.log);
    }

    componentDidMount() {
        this.setInterval();
    }

    setInterval() {
        console.log('Running...');
        this.interval = setInterval(() => {
            this.getBricks();
        }, 60000);
    }

    clearInterval() {
        console.log('Paused...');
        clearInterval(this.interval);
        this.interval = null;
    }

    pause() {
        if (this.interval) {
            this.clearInterval();
        } else {
            this.setInterval();
        }
    }

    @action
    getBricks() {
        console.log('Available, stack', toJS(this.availableBricks), toJS(this.brickStack));
        this.currentBricks = [];
        if (this.brickStack.length === 0) {
            this.brickStack = this.availableBricks;
            console.log('Replenish stack', toJS(this.brickStack));
        }
        let size = 0;
        const copy = this.brickStack.slice();
        let bricks = [];
        const examine = (brick, i) => {
            const brickSize = brick.size || brick.props.size;
            if (size + brickSize <= 6) {
                bricks.push(this.brickStack[i]);
                size += brickSize;
            }
        };
        _each(copy, (brick, i) => {
            examine(brick, i);
        });
        console.log('Selected', bricks);
        this.currentBricks.replace(bricks);
        this.brickStack.replace(_difference(this.brickStack.slice(), bricks));
        console.log('Current, stack', this.currentBricks.slice(), this.brickStack.slice());
    }

    next() {
        this.getBricks();
    }

    prev() {
        console.log('How the hell should I do prev()?');
    }

    render() {
        const bricks = this.currentBricks.slice();
        // If there are any bricks with size 4, we need a different layout
        const col = !!_filter(bricks, {size: 4}).length;
        console.log('Render bricks', bricks);
        return (
            <div className={col ? styles.flexCol : styles.flexRow} onClick={() => this.pause()}>
                <div className={styles.arrowPrev}>
                    <i className="fa fa-chevron-left fa-5x" onClick={this.prev.bind(this)}/>
                </div>
                <div className={styles.arrowNext}>
                    <i className="fa fa-chevron-right fa-5x" onClick={this.next.bind(this)}/>
                </div>
                {bricks.map((brick, i) => {
                    if (brick.component) {
                        return (
                            <Brick
                                {...brick.props}
                                key={`${new Date()}-${i}`}
                                type={col ? 'col' : 'row'}
                                component={brick.component}
                            />
                        );
                    }
                    return (
                        <Brick
                            key={`${brick.url}-${i}`}
                            size={brick.size}
                            type={col ? 'col' : 'row'}
                            brick={toJS(brick)}
                        />
                    );
                })}
            </div>
        );
    }
}
