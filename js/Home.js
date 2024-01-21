document.addEventListener("DOMContentLoaded", function () {
  fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const timestamp = data.items[0].timestamp;
      const validPeriodStart = data.items[0].valid_period.start;
      const validPeriodEnd = data.items[0].valid_period.end;
      console.log("Start Timestamp:", validPeriodStart);
      console.log("End Timestamp:", validPeriodEnd);

      let newdata = data.items[0].forecasts;
      let weather = {};

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

      const Keys = Object.keys(weather);
      const WidgetContainer = document.getElementById("Widget");
      const time = document.getElementById("timestamp");

      // Display timestamp and valid period
      time.innerHTML = `<h3>Start Timestamp: ${validPeriodStart}</h3>`;
      time.innerHTML += `<h3>End Timestamp: ${validPeriodEnd}</h3>`;

      for (j = 0; j < Keys.length; j++) {
        const area = Keys[j];
        const areaDiv = document.createElement("div");
        areaDiv.classList.add("area-container");
        areaDiv.innerHTML += `<h6>Area: ${area}</h6>`;
        areaDiv.innerHTML += `<h5>Forecasts: ${weather[area].join(", ")}</h5>`;
        WidgetContainer.appendChild(areaDiv);
      }
    });
});
