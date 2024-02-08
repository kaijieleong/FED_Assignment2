document.addEventListener("DOMContentLoaded", function () {
  let weather = {};
  GetWeather();
  function GetWeather() {
    fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const timestamp = data.items[0].timestamp;
        const validPeriodStart = data.items[0].valid_period.start;
        const validPeriodEnd = data.items[0].valid_period.end;
        console.log("Start Timestamp:", validPeriodStart);
        console.log("End Timestamp:", validPeriodEnd);

        let newdata = data.items[0].forecasts;

        for (i = 0; i < newdata.length; i++) {
          const area = newdata[i].area;
          const areaForecast = newdata[i].forecast;
          //console.log("Area:", newdata[i].area);
          //console.log("Forecast:", newdata[i].forecast);
          if (!weather[area]) {
            weather[area] = [];
          }

          weather[area].push(areaForecast);
        }

        const keys = Object.keys(weather);
        const body = document.querySelector("#body");
        for (let i = 0; i < keys.length; i++) {
          const row = document.createElement("tr");
          const location = document.createElement("td");
          const forecast = document.createElement("td");
          location.textContent = keys[i];

          if (weather[keys[i]].includes("Cloudy")) {
            const cloudSymbol = document.createElement("span");
            cloudSymbol.className = "material-symbols-outlined";
            cloudSymbol.textContent = "cloud";
            forecast.appendChild(cloudSymbol);
            forecast.appendChild(document.createTextNode(weather[keys[i]]));
          } else if (weather[keys[i]].includes("Rain")) {
            const cloudSymbol = document.createElement("span");
            cloudSymbol.className = "material-symbols-outlined";
            cloudSymbol.textContent = "Rainy";
            forecast.appendChild(cloudSymbol);
            forecast.appendChild(document.createTextNode(weather[keys[i]]));
          } else if (weather[keys[i]].includes("Thundery")) {
            const cloudSymbol = document.createElement("span");
            cloudSymbol.className = "material-symbols-outlined";
            cloudSymbol.textContent = "thunderstorm";
            forecast.appendChild(cloudSymbol);
            forecast.appendChild(document.createTextNode(weather[keys[i]]));
          } else {
            forecast.textContent = weather[keys[i]];
          }
          row.appendChild(location);
          row.appendChild(forecast);
          body.appendChild(row);
        }
      });
  }
});
