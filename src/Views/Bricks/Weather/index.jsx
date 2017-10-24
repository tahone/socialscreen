import React from 'react';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';

import _get from 'lodash/get';

import weatherIcons from 'weather-icons/css/weather-icons.css';

import BaseBrick from '../';

const lat = 62.237198;
const lon = 25.742182;

@observer
export default class Weather extends BaseBrick {
    static defaultProps = {
        lat,
        lon
    };

    @observable data = {};

    componentWillMount() {
        const {lat, lon, apiKey} = this.props;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        fetch(url).then((response) => {
            response.json().then(action((json) => {
                console.log('Weather data', json, weatherIcons);
                this.data = json;
            }))
        }).catch(console.log);
    }

    render() {
        const classes = `${weatherIcons.wi} ${weatherIcons['wi-day-sunny']}`;
        const thermometer = `${weatherIcons.wi} ${weatherIcons['wi-thermometer']}`;
        const humidity = `${weatherIcons.wi} ${weatherIcons['wi-humidity']}`;
        return (
            <div style={{fontSize: '72px', textAlign: 'center'}}>
                <i className={classes}/>
                <div>
                    <i className={thermometer}/>
                    {_get(this.data,'main.temp', 273.15) - 273.15} &deg;C
                </div>
                <div>
                    <i className={humidity}/>
                    {_get(this.data,'main.humidity', 0)} %
                </div>
            </div>
        );
    }

}
