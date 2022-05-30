const Weather = ({weather}) => {
    if(Object.keys(weather).length === 0){
        return;
    }
    return (
        <div>
            <p>Temperature {Math.round((weather.main.temp - 273.15) * 100) / 100} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>Wind {weather.wind.speed} m/s</p> 
        </div>
    );
}

export default Weather;