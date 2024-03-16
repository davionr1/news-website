import { useState } from "react";
import WeatherItem from "./WeatherItem";
import { useEffect } from "react";
import AsyncSelect from "react-select/async"
import WeatherGallery from "./WeatherGallery";

function SearchWeather() {

    const [locationsData, setLocationsData] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {

         getLocations(selectedValue);
    }, [])



    async function getLocations(searchValue) {
        // console.log(selectedValue,"h");
        
        const weatherResponse = await fetch(`http://localhost:4000/locations?value=${searchValue}`)
        const weatherData = await weatherResponse.json()
        
        // console.log(weatherData);
        setLocationsData(weatherData)
    }

    const loadLocations = (searchValue, callback) => {
        setTimeout(() => {
            // console.log("Location Data: ", locationsData)
            const filteredLocations = locationsData.filter((option) => {
                // console.log("option: ",(option['city_ascii']));
                return option.city_ascii.toLowerCase().includes(searchValue.toLowerCase())
            }
            );
            console.log('loadLocations', searchValue, selectedValue, filteredLocations);
            callback(filteredLocations)
            
        }, 500)
    }

    const handleChange = (searchValue) => {
        console.log(searchValue, "gggde");
        setSelectedValue(searchValue);
    };

    return (
        <div className='overlay'>
            <div className='container'>
                <div className="section section_inputs">
                    <AsyncSelect
                        // cacheOptions
                        // defaultOptions
                        value={selectedValue}
                        getOptionLabel={e => e.city_ascii + ', ' + e.admin_name + ', ' + e.iso3}
                        // getOptionValue={e =>e.id}
                        loadOptions={loadLocations}
                        // onInputChange={handleInputChange}
                        onChange={handleChange}
                        // onInputChange={getLocations}
                    />
                </div>
            </div>
            {selectedValue && <WeatherGallery handleLocation={selectedValue} />}
        </div>

    )
};

export default SearchWeather;