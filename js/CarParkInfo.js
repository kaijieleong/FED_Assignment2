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
            // console.log(carparkInfo);
            if (Array.isArray(carparkInfo) && carparkInfo.length > 0) {
              let Info = carparkInfo[0];

              // Create an object representing the carpark and push it to the list
              let carparkObject = {
                carparkNumber: carparkData[j].carpark_number,
                lotsAvailable: Info.lots_available,
                totalLots: Info.total_lots,
                lotType: Info.lot_type,
              };

              CarparkLot.push(carparkObject);
            }
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
            /*
            const keys = Object.keys(weather);
            const body = document.querySelector("#body");
            for (let i = 0; i < keys.length; i++) {
              const row = document.createElement("tr");
              const wf = document.createElement("td");
              const forecast = document.createElement("td");

              if (newdata.address.includes(keys[i].toUpperCase())) {
                wf.textContent = "Weather Forecast";
                if (weather[keys[i]].includes("Cloudy")) {
                  const cloudSymbol = document.createElement("span");
                  cloudSymbol.className = "material-symbols-outlined";
                  cloudSymbol.textContent = "cloud";
                  forecast.append(cloudSymbol);
                  forecast.append(document.createTextNode(weather[keys[i]]));
                } else if (weather[keys[i]].includes("rain")) {
                  const cloudSymbol = document.createElement("span");
                  cloudSymbol.className = "material-symbols-outlined";
                  cloudSymbol.textContent = "Rainy";
                  forecast.append(cloudSymbol);
                  forecast.append(document.createTextNode(weather[keys[i]]));
                } else {
                  forecast.textContent = weather[keys[i]];
                }
                row.append(wf);
                row.append(forecast);
                body.append(row);
              }
              
            }
            */

            //console.log(newdata.carparkNumber);
            for (let k = 0; k < CarparkLot.length; k++) {
              if (newdata.carparkNumber === CarparkLot[k].carparkNumber) {
                const LA = parseFloat(CarparkLot[k].lotsAvailable);
                const TL = parseFloat(CarparkLot[k].totalLots);
                let percentage = (LA / TL) * 100;
                percent.textContent = percentage.toFixed(2) + "%";
                tlot.textContent = CarparkLot[k].totalLots;
                lota.textContent = CarparkLot[k].lotsAvailable;
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
