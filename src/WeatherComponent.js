import React, { useState, useEffect } from "react";
import axios from "axios";
import { WiHumidity, WiThermometer, WiStrongWind, WiSunrise, WiSunset } from "react-icons/wi";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gradientColors, setGradientColors] = useState(["from-blue-800", "to-indigo-900"]);
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);


  const determineGradientColors = (weatherCondition) => {
    let fromColor;
    let toColor;

    // Determine gradient colors based on weather condition
    switch (weatherCondition) {
      case "Clear":
        fromColor = "to-indigo-900";
        toColor  = "from-blue-500";
        break;
      case "Clouds":
        fromColor = "to-gray-800";
        toColor = "from-gray-400";
        break;
      case "Rain":
        fromColor = "to-indigo-800";
        toColor = "from-blue-600";
        break;
      case "Thunderstorm":
        fromColor = "to-gray-900";
        toColor = "from-gray-600";
        break;
      case "Snow":
        fromColor = "from-blue-400";
        toColor = "to-blue-300";
        break;
      default:
        fromColor = "to-indigo-900";
        toColor = "from-blue-800";
    }

    setGradientColors([toColor, fromColor]);
  };

  useEffect(() => {
    if (weatherData && weatherData.weather) {
      determineGradientColors(weatherData.weather[0].main);
    }
  }, [weatherData]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error fetching weather data. Please check city name.");
    }
  };

  return (
    <div
      className={`flex justify-center items-center h-screen  ${gradientColors.join(
        " "
      )}`}
    >
      <div className="bg-gradient-to-r p-8 m-1 rounded-lg shadow-md text-white max-w-xl shadow-xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent border-b border-white py-2 px-4 w-full mb-4 focus:outline-none bg-white rounded text-gray-900"
          />
          <button
            type="submit"
            className="bg-white text-blue-500 px-6 py-2 rounded-full uppercase tracking-wide font-semibold focus:outline-none hover:bg-blue-100"
          >
            Search
          </button>
        </form>
        {loading ? (
          <div className="animate-pulse">
            <br />
            <br />
            <br />
            <div className="h-8 bg-gradient-to-r from-blue-800 to-indigo-900 w-full rounded-md mb-2"></div>
            <div className="h-8 bg-gradient-to-r from-blue-800 to-indigo-900 w-full rounded-md mb-2"></div>
            <div className="h-8 bg-gradient-to-r from-blue-800 to-indigo-900 w-full rounded-md mb-2"></div>
            <div className="h-8 bg-gradient-to-r from-blue-800 to-indigo-900 w-full rounded-md mb-2"></div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : weatherData ? (
          <div>
            <h2 className="text-4xl font-semibold mb-4 m-2">
              {weatherData.name}
            </h2>
            <div className="flex items-center justify-center">
              <div className="rounded-full border flex items-center shadow-inner pt-2 bg-white pr-6 ">
                <img
                  src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                  alt="weather icon"
                  className=""
                />
                <p className="text-xl text-blue-800 font-bold mb-2">{weatherData.weather[0].main}</p>
              </div>
            </div>
            <p className="mt-4">{weatherData.weather[0].description}</p>
            <p className="mt-4">
              <WiThermometer className="inline mr-2" />{" "}
              Temperature: {Math.round(weatherData.main.temp - 273.15)}°C
            </p>
            <p className="mt-2">
              <WiHumidity className="inline mr-2" />{" "}
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="mt-2">
              <WiStrongWind className="inline mr-2" />{" "}
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
            <p className="mt-2">
              <WiSunrise className="inline mr-2" />{" "}
              Sunrise:{" "}
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="mt-2">
              <WiSunset className="inline mr-2" />{" "}
              Sunset:{" "}
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherComponent;
