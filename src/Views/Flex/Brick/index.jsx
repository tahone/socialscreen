import React from 'react';
import PropTypes from 'prop-types';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import classnames from 'classnames';

@observer
export default class Brick extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    };

    @observable size = 1;

    maxSize = 5;
    brick = null;

    @action
    embiggen() {
        this.size < this.maxSize && this.size++;
        this.save();
    }

    @action
    shrunken() {
        this.size > 1 && this.size--;
        this.save();
    }

    save() {
        this.props.onChange(this.brick);
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const html = document.documentElement;
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || html.clientHeight) &&
            rect.right <= (window.innerWidth || html.clientWidth)
        );
    }

    render() {
        const classes = classnames('item', {
            'size-1': this.size === 1, // 1
            'size-2': this.size === 2, // 2
            'size-3': this.size === 3, // 3
            'size-4': this.size === 4, // 4
            'size-5': this.size === 5, // 6
        });
        return (
            <div className={classes} ref={(brick) => {this.brick = brick;}}>
                <div className="controls">
                    <button onClick={this.embiggen.bind(this)}><div className="fa fa-plus"/></button>
                    <button onClick={this.shrunken.bind(this)}><div className="fa fa-minus"/></button>
                </div>
                <h4>Title 1</h4>
                <div className="content">
                    <p>This is the content</p>
                </div>
                <div className="description">This is the description of the component</div>
                { /*language=CSS*/ }
                <style jsx>
                {`
                    .item {
                        position: relative;
                        background: #fff;
                        box-sizing: border-box;
                        margin: 4px;
                        -moz-box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                        box-shadow: 2px 2px 4px 0 #ccc;
                        flex-grow: 1;
                        min-height: 50%;
                        flex-basis: 25%
                    }
                    .item.size-2 {
                        flex-basis: 58.3%;
                    }
                    .item.size-3 {
                        flex-basis: 100%;
                        order: -1;
                    }
                    .item.size-4 {
                        flex-basis: 58.3%;
                        min-height: 100%;
                    }
                    .item.size-5 {
                        flex-basis: 100%;
                        order: -1;
                        min-height: 100%;
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