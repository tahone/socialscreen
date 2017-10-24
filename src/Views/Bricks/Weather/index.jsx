import React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';

import _get from 'lodash/get';

import weatherIcons from 'weather-icons/css/weather-icons.css';

import BaseBrick from '../../BaseBrick';

const apiKey = '';

const lat = 62.237198;
const lon = 25.742182;

@observer
export default class Weather extends BaseBrick {

    @observable data = {};

    componentWillMount() {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(url).then((response) => {
            response.json().then(action((json) => {
                console.log('Weather data', json);
                this.data = json;
            }))
        }).catch(console.log);
    }

    render() {
        const classes = `${weatherIcons.wi} ${weatherIcons['wi-day-sunny']}`;
        return (
            <div style={{fontSize: '72px', textAlign: 'center'}}>
                <i className={classes}/>
                <div>{_get(this.data,'main.temp', 273.15) - 273.15} &deg;C</div>
            </div>
        );
    }

}
