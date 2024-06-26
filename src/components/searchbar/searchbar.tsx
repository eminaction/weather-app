import "react";
import "swr";
import "./searchbar.css";
import { useState, ChangeEvent } from "react";
import useSWR from "swr";

// Fetcher function

function SearchBar() {
  interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    rain: {
      "1h": number;
    };
  }
  const fetcher = (...args: [string]) =>
    fetch(...args).then((res) => res.json());

  const [city, setCity] = useState<string>(""); // State to hold what the user types
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const {
    data: weatherData,
    error,
    isLoading,
  } = useSWR<WeatherData | null>(
    searchCity
      ? `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=654bfe91a3b12d5b95bbb8bec98174ae`
      : null,
    fetcher
  );

  // Function to handle input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  // Function to handle the search button click
  const handleSearchClick = () => {
    setSearchCity(city);
  };

  // Rest of your component remains mostly the same
  return (
    <div>
      <div className="searchbar">
        <input
          type="text"
          value={city} // Connect input to the state
          onChange={handleInputChange} // Listen for changes
          placeholder="Enter City ..."
        />
        <button type="submit" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <div className="current-weather">
        <h4>{city.toUpperCase()}</h4>
        <div>
          {error && <div>Failed to load</div>}
          {isLoading && <div>Loading...</div>}
          {weatherData && (
            <div className="weather-data">
              <div className="temp">
                <h5>Temp °C</h5>
                <h3>{Math.round(weatherData.main.temp - 273.15)}</h3>
              </div>

              <div className="feels-like">
                <h5>Feels Like °C</h5>
                <h3>{Math.round(weatherData.main.feels_like - 273.15)}</h3>
              </div>

              <div className="cloud">
                <h5>Cloud %</h5>
                <h3>
                  {weatherData && weatherData.clouds
                    ? weatherData.clouds.all
                    : null}
                </h3>
              </div>

              <div className="rain">
                <h5>Rain mm</h5>
                <h3>
                  {weatherData && weatherData.rain ? weatherData.rain["1h"] : 0}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SearchBar;
