import "react";
import "swr";
import "./searchbar.css";
import { useState } from "react";
import useSWR from "swr";

// Fetcher function

function SearchBar() {
  const [city, setCity] = useState<string>(""); // State to hold what the user types

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
  }

  const {
    data: weatherData,
    error,
    isLoading,
  } = useSWR<WeatherData | null>(
    city
      ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=654bfe91a3b12d5b95bbb8bec98174ae`
      : null,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(weatherData);

  // Function to update the city state when the user types
  const handleInputChange = (event) => {
    setCity(event.target.value);
  }; // re-reders after every letter entered

  // AI prompted this:

  // AI also prompted this = rest of the component to handle loading, errors, and displaying data

  return (
    <div>
      <div className="searchbar">
        <input
          type="text"
          value={city} // Connect input to the state
          onChange={handleInputChange} // Listen for changes
          placeholder="Enter City"
        />
        <button type="submit">Search</button>
      </div>
      <div className="current-weather">
        <h3>
          Weather for ... <br /> {city}
        </h3>
        <p>
          {weatherData ? Math.round(weatherData.main.temp - 273.15) : null}°C
        </p>
      </div>
    </div>
  );
}

//   return <div>hello {data.name}!</div>;

export default SearchBar;

//connect api - pull one location
//useState to remember current location
