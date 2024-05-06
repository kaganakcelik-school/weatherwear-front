import axios from "axios";
import { useState, useEffect } from 'react'
import logoImage from './../assets/logo.svg'

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

        //make api call to OpenWeatherMap
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
            <div className='flex flex-row'>
                <img src={logoImage} className='w-20 mx-2'/>
                <h1 className='text-5xl p-2 text-sky-800 my-4' >wearweather</h1>
            </div>
            
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
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col p-2'>
                        <img src={`https:${weather.current.condition.icon}`}/>
                        <p>Temperature: {weather.current.temp_f} <span className='text-xs text-gray-500'>(F)</span></p>
                        <p>Feels Like: {weather.current.feelslike_f} <span className='text-xs text-gray-500'>(F)</span></p>
                    </div>
                </div>
                
            
            }
        </div>
    )
}

export default Home