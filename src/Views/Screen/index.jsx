import React from 'react';
import {action, observable, toJS} from 'mobx';
import {observer} from 'mobx-react';
import _concat from 'lodash/concat';
import _difference from 'lodash/difference';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _map from 'lodash/map';

import Brick from '../BaseBrick'

import styles from './styles.scss';

import announcements from '../../bricks.js';

@observer
export default class Screen extends React.Component {

    @observable brickStack = [];
    @observable currentBricks = [];
    availableBricks = [];

    componentWillMount() {
        const promises = [];
        const urls = _filter(announcements, (item) => {
            return _isString(item);
        });
        _each(urls, (url) => {
            promises.push(fetch(url).then((response) => {
                return response.json();
            }));
        });

        let bricks = _map(_difference(announcements, urls), (component) => {
            return {component, size: component.props.size || 1};
        });
        Promise.all(promises).then((responses) => {
            _each(responses, (response) => {
                if (_isArray(response)) {
                    bricks = _concat(bricks, response);
                }
            });
            console.log('Set available bricks', bricks);
            this.availableBricks = bricks;
            this.getBricks();
        });
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
        let position = 0;
        const examine = (brick, i) => {
            position += i;
            if (size + brick.size <= 6) {
                bricks.push(this.brickStack[i]);
                size += brick.size;
            }
        };
        while (size < 6 && position < copy.length) {
            copy.map(examine);
        }
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
                                key={`${new Date()}-${i}`}
                                size={brick.size}
                                type={col ? 'col' : 'row'}
                                brick={brick}
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
