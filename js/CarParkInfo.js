document.addEventListener("DOMContentLoaded", function () {
  HideMsgalert();
  let CarparkLot = [];
  let weather = {};
  GetWeather();
  GetLot();

  console.log(CarparkLot);
  function GetLot() {
    fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
      .then((response) => response.json())
      .then((data) => {
        let datas = data.items;
        for (let i = 0; i < datas.length; i++) {
          let carparkData = datas[i].carpark_data;
          //console.log(carpark);
          for (let j = 0; j < carparkData.length; j++) {
            let carparkInfo = carparkData[j].carpark_info;
            if (Array.isArray(carparkInfo)) {
              // Initialize variables to store total_lots and lots_available for each car park
              let carparkTotalLots = 0;
              let carparkLotsAvailable = 0;

              for (let k = 0; k < carparkInfo.length; k++) {
                let info = carparkInfo[k];
                //console.log(info.total_lots);
                carparkTotalLots += parseInt(info.total_lots, 10);
                carparkLotsAvailable += parseInt(info.lots_available, 10);

                let carparkObject = {
                  carparkNumber: carparkData[j].carpark_number,
                  lotsAvailable: carparkLotsAvailable,
                  totalLots: carparkTotalLots,
                };
                CarparkLot.push(carparkObject);
              }
            }

            //console.log(carparkInfo);

            //console.log(CarparkLot);
          }
        }
        let flag = false;
        const addName = document.getElementById("address-name");
        const tlot = document.querySelector("#tl");
        const lota = document.querySelector("#la");
        const percent = document.querySelector("#p");
        const freeParking = document.querySelector("#fp");
        const nightParking = document.querySelector("#np");
        const shortTermParking = document.querySelector("#stp");
        const typeOfParkingSystem = document.querySelector("#tops");
        const gantryHeight = document.querySelector("#gh");
        for (let i = 0; i < CarparkLot.length; i++) {
          const carparks = CarparkLot[i];
          const carparkNumber = carparks.carparkNumber;
          const Data = localStorage.getItem(carparkNumber);
          const newdata = JSON.parse(Data);

          if (newdata) {
            flag = true;
            addName.textContent = newdata.address;
            freeParking.textContent = newdata.freeParking;
            nightParking.textContent = newdata.nightParking;
            shortTermParking.textContent = newdata.shortTermParking;
            typeOfParkingSystem.textContent = newdata.typeOfParkingSystem;
            gantryHeight.textContent = newdata.gantryHeight;

            const keys = Object.keys(weather);
            const wf = document.querySelector("#wf");
            const wft = document.querySelector("#wft");
            for (let w = 0; w < keys.length; w++) {
              if (newdata.address.includes(keys[w].toUpperCase())) {
                wf.textContent = "Weather Forecast";
                if (weather[keys[w]].includes("Cloudy")) {
                  wft.className = "material-symbols-outlined";
                  wft.textContent = "cloud";
                  console.log(weather[keys[w]]);
                  wft.appendChild(document.createTextNode(weather[keys[w]]));
                } else if (weather[keys[w]].includes("Rain")) {
                  wft.className = "material-symbols-outlined";
                  wft.textContent = "Rainy";
                  wft.textContent = weather[keys[w]];
                } else {
                  wft.textContent = weather[keys[w]];
                }
              }
            }

            //console.log(newdata.carparkNumber);
            for (let k = 0; k < CarparkLot.length; k++) {
              if (newdata.carparkNumber === CarparkLot[k].carparkNumber) {
                const LA = parseFloat(CarparkLot[k].lotsAvailable);
                const TL = parseFloat(CarparkLot[k].totalLots);
                let percentage = (LA / TL) * 100;
                percent.textContent = percentage.toFixed(2) + "%";
                tlot.textContent = CarparkLot[k].totalLots;
                lota.textContent = CarparkLot[k].lotsAvailable;

                if (percentage >= 70) {
                  percent.classList.add("green");
                  lota.classList.add("green");
                } else if (percentage >= 30 && percentage < 70) {
                  percent.classList.add("orange");
                  lota.classList.add("orange");
                } else {
                  percent.classList.add("red");
                  lota.classList.add("red");
                }
              }
            }
          }
        }
        console.log(flag);
        if (flag === false) {
          showMsgalert();
        }
      });
  }

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
      });
  }

  function showMsgalert() {
    const alertMsg = document.querySelector("#msg-alert");
    alertMsg.style.display = "block";
  }
  function HideMsgalert() {
    const alertMsg = document.querySelector("#msg-alert");
    alertMsg.style.display = "none";
  }
});
