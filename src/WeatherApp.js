import React from 'react';
import axios from 'axios';

import WeatherToday from './components/WeatheToday';
import WeatherOther from './components/WeatherOther';

const url =
    'https://api.openweathermap.org/data/2.5/forecast?q=Minsk&appid=a94d0a5ac08570add4b47b8da933f247';

class WeatherApp extends React.Component {
    state = {
        weather: null,
    };

    componentDidMount() {
        axios.get(`${url}`).then((response) => {
            const weather = response.data;
            console.log(weather);
            this.setState({ weather });
        });

        document.addEventListener('mousemove', this.museListener);
    }

    museListener = (e) => {
        let x = e.pageX;
        let y = e.pageY;
        console.log(x, y);
    };

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.museListener);
        console.log('компонет размонтирован + произошла отписка');
        //s
    }

    componentDidUpdate(prewProps, prewState) {
        if (this.props.userId != prewProps.userId) {
            this.fetchData(this.props.userId);
        }
    }

    render() {
        const { weather } = this.state;

        if (!weather) {
            return <div>Загрузка</div>;
        }

        return (
            <>
                <WeatherToday weather={weather} />
                <WeatherOther weather={weather} />
            </>
        );
    }
}

export default WeatherApp;
