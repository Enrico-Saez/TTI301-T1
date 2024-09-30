import 'dotenv/config';

const key = process.env.APIKEY;

async function getCoordinates(city) {
    try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`);
        
        const data = await res.json();

        return {lat: data[0]["lat"], lon: data[0]["lon"]}

    } catch (err) {
        console.log(err.message);
    }
}

async function getWeather(city) {
    try {
        const { lat, lon } = await getCoordinates(city);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);
        const { main: { feels_like }, weather: [{ description }] } = await res.json();
        return { feels_like, description };
    } catch (err) {
        console.log(err.message);
    }
}

console.log(await getWeather("Sao Paulo"));