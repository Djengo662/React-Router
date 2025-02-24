import { useState, useEffect } from "react";
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
  
  interface WeekdayToTemp {
    date: string;
    temp: number;
  }

  function WeatherForecast() {
    const [url, setUrl] = useState<string>("https://api.weatherapi.com/v1/forecast.json?key=e32093e7e154445a8db74744252102&q=Marburg&days=3");
    const [inputValue, setInputValue] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherData>();
    const [weekdayToTemp, setWeekdayToTemp] = useState<WeekdayToTemp[]>([]);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };
  
    const handleSubmit = (val: string) => {
      const newUrl = "https://api.weatherapi.com/v1/forecast.json?key=e32093e7e154445a8db74744252102&q=" + val + "&days=3";
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
  
      const arr: WeekdayToTemp[] = [];
  
      for (const entry of data.forecast.forecastday) {
        arr.push({ date: entry.date, temp: entry.day.maxtemp_c });
      }
  
      setWeekdayToTemp(arr);
      setWeatherData(data);
  
      console.log(data);
      return data;
    }
  
    useEffect(() => {
      async function getData() {
        const data: WeatherData = await fetchData();
        setWeatherData(data);
      }
      getData();
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
      if (weatherData == null) return 0;
  
      const foundEntry = weatherData.forecast.forecastday.find((item) => {
        const entryDate = new Date(item.date).getDay();
        if (entryDate === day) {
          return item;
        }
      });
  
      return foundEntry != null ? foundEntry.day.maxtemp_c : 0;
    }
  
    return (
      <div>
        <h1>Weather Data</h1>
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
                return (
                  <div key={x.day}>
                    <div>{x.longDescription}</div>
                    <div>{castDay(x.day)} °C</div>
                  </div>
                );
              })}
            </div>
  
            {weekdayToTemp.map((x) => {
              return (
                <div key={x.date}>
                  <div>{new Date(x.date).toLocaleDateString("de-DE", { dateStyle: "full" })}</div>
                  <div>{x.temp} °C</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
  
  export default WeatherForecast;
  