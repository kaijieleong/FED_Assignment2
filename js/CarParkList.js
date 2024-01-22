var currentURL = window.location.href;
console.log(currentURL);
var hdbCN, CN;
var apiCN = [];
var carINFO = [];
if (currentURL.includes("Html/CarParkList.html")) {
  displayCSVData();
} else if (currentURL.includes("Html/CarParkInfo.html")) {
  CarparkAPI();
  setTimeout(() => {
    SearchData();
  }, 1000);
}
//var loc = document.querySelector('.input-group input');
function displayCSVData() {
  fetch("../HDBCarparkInformation.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n");
      const table = document.createElement("table");
      let total = 0; // Initialize total as 0

      // Create table headers
      const headers = rows[0].split(",");
      var tablehead = document.createElement("thead");
      var headerRow = document.createElement("tr");
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes("_")) {
          headers[i] = headers[i].replace(/_/g, " ");
        }
      }
      // Exclude columns 2, 3, 10, 11, and 9
      for (let i = 0; i < headers.length; i++) {
        if (![2, 3, 10, 11, 9].includes(i)) {
          const th = document.createElement("th");
          th.appendChild(document.createTextNode(headers[i]));
          headerRow.appendChild(th);
        }
      }
      tablehead.appendChild(headerRow);
      table.appendChild(tablehead);

      // Create table rows
      for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(",");

        const row = document.createElement("tr");
        //console.log(rowData);
        total++; // Increment total count
        // Get hdb CarPark_number
        for (let x = 0; x < rowData.length; x++) {
          hdbCN = rowData;
          console.log(hdbCN);
        }
        // Exclude columns 2, 3, 10, 11, and 9
        for (let j = 0; j < rowData.length; j++) {
          if (![2, 3, 10, 11, 9].includes(j)) {
            const td = document.createElement("td");
            td.appendChild(document.createTextNode(rowData[j]));
            row.appendChild(td);
          }
        }

        table.appendChild(row);
      }
      // Display the total on the webpage
      document.getElementById("total").innerHTML = total;

      // Display the table on the webpage
      const csvTableElement = document.getElementById("csvTable");
      csvTableElement.innerHTML = ""; // Clear previous content
      csvTableElement.appendChild(table);
    })
    .catch((error) => console.error("Error:", error));
}
function CarparkAPI() {
  fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const carparkDataArray = data.items[0].carpark_data;
      //console.log(carparkDataArray);
      for (let i = 0; i < carparkDataArray.length; i++) {
        CN = carparkDataArray[i];
        apiCN.push(carparkDataArray[i].carpark_number);
        //console.log(carparkDataArray[i].carpark_number);
      }
      console.log(apiCN.length);
    });
}
function SearchData() {
  fetch("HDBCarparkInformation.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n");
      const table = document.createElement("table");
      let total = 0; // Initialize total as 0
      // Create table headers
      const headers = rows[0].split(",");
      var tablehead = document.createElement("thead");
      var headerRow = document.createElement("tr");
      //console.log(headers);
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes("_")) {
          headers[i] = headers[i].replace(/_/g, " ");
        }
      }
      //console.log(apiCN);
      console.log(apiCN.length);

      // Exclude columns 2, 3, 10, 11, and 9
      for (let i = 0; i < headers.length; i++) {
        if (![2, 3, 10, 11, 9].includes(i)) {
          const th = document.createElement("th");
          th.appendChild(document.createTextNode(headers[i]));
          headerRow.appendChild(th);
        }
      }
      tablehead.appendChild(headerRow);
      table.appendChild(tablehead);
      for (let i = 0; i < apiCN.length; i++) {
        //console.log(i);
        if (apiCN[i].carpark_number === hdbCN) {
          carINFO.push(apiCN[i]);
        }
        //console.log(carINFO);
      }

      // Create table rows
      for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(",");
        for (let x = 0; x < rowData.length; x++) {
          hdbCN = rowData;
          //console.log(hdbCN);
        }
        //console.log(hdbCN);
        const row = document.createElement("tr");
        // Exclude columns 2, 3, 10, 11, and 9
        for (let j = 0; j < rowData.length; j++) {
          //console.log(j);
          if (![2, 3, 10, 11, 9].includes(j)) {
            //console.log(apiCN);
            if (apiCN === hdbCN) {
              const td = document.createElement("td");
              td.appendChild(document.createTextNode(rowData[j]));
              row.appendChild(td);
            }
          }
        }

        table.appendChild(row);
      }
      // Display the total on the webpage
      document.getElementById("total").innerHTML = total;

      // Display the table on the webpage
      const csvTableElement = document.getElementById("csvTable");
      csvTableElement.innerHTML = ""; // Clear previous content
      csvTableElement.appendChild(table);
    });
}
