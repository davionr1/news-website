import { useState } from "react";
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
        const weatherResponse = await fetch(`http://localhost:4000/locations?value=${searchValue}`)
        const weatherData = await weatherResponse.json()
        setLocationsData(weatherData)
    }

    const loadLocations = (searchValue, callback) => {
        setTimeout(() => {
            const filteredLocations = locationsData.filter((option) => {
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
                        onChange={handleChange}
                    />
                </div>
            </div>
            {selectedValue && <WeatherGallery handleLocation={selectedValue} />}
        </div>

    )
};

export default SearchWeather;