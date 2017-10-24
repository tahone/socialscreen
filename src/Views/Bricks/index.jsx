import React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import _isString from 'lodash/isString';

import styles from './styles.scss';

@observer
export default class BaseBrick extends React.Component {
    static defaultProps = {
        size: 1
    };

    @observable component = null;
    @observable content = null;

    constructor(props) {
        super(props);
        props.component ? this.getComponent() : this.getContent();
    }

    getComponent() {
        import(`./${this.props.component}`)
            .then(action(module => {
                console.log('Component', module);
                this.component = React.createElement(module.default, this.props);
            }))
            .catch(console.log);
    }

    getContent() {
        const {brick} = this.props;
        if (brick && brick.url) {
            fetch(brick.url).then(action((response) => {
                response.text().then((content) => {
                    this.content = content;
                });
            })).catch(console.log);
        }
    }

    render() {
        const {component, brick, type} = this.props;
        const size = this.props.size || (brick && brick.size) || 1;
        const content = component ? this.component : this.content;
        return (
            <div className={styles[`item-${type}-${size}`]} ref={(brick) => {this.brick = brick;}}>
                <div className={styles.wrapper}>
                    {_isString(content) ?
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: this.content }}></div> :
                        <div className={styles.content}>{content}</div>
                    }
                </div>
            </div>
        )
    }
}