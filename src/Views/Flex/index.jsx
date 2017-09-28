import React from 'react';
import classnames from 'classnames';
import _filter from 'lodash/filter';
import _xorBy from 'lodash/xorBy';

// import {action, observable} from 'mobx';
// import {observer} from 'mobx-react';

import Brick from './Brick'

const bricks = [
    {id: 1, title: 'Title 1', size: 1, content: ''},
    {id: 2, title: 'Title 2', size: 3, content: ''},
    {id: 3, title: 'Title 3', size: 1, content: ''},
    {id: 4, title: 'Title 4', size: 6, content: ''},
    {id: 5, title: 'Title 5', size: 1, content: ''},
    {id: 6, title: 'Title 6', size: 2, content: '', img: 'https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg'},
    {id: 7, title: 'Title 7', size: 2, content: ''},
    {id: 8, title: 'Title 8', size: 1, content: ''},
    {id: 9, title: 'Title 9', size: 4, content: ''},
    {id: 10, title: 'Title 10', size: 1, content: ''},
    {id: 11, title: 'Title 11', size: 1, content: ''},
    {id: 12, title: 'Title 12', size: 1, content: ''},
    {id: 13, title: 'Title 13', size: 1, content: ''},
    {id: 14, title: 'Title 14', size: 2, content: ''},
    {id: 15, title: 'Title 15', size: 1, content: ''},
];

export default class Flex extends React.Component {
    batch = [];

    constructor(props) {
        super(props);
        this.bricks = bricks;
    }

    onEmbiggen(brick) {
        console.log('onEmbiggen', brick);
    }

    onShrunken(brick) {
        console.log('onShrunken', brick);
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
        console.log('Batch', bricks, this.batch);
        return bricks;
    }

    next() {
        this.forceUpdate();
    }

    prev() {
        console.log('How the hell should I do prev()?');
    }

    render() {
        const {style} = this;
        const bricks = this.getBricks();
        const col = !!_filter(bricks, {size: 4}).length;
        const classes = classnames('socialscreen', {
            'flex-row': !col,
            'flex-col': col
        });
        return (
            <div className={classes}>
                <div className="arrow prev">
                    <i className="fa fa-chevron-left fa-5x" onClick={this.prev.bind(this)}/>
                </div>
                <div className="arrow next">
                    <i className="fa fa-chevron-right fa-5x" onClick={this.next.bind(this)}/>
                </div>
                {bricks.map((brick, i) => {
                    return (
                        <Brick
                            key={i}
                            size={brick.size}
                            style={col ? 'item-col' : 'item-row'}
                            brick={brick}
                            onEmbiggen={this.onEmbiggen.bind(this)}
                            onShrunken={this.onShrunken.bind(this)}
                        />
                    );
                })}
                { /*language=CSS*/ }
                <style jsx>
                {`
                    .socialscreen {
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .socialscreen.flex-row {
                        flex-direction: row;
                    }
                    .socialscreen.flex-col {
                        flex-direction: column;
                    }
                    .socialscreen:hover .arrow {
                        display: block;
                    }
                    .arrow {
                        display: none;
                        position: absolute;
                        top: 50%;
                        z-index: 20;
                        transform: translateY(-50%);
                        opacity: .6;
                    }
                    .arrow:hover {
                        opacity: 1;
                        cursor: pointer;
                    }
                    .arrow.next {
                        right: 20px;
                    }
                    .arrow.prev {
                        left: 20px;
                    }
                `}
                </style>
            </div>
        );
    }
}
