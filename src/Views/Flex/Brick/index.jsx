import React from 'react';
import PropTypes from 'prop-types';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import classnames from 'classnames';

@observer
export default class Brick extends React.Component {
    static propTypes = {
        style: PropTypes.string,
        brick: PropTypes.object.isRequired,
        onEmbiggen: PropTypes.func.isRequired,
        onShrunken: PropTypes.func.isRequired
    };
    static defaultProps = {
        style: 'flex'
    };

    @observable size = null;

    @action
    onEmbiggen(event) {
        !this.size && (this.size = this.props.brick.size);
        if (this.size < 6) {
            switch (this.size) {
                case 4:
                    this.size += 2;
                    break;
                default:
                    this.size++;
            }
        }
    }

    @action
    onShrunken(event) {
        !this.size && (this.size = this.props.brick.size);
        if (this.size > 1) {
            switch (this.size) {
                case 6:
                    this.size -= 2;
                    break;
                default:
                    this.size--;
            }
        }
    }

    render() {
        const {brick, style} = this.props;
        const size = this.size || brick.size;
        const classes = classnames('item', style, {
            'size-1': size === 1, // 1
            'size-2': size === 2, // 2
            'size-3': size === 3, // 3
            'size-4': size === 4, // 4
            'size-6': size === 6, // 6
        });
        return (
            <div className={classes} ref={(brick) => {this.brick = brick;}}>
                <div className="wrap">
                    <div className="controls">
                        <button onClick={this.onEmbiggen.bind(this)}><div className="fa fa-plus"/></button>
                        <button onClick={this.onShrunken.bind(this)}><div className="fa fa-minus"/></button>
                    </div>
                    <h4>{brick.title}</h4>
                    <div className="content">
                        <p>This is the content</p>
                    </div>
                    <div className="description">This is the description of the component</div>
                </div>
                { /*language=CSS*/ }
                <style jsx>
                {`
                    .item {
                        box-sizing: border-box;
                        min-height: 50%;
                        background: none;
                        padding: 4px;
                        flex-grow: 1;
                    }
                    .item > .wrap {
                        height: 100%;
                        width: 100%;
                        position: relative;
                        background: #fff;
                        box-shadow: 2px 2px 4px 0 #ccc;
                    }
                    .item {
                        flex-basis: 33.3333%;
                    }
                    .item.size-2 {
                        flex-grow: 1;
                        flex-basis: 66.6666%;
                        order: -1;
                    }
                    .item.size-3 {
                        flex-grow: 1;
                        flex-basis: 100%;
                        order: -1;
                    }
                    /* If there's a size-4 somewhere, the flex parent has flex-direction: column */
                    .item.size-4 {
                        flex-grow: 1;
                        flex-basis: 100%;
                        min-height: 100%;
                        order: -1;
                        width: 66.6666%
                    }
                    .item.size-6 {
                        flex-basis: 100%;
                        order: -1;
                        min-height: 100%;
                    }
                    .item.item-col.size-1 {
                        width: 33.3333%
                    }
                    .item .controls {
                        position: absolute;
                        top: 0;
                        right: 0;
                        display: none;
                        flex-direction: column;
                        background-color: #ccc;
                        border-radius: 4px;
                        z-index: 10;
                    }
                    .item h4 {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        display: block;
                        background-color: rgba(250, 250, 250, 0.8);
                        margin: 0;
                        padding: 10px;
                    }
                    .item div.description {
                        display: none;
                        padding: 40px;
                        position: absolute;
                        background-color: rgba(250, 250, 250, 0.8);
                        border-radius: 32px 2px;
                        bottom: 1rem;
                        left: 25%;
                        width: 50%;
                    }
                    .item .content p.img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-image: url("https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg");
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        margin: 0;
                    }
                    .item:hover .controls {
                        display: flex;
                    }
                `}
                </style>
            </div>
        )
    }
}