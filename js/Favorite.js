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
          //console.log(carpark);
          for (let j = 0; j < carparkData.length; j++) {
            let carparkInfo = carparkData[j].carpark_info;
            if (Array.isArray(carparkInfo)) {
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
              const container = document.createElement("div");
              container.classList.add("box");
              const main = document.createElement("main");
              main.classList.add("table");
              const header = document.createElement("section");
              header.classList.add("table__header");
              const h3 = document.createElement("h3");
              const addressNameLabel = document.createElement("label");
              addressNameLabel.textContent = dbdata[j].address;
              h3.appendChild(addressNameLabel);
              header.appendChild(h3);
              main.appendChild(header);

              const body = document.createElement("section");
              body.classList.add("table__body");
              const table = document.createElement("table");
              table.classList.add("table-primary");
              const thead = document.createElement("thead");
              const tr = document.createElement("tr");
              const th = document.createElement("th");
              th.setAttribute("colspan", "2");
              th.textContent = "Detail Info";
              tr.appendChild(th);
              thead.appendChild(tr);
              table.appendChild(thead);
              const tbody = document.createElement("tbody");

              const createRow = (label, value) => {
                const row = document.createElement("tr");
                const labelCell = document.createElement("th");
                labelCell.textContent = label;
                const valueCell = document.createElement("td");
                valueCell.textContent = value;
                row.appendChild(labelCell);
                row.appendChild(valueCell);
                tbody.appendChild(row);
              };

              createRow("Total Lots", carparks.totalLots);
              createRow("Lots Available", carparks.lotsAvailable);

              const percentage =
                (carparks.lotsAvailable / carparks.totalLots) * 100;
              createRow("Percentage", percentage.toFixed(2) + "%");

              if (percentage >= 70) {
                tbody.lastChild.lastChild.classList.add("status", "green");
                tbody.lastChild.previousSibling.lastChild.classList.add(
                  "status",
                  "green"
                );
              } else if (percentage >= 30 && percentage < 70) {
                tbody.lastChild.lastChild.classList.add("status", "orange");
                tbody.lastChild.previousSibling.lastChild.classList.add(
                  "orange"
                );
              } else {
                tbody.lastChild.lastChild.classList.add("status", "red");
                tbody.lastChild.previousSibling.lastChild.classList.add(
                  "status",
                  "red"
                );
              }

              createRow("Free Parking", dbdata[j].freeparking);
              createRow("Night Parking", dbdata[j].nightparking);
              createRow("Short Term Parking", dbdata[j].shorttermparking);
              createRow(
                "Type Of Parking System",
                dbdata[j].typeofparkingsystem
              );
              createRow("Gantry Height", dbdata[j].gantryheight);

              const keys = Object.keys(weather);
              for (let w = 0; w < keys.length; w++) {
                if (dbdata[j].address.includes(keys[w].toUpperCase())) {
                  const row = document.createElement("tr");
                  const labelCell = document.createElement("th");
                  labelCell.textContent = "Weather Forecast";
                  const valueCell = document.createElement("td");
                  const span = document.createElement("span");
                  if (weather[keys[w]].includes("Cloudy")) {
                    span.className = "material-symbols-outlined";
                    span.textContent = "cloud";
                    valueCell.appendChild(span);
                    valueCell.appendChild(
                      document.createTextNode(weather[keys[w]])
                    );
                  } else if (weather[keys[w]].includes("rain")) {
                    span.className = "material-symbols-outlined";
                    span.textContent = "Rainy";
                    valueCell.appendChild(span);
                    valueCell.appendChild(
                      document.createTextNode(weather[keys[w]])
                    );
                  } else {
                    valueCell.textContent = weather[keys[w]];
                  }
                  row.appendChild(labelCell);
                  row.appendChild(valueCell);
                  tbody.appendChild(row);
                }
              }

              table.appendChild(tbody);
              body.appendChild(table);
              main.appendChild(body);
              container.appendChild(main);
              document.body.appendChild(container);
            }
          }
        }
        if (!flag) {
          showMsgalert();
        }
      });
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
    const alertMsg = document.querySelector("#msg-alert");
    alertMsg.style.display = "block";
  }

  function HideMsgalert() {
    const alertMsg = document.querySelector("#msg-alert");
    alertMsg.style.display = "none";
  }
});
