document.addEventListener("DOMContentLoaded", function () {
  HideMsgalert();
  let CarparkLot = [];
  let weather = {};
  GetWeather();

  const APIKEY = "65c2552f71a48870cb8b07de";
  let settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache",
    },
  };

  fetch(`https://fed123-ecda.restdb.io/rest/fedcar`, settings)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      GetLot(data);
    });

  function GetLot(dbdata) {
    fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
      .then((response) => response.json())
      .then((data) => {
        let datas = data.items;
        for (let i = 0; i < datas.length; i++) {
          let carparkData = datas[i].carpark_data;
          for (let j = 0; j < carparkData.length; j++) {
            let carparkInfo = carparkData[j].carpark_info;
            if (Array.isArray(carparkInfo)) {
              let carparkTotalLots = 0;
              let carparkLotsAvailable = 0;

              for (let k = 0; k < carparkInfo.length; k++) {
                let info = carparkInfo[k];
                carparkTotalLots += parseInt(info.total_lots, 10);
                carparkLotsAvailable += parseInt(info.lots_available, 10);
              }

              let carparkObject = {
                carparkNumber: carparkData[j].carpark_number,
                lotsAvailable: carparkLotsAvailable,
                totalLots: carparkTotalLots,
              };
              CarparkLot.push(carparkObject);
            }
          }
        }
        let flag = false;
        for (let i = 0; i < CarparkLot.length; i++) {
          const carparks = CarparkLot[i];
          const carparkNumber = carparks.carparkNumber;
          for (let j = 0; j < dbdata.length; j++) {
            const ids = localStorage.getItem(dbdata[j].id);
            const userid = JSON.parse(ids);
            if (
              userid === dbdata[j].id &&
              dbdata[j].carparknumber === carparkNumber
            ) {
              flag = true;
              const mainContainer = document.querySelector(".box");

              const tableSection = document.createElement("section");
              tableSection.classList.add("table");

              const headerSection = document.createElement("section");
              headerSection.classList.add("table__header");

              const heading = document.createElement("h3");
              const label = document.createElement("label");
              label.textContent = dbdata[j].address;
              heading.appendChild(label);
              headerSection.appendChild(heading);
              tableSection.appendChild(headerSection);
              mainContainer.appendChild(tableSection);

              const bodySection = document.createElement("section");
              bodySection.classList.add("table__body");

              const table = document.createElement("table");
              const tableHeader = document.createElement("thead");
              tableHeader.innerHTML = `
                                <tr>
                                    <th colspan="2">Detail Info</th>
                                </tr>
                            `;
              const tableBody = document.createElement("tbody");
              table.appendChild(tableHeader);
              table.appendChild(tableBody);
              bodySection.appendChild(table);
              tableSection.appendChild(bodySection);
              document.body.appendChild(mainContainer);

              const addName = document.createElement("label");
              const tlot = document.createElement("label");
              const lota = document.createElement("label");
              const percent = document.createElement("label");
              const freeParking = document.createElement("label");
              const nightParking = document.createElement("label");
              const shortTermParking = document.createElement("label");
              const typeOfParkingSystem = document.createElement("label");
              const gantryHeight = document.createElement("label");

              addName.textContent = dbdata[j].address;
              freeParking.textContent = dbdata[j].freeparking;
              nightParking.textContent = dbdata[j].nightparking;
              shortTermParking.textContent = dbdata[j].shorttermparking;
              typeOfParkingSystem.textContent = dbdata[j].typeofparkingsystem;
              gantryHeight.textContent = dbdata[j].gantryheight;

              const keys = Object.keys(weather);
              const wf = document.createElement("label");
              const wft = document.createElement("span");
              for (let w = 0; w < keys.length; w++) {
                if (dbdata[j].address.includes(keys[w].toUpperCase())) {
                  wf.textContent = "Weather Forecast";
                  if (weather[keys[w]].includes("Cloudy")) {
                    wft.className = "material-symbols-outlined";
                    wft.textContent = "cloud";
                    const textNode = document.createTextNode(weather[keys[w]]);
                    wft.appendChild(textNode);
                  } else if (weather[keys[w]].includes("rain")) {
                    wft.className = "material-symbols-outlined";
                    wft.textContent = "Rainy";
                    wft.textContent = weather[keys[w]];
                  } else {
                    wft.textContent = weather[keys[w]];
                  }
                }
              }

              const LA = parseFloat(carparks.lotsAvailable);
              const TL = parseFloat(carparks.totalLots);
              let percentage = (LA / TL) * 100;
              percent.textContent = percentage.toFixed(2) + "%";
              tlot.textContent = carparks.totalLots;
              lota.textContent = carparks.lotsAvailable;

              if (percentage >= 70) {
                percent.classList.add("status", "green");
                lota.classList.add("status", "green");
              } else if (percentage >= 30 && percentage < 70) {
                percent.classList.add("status", "orange");
                lota.classList.add("status", "orange");
              } else {
                percent.classList.add("status", "red");
                lota.classList.add("status", "red");
              }

              const tbody = table.querySelector("tbody");
              const row1 = createRow("Total Lots", carparks.totalLots);
              const row2 = createRow("Lots Available", carparks.lotsAvailable);
              const row3 = createRow("Percentage", percentage.toFixed(2) + "%");
              const row4 = createRow("Free Parking", dbdata[j].freeparking);
              const row5 = createRow("Night Parking", dbdata[j].nightparking);
              const row6 = createRow(
                "Short Term Parking",
                dbdata[j].shorttermparking
              );
              const row7 = createRow(
                "Type Of Parking System",
                dbdata[j].typeofparkingsystem
              );
              const row8 = createRow("Gantry Height", dbdata[j].gantryheight);
              tbody.appendChild(row1);
              tbody.appendChild(row2);
              tbody.appendChild(row3);
              tbody.appendChild(row4);
              tbody.appendChild(row5);
              tbody.appendChild(row6);
              tbody.appendChild(row7);
              tbody.appendChild(row8);
            }
          }
        }
        if (!flag) {
          showMsgalert();
        }
      });
  }

  function createRow(labelText, value) {
    const row = document.createElement("tr");
    const labelCell = document.createElement("th");
    labelCell.textContent = labelText;
    const valueCell = document.createElement("td");
    valueCell.textContent = value;
    row.appendChild(labelCell);
    row.appendChild(valueCell);
    return row;
  }

  function GetWeather() {
    fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast")
      .then((response) => response.json())
      .then((data) => {
        let newdata = data.items[0].forecasts;
        for (let i = 0; i < newdata.length; i++) {
          const area = newdata[i].area;
          const areaForecast = newdata[i].forecast;
          if (!weather[area]) {
            weather[area] = [];
          }
          weather[area].push(areaForecast);
        }
      });
  }

  function showMsgalert() {
    const alertMsg = document.createElement("div");
    alertMsg.id = "msg-alert";
    alertMsg.textContent = "No data found.";
    document.body.appendChild(alertMsg);
  }

  function HideMsgalert() {
    const alertMsg = document.querySelector("#msg-alert");
    if (alertMsg) {
      alertMsg.style.display = "none";
    }
  }
});
