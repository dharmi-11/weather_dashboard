const weatherApp = {
    // This is your active key from the screenshot
    apiKey: "18f8b72d6ed19733046146a2338fb1b9", 

    // Day 3 Task: Async function using the Await keyword
    fetchData: async function(city) {
        // Day 4 Task: Fetch API with dynamic URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
        
        try {
            const response = await fetch(url);

            // Day 4 Task: Handling JSON and potential errors
            if (!response.ok) {
                // Specific error if the key is verified but not yet "live"
                if (response.status === 401) throw new Error("API Key is still activating. Try again in 10 mins.");
                throw new Error("City not found. Check spelling!");
            }

            const data = await response.json();
            this.updateUI(data);

        } catch (error) {
            alert(error.message);
        }
    },

    updateUI: function(data) {
        document.getElementById("weather-box").classList.remove("hidden");
        document.getElementById("city-name").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";
    }
};

// Day 1 & 2 Logic: Handling the user's click event
document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("city-input").value.trim();
    if (input) weatherApp.fetchData(input);
});

// Allow 'Enter' key to trigger search
document.getElementById("city-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const input = e.target.value.trim();
        if (input) weatherApp.fetchData(input);
    }
});