import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

interface WeatherData {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}

interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherCurrent {
  temp_c: number;
  last_updated: Date;
  condition: WeatherCurrentCondition;
}

interface WeatherCurrentCondition {
  text: string;
  icon: string;
  code: number;
}

interface WeatherForecast {
  forecastday: WeatherForecastDay[];
}

interface WeatherForecastDay {
  date: string;
  day: DayTemp;
  hour: DayTime[];
}

interface DayTime {
  time: string;
}

interface DayTemp {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: Icon;
}

interface Icon {
  text: string;
  icon: string;
  code: number;
}

class WeekdayHelper {
  day: number;
  shortDescription: string;
  longDescription: string;

  constructor(day: number, shortDesc: string, desc: string = "") {
    this.day = day;
    this.shortDescription = shortDesc;
    this.longDescription = desc;
  }
}

function WeatherForecast() {
  const forecastDays = 7;
  const apiKey= import.meta.env.VITE_APP_API_KEY;

  const [url, setUrl] = useState<string>(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Marburg&days=${forecastDays}`
  );
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (val: string) => {
    const newUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${val}&days=${forecastDays}`;
    setUrl(newUrl);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit(inputValue);
    }
  };

  async function fetchData() {
    const request = await fetch(url);
    const data: WeatherData = await request.json();
    setWeatherData(data);
    console.log(data.location.name);
    console.log(url);
    return data;
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  const days: WeekdayHelper[] = [
    new WeekdayHelper(1, "Mo", "Montag"),
    new WeekdayHelper(2, "Di", "Dienstag"),
    new WeekdayHelper(3, "Mi", "Mittwoch"),
    new WeekdayHelper(4, "Do", "Donnerstag"),
    new WeekdayHelper(5, "Fr", "Freitag"),
    new WeekdayHelper(6, "Sa", "Samstag"),
    new WeekdayHelper(0, "So", "Sonntag"),
  ];

  function castDay(day: number) {
    if (weatherData == null) return { temp: 0, icon: "" };

    const foundEntry = weatherData.forecast.forecastday.find((item) => {
      const entryDate = new Date(item.date).getDay();
      return entryDate === day;
    });

    return foundEntry != null
      ? {
          temp: foundEntry.day.maxtemp_c,
          icon: foundEntry.day.condition.icon,
        }
      : { temp: 0, icon: "" };
  }

  return (
    <div>
      <div className="search">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleSubmit(inputValue)}>
          <CiSearch />
        </button>
      </div>
      {weatherData ? (
        <div>
          <h2>City: {weatherData.location.name}</h2>
          <h2>Country: {weatherData.location.country}</h2>
          <h2>Region: {weatherData.location.region}</h2>
          <p>{weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="Weather Icon" />
          <div className="forecast">
            {days.map((x) => {
              const dayData = castDay(x.day);
              return (
                <div key={x.day} className="day-div">
                  <label>{x.shortDescription}</label>
                  <p>{dayData.temp} °C</p>
                  {dayData.icon && (
                    <img
                      src={dayData.icon}
                      alt="Weather Icon"
                      style={{ width: "2rem", height: "2rem" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherForecast;
