import React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';

import styles from './styles.scss';

@observer
export default class BaseBrick extends React.Component {
    size = 1;

    @observable content = '';

    constructor(props) {
        super(props);
        this.getContent();
    }

    getContent() {
        const {brick} = this.props;
        if (brick) {
            fetch(brick.url).then(action((response) => {
                response.text().then((content) => {
                    this.content = content;
                });
            })).catch(console.log);
        }
    }

    render() {
        const {brick, type} = this.props;
        const size = this.size || (brick && brick.size) || 1;
        return (
            <div className={styles[`item-${type}-${size}`]} ref={(brick) => {this.brick = brick;}}>
                <div className={styles.wrapper}>
                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: this.content }}></div>
                </div>
            </div>
        )
    }
}