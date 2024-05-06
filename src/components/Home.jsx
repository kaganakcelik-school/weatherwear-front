import axios from "axios";
import { useState, useEffect } from 'react'

const Home = () => {
    const [location, setLocation] = useState(null)
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (!location) {
            getLocation()
        }
    }, [])

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(latitude, longitude)
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Make API call to OpenWeatherMap
        axios
            .get(`https://weatherwear-back.onrender.com/api/weather/${latitude},${longitude}`)
            .then(res => {
                console.log(res.data)
                setWeather(res.data)
            })
        
    }

    const error = () => {
        console.log("Unable to retrieve your location");
    }


    return (
        <div>
            <h1>Weather Wear</h1>
            {/* {!location ? <button onClick={getLocation}>Get Location</button> : null} */}
            {location && !weather ? <p>Loading weather data...</p> : null}
            {/* {weather ? (
                <div>
                <p>Location: {weather.name}</p>
                <p>Temperature: {weather.main.temp} °C</p>
                <p>Weather: {weather.weather[0].description}</p>
                </div>
            ) : null} */}
            {weather && 
                <div>
                    weather: {weather.current.temp_f}
                    <br />
                    feels like: {weather.current.feelslike_f}
                </div>
            
            }
        </div>
    )
}

export default Home