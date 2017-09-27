import React from 'react';

import Brick from './Brick'

export default class Flex extends React.Component {

    onChange(brick) {
        console.log('Brick', brick);
    }

    render() {
        return (
            <div className="flex">
                <Brick onChange={this.onChange.bind(this)}/>
                <Brick
                    img="https://kittenrescue.org/wp-content/uploads/2017/03/KittenRescue_KittenCareHandbook.jpg"
                    onChange={this.onChange.bind(this)}/>
                <Brick onChange={this.onChange.bind(this)}/>
                <Brick onChange={this.onChange.bind(this)}/>
                <Brick onChange={this.onChange.bind(this)}/>
                <Brick onChange={this.onChange.bind(this)}/>
                <Brick onChange={this.onChange.bind(this)}/>
                { /*language=CSS*/ }
                <style jsx>
                {`
                    .flex {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        align-content: stretch;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                `}
                </style>
            </div>
        );
    }
}
