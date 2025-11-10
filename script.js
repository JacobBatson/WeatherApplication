const button = document.querySelector("button");
const input = document.querySelector("input");
const weatherResult = document.getElementById("weather-result")

//This function helps me see the api output in console
// const response = fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/$${nunya}?key=nunya")
// .then((response) => {
//     return response.json()
// })
// .then((response) => {
//     console.log(response);
// })

async function getApiKey(){
    const response = await fetch("apiKey.txt")
    const data = await response.text()
    return data.trim();
}

async function getWeather(city) {
    const apiKey = await getApiKey();
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`)
    const data = response.json()
    return data
}

button.onclick =  async () => {
    const city = input.value; 
    input.value = "";

    try{
        const weatherData = await getWeather(city);
        const weather = {
            city: weatherData.address,
            temperature: weatherData.currentConditions.temp,
            condition: weatherData.currentConditions.conditions,
        };
        displayWeather(weather);
    } catch (error){
        console.log("error fectching", error)
        weatherResult.innerHTML = `<p>Unable to fetch data<p>`
    }


}

function displayWeather(weather) {
    weatherResult.innerHTML = `
        <h2>${weather.city}</h2>
        <p>Temperature: ${weather.temperature}<p>
        <p>Condition: ${weather.condition}<p>
    `;
}
