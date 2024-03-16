import { FaArrowDown, FaArrowUp, FaWind, FaSun, FaCloudRain, FaMoon, FaClock, FaCalendarDay } from "react-icons/fa";

import { WiHumidity } from "react-icons/wi";
import { useEffect, useState } from "react";
import './weather.css'
import React from "react";

const WeatherGallery = (handleLocation) => {
    const [locationWeather, setLocationWeather] = useState([])
    const weatherItem = handleLocation.handleLocation;
    //look into why the 3rd party request is not sending anything back
    useEffect(() => {
        async function getWeatherDetails() {
            if (!weatherItem) return;

            const { city_ascii, admin_name, iso3 } = weatherItem;
            const location = `${city_ascii} ${admin_name} ${iso3}`;
            // console.log(location, "kk");
            // console.log(weatherItem, "j");

            const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}`);
            const data = await response.json();

            setLocationWeather(data);
            console.log(data, "qq");
            // console.log(locationWeather, "tttttttt");
        }
        getWeatherDetails()
    }, [handleLocation])

    function createWeatherItem() {
    //   const { resolvedAddress, currentConditions, temp, description} = locationWeather
        
            if (locationWeather) {
                return (
                    <div>

                        <div className="section section_temperature">
                            <div className="icon">
                                <h3>{locationWeather.resolvedAddress}</h3>

                                <img
                                src="https://cdn-icons-png.flaticon.com/128/414/414927.png"
                                alt="Weather icon"
                            />
                             {locationWeather.currentConditions && <h1>{locationWeather.currentConditions.icon}</h1>}

                           {locationWeather.description && <h3>{locationWeather.description}</h3>}
                        </div>
                        <div className="temperature">
                            <div>
                                <small>Current Temp</small>
                               {locationWeather.currentConditions && <h1>{locationWeather.currentConditions.temp}°</h1>}
                            </div>
                            <div>
                                <small>Feels Like:</small>
                               {locationWeather.currentConditions && <h3>{locationWeather.currentConditions.feelslike}°</h3>}
                            </div>
                        </div>
                    </div>
                    <div className="section section_descriptions">

                        <div className="card">
                            <div className="description_card-icon">
                                <FaCloudRain />
                                <small>Precipitation Chance</small>
                            </div>
                          {locationWeather.currentConditions &&  <h2>{locationWeather.currentConditions.precipprob}%</h2>}
                        </div>

                        <div className="card">
                            <div className="description_card-icon">
                                <FaWind />
                                <small>wind speed</small>
                            </div>

                            {locationWeather.currentConditions && <h2> {locationWeather.currentConditions.windspeed}mph</h2>}
                        </div>

                        <div className="card">
                            <div className="description_card-icon">
                                <WiHumidity />
                                <small>humidity</small>
                            </div>

                            {locationWeather.currentConditions && <h2>{locationWeather.currentConditions.humidity}%</h2>}
                        </div>

                        <div className="card-suntime">
                            <div className="description_card-icon">
                                <FaCalendarDay />
                                <small>Date:</small>
                            </div>
                            {locationWeather.days && <h2>{locationWeather?.days[0].datetime}</h2>}

                            <div className="description_card-icon">
                                <FaClock />
                                <small>Time:</small>
                            </div>
                            {locationWeather.currentConditions && <h2>{locationWeather.currentConditions.datetime}</h2>}
                        </div>

                        <div className="card-suntime">
                            <div className="description_card-icon">
                                <FaArrowUp />

                                <small>max temp</small>
                            </div>

                            {locationWeather.days && <h2>{locationWeather?.days[0].tempmax}°</h2>}
                            <br></br>
                            <div className="description_card-icon">
                                <FaArrowDown />
                                <small>min temp</small>
                            </div>

                            {locationWeather.days && <h2>{locationWeather?.days[0].tempmin}°</h2>}
                        </div>
                        <div className="card-suntime">
                            <div className="description_card-icon">
                                <FaSun />
                                <small>sunrise</small>
                            </div>
                            {locationWeather.currentConditions && <h2>{locationWeather.currentConditions.sunrise}</h2>}
                            <div className="description_card-icon">
                                <FaMoon />
                                <small>sunset</small>
                            </div>
                            {locationWeather.currentConditions && <h2>{locationWeather.currentConditions.sunset}</h2>}
                            </div>
                        </div>
                    </div>
                )
            }
        
    }

    return (
        <div
            className="weatherItem"
        >
            { createWeatherItem()}
        </div>
    )

}
export default WeatherGallery;