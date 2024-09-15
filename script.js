let weather = {
    apiKey: "f1689a0dcd1a7b0a30d22d0a22a5e847",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey + "&units=metric"
        )
            .then((response) => {
                if (!response.ok) {
                    alert("City not found.");
                    return;
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function (data) {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { icon, description } = data.weather[0];
        const { speed } = data.wind;

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".temp").innerText = Math.round(temp) + "°C";
        document.querySelector(".weather_icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " Km/h";

        // Fetch background image dynamically from Pixabay
        this.changeBackgroundImage(name);
    },

    changeBackgroundImage: function (city) {
        const apiUrl = "https://pixabay.com/api/?key=45992427-4e53ed39c341cf2a881461c87&q=" + city + "&image_type=photo";
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const imageUrl = data.hits[0].largeImageURL;
                document.body.style.backgroundImage = "url(" + imageUrl + ")";
            });
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

// Add event listener for search bar input
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});

// Fetch initial weather for default city
weather.fetchWeather("Siliguri");
