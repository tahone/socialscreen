import React from 'react';
import {action, observable} from 'mobx';
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
    batch = [];

    @observable bricks = [];

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
        Promise.all(promises).then((responses) => {
            _each(responses, (response) => {
                if (_isArray(response)) {
                    bricks = _concat(bricks, response);
                }
            })
            this.bricks = bricks;
        });
    }

    getBricks() {
        if (this.batch.length === 0) {
            this.batch = this.bricks;
        }
        let size = 0;
        const copy = this.batch.slice();
        let bricks = [];
        let position = 0;
        const examine = (brick, i) => {
            position += i;
            if (size + brick.size <= 6) {
                bricks.push(this.batch[i]);
                size += brick.size;
            }
        };
        while (size < 6 && position < copy.length) {
            copy.map(examine);
        }
        this.batch = _xorBy(bricks, this.batch, 'id');
        return bricks;
    }

    next() {
        this.forceUpdate();
    }

    prev() {
        console.log('How the hell should I do prev()?');
    }

    render() {
        const bricks = this.getBricks();
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
                            key={i}
                            size={brick.size}
                            type={col ? 'col' : 'row'}
                            brick={brick}
                        />
                    );
                })}
            </div>
        );
    }
}
