import React from 'react';
import {action, observable, toJS} from 'mobx';
import {observer} from 'mobx-react';
import _concat from 'lodash/concat';
import _each from 'lodash/each';
import _isArray from 'lodash/isArray';
import _filter from 'lodash/filter';
import _xorBy from 'lodash/xorBy';

import Brick from '../BaseBrick'

import styles from './styles.scss';


const announcements = [
    {url: 'http://localhost:3001/announce'}
];

@observer
export default class Screen extends React.Component {

    @observable bricks = [];
    @observable currentBricks = [];
    @observable announcements = [];

    constructor(props) {
        super(props);
        this.bricks = [];
    }

    componentWillMount() {
        const promises = [];
        _each(announcements, (announce) => {
            promises.push(fetch(announce.url).then((response) => {
                return response.json();
            }));
        });

        let bricks = [];
        Promise.all(promises).then(action((responses) => {
            _each(responses, (response) => {
                if (_isArray(response)) {
                    bricks = _concat(bricks, response);
                }
            });
            this.announcements = bricks;
            this.getBricks();
        }));
    }

    componentDidMount() {
        setInterval(() => {
            this.getBricks();
        }, 60000);
    }

    @action
    getBricks() {
        this.currentBricks = [];
        if (this.bricks.length === 0) {
            this.bricks = this.announcements;
        }
        let size = 0;
        const copy = this.bricks.slice();
        let bricks = [];
        let position = 0;
        const examine = (brick, i) => {
            position += i;
            if (size + brick.size <= 6) {
                bricks.push(this.bricks[i]);
                size += brick.size;
            }
        };
        while (size < 6 && position < copy.length) {
            copy.map(examine);
        }
        this.currentBricks.replace(bricks);
        this.bricks.replace(_xorBy(this.currentBricks.slice(), this.bricks.slice(), 'url'));
    }

    next() {
        this.getBricks();
    }

    prev() {
        console.log('How the hell should I do prev()?');
    }

    render() {
        const bricks = this.currentBricks.slice();
        const col = !!_filter(bricks, {size: 4}).length;
        return (
            <div className={col ? styles.flexCol : styles.flexRow}>
                <div className={styles.arrowPrev}>
                    <i className="fa fa-chevron-left fa-5x" onClick={this.prev.bind(this)}/>
                </div>
                <div className={styles.arrowNext}>
                    <i className="fa fa-chevron-right fa-5x" onClick={this.next.bind(this)}/>
                </div>
                {bricks.map((brick, i) => {
                    return (
                        <Brick
                            key={brick.url}
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
