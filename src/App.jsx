import React, { useState } from "react";
import "./App.css";

function App() {
  //to protect the api key I stored it in a .env file and referenced it in the code using import.meta.env
  const apiKey = import.meta.env.VITE_API_KEY;
  //the data for the weather from the api is initially empty
  const [weatherData, setWeatherData] = useState([{}]);
  //the initial value in the input box is set to an empty string
  const [city, setCity] = useState("");

  const getWeather = (event) => {
    //the if statement checks if the key event equals the enter key then the data for a specific city is fetched from the weather api
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((res) => res.json()) //the promise is being consumed by the then statement
        .then((data) => {
          //the line below updates the weatherData variable with data from the api
          setWeatherData(data);
          //the line below clears the input box after a city's temperature data is shown
          setCity("");
        });
    }
  };
  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter a city name"
        /*the onchange event updates the city variable with the city name the user enters into the input box*/
        onChange={(e) => setCity(e.target.value)}
        //the value below is the city name the user enters
        value={city}
        onKeyDown={getWeather} //the getWeather function is called when the Enter key is clicked
      />
      {/*if the city name the user enters is not known or no city is entered the heading is shown*/}
      {typeof weatherData.main === "undefined" ? (
        <div className="heading">
          <p>
            Welcome to the weather app. Please enter a city name and click enter
          </p>
        </div>
      ) : (
        /*if a valid city name is entered then the weather data below is rendered to the page*/
        <div>
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;
