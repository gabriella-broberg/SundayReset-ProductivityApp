const apiKey = "4666f9a0e956b2a7840a8dd0d53d8c9a";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const errorDiv = document.querySelector(".error");
  const weatherDiv = document.querySelector(".weather");

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    errorDiv.style.display = "block";
    weatherDiv.style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";

    // Select the weather icon within the current weatherDiv
    const weatherIcon = weatherDiv.querySelector(".weather-icon");

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }

    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";
  }
}

searchBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

// Function to get user's current location using Geolocation API
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => reject(error)
      );
    } else {
      reject("Geolocation is not supported by this browser");
    }
  });
}

// Function to get city name based on coordinates using a reverse geocoding API
async function getCityName(coords) {
  const reverseGeocodingUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${apiKey}`;

  try {
    const response = await fetch(reverseGeocodingUrl);
    const data = await response.json();

    if (data && data.length > 0) {
      return data[0].name;
    } else {
      throw new Error("City not found");
    }
  } catch (error2) {
    throw new Error2("Error fetching city name");
  }
}

// Function to display weather for the user's current location
async function displayWeatherForCurrentLocation() {
  try {
    const coords = await getCurrentLocation();
    const cityName = await getCityName(coords);

    // Display weather for the current location
    checkWeather(cityName);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Call the function to display weather for the user's current location
displayWeatherForCurrentLocation();

cityNameElement.innerHTML = cityName;
