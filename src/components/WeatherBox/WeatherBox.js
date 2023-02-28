import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((setCity) => {
    setPending(true);
    setError(false);
    fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${setCity}&appid=459b821e070202214a1683aec4d8ff76&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
              };
              setWeather(weatherData);
              setPending(false);
          })
        } else {
          setError(true)
        }
   });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { weather && !error && !pending && <WeatherSummary {...weather} />}
      { pending && !error && <Loader /> }
      { error && pending && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;

