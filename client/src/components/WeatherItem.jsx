import './weather.css'
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import WeatherGallery from './WeatherGallery';


const WeatherItem = ({ handleLocation }) => {
    const [locationWeather, setLocationWeather] = useState(null);

    // useEffect(() => {
    //     const fetchWeatherData = async () => {
    //         if (!handleLocation) return;
    //         const { city_ascii, admin_name, iso3 } = handleLocation;
    //         const location = `${city_ascii} ${admin_name} ${iso3}`;
    //         console.log(handleLocation, "jjjjjjjjjjj");
    //         const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    //         const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}`);
    //         const data = await response.json();
    //         setLocationWeather(data);
    //     };

    //     fetchWeatherData();
    // }, [handleLocation]);

    console.log('Location Weather: ',locationWeather)
    // console.log('Location weather length:', location.length)


    return (
        
         <WeatherGallery handleSetLocation={locationWeather}/>
         
    )
}


export default WeatherItem;

