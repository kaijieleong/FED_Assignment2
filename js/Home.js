document.addEventListener("DOMContentLoaded", function () {
  let carparksList = []; // Initialize an empty list
  let csvList = []; // Initialize an empty list to store CSV data
  // Merge the lists based on carpark number
  let mergedList = [];

  // Fetch carpark availability data
  fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
    .then((response) => response.json())
    .then((data) => {
      let datas = data.items;

      for (let i = 0; i < datas.length; i++) {
        let carpark = datas[i].carpark_data;

        for (let j = 0; j < carpark.length; j++) {
          let car = carpark[j].carpark_info;

          if (Array.isArray(car) && car.length > 0) {
            let carparkInfo = car[0];

            // Create an object representing the carpark and push it to the list
            let carparkObject = {
              lotsAvailable: carparkInfo.lots_available,
              totalLots: carparkInfo.total_lots,
              carparkNumber: carpark[j].carpark_number,
              lotType: carparkInfo.lot_type,
            };

            carparksList.push(carparkObject);
          }
        }
      }

      // Fetch CSV data
      return fetch("../js/HDBCarparkInformation.csv");
    })
    .then((response) => response.text())
    .then((data) => {
      // Split the CSV data into an array of lines
      const lines = data.split("\n");

      // Process each line and add it to the list
      for (let i = 1; i < lines.length; i++) {
        // Skip the header line (assuming the first line is the header)
        if (i === 0) {
          continue;
        }

        // Split each line into an array of values (assuming comma-separated values)
        const values = lines[i].split(",");

        // Create an object representing the CSV data and push it to the list
        let csvObject = {
          carparkNumber: values[0],
          address: values[1],
          xCoord: parseFloat(values[2]),
          yCoord: parseFloat(values[3]),
          carparkType: values[4],
          typeOfParkingSystem: values[5],
          shortTermParking: values[6],
          freeParking: values[7],
          nightParking: values[8],
          carparkDecks: parseInt(values[9]),
          gantryHeight: parseFloat(values[10]),
          carparkBasement: values[11],
        };

        csvList.push(csvObject);
      }

      for (let i = 0; i < carparksList.length; i++) {
        let carpark = carparksList[i];
        let matchingCSV = null;

        for (let j = 0; j < csvList.length; j++) {
          if (csvList[j].carparkNumber === carpark.carparkNumber) {
            matchingCSV = csvList[j];
            break;
          }
        }

        // Merge the carpark and matching CSV data
        let mergedCarpark = { ...carpark, ...(matchingCSV || {}) };
        mergedList.push(mergedCarpark);
      }

      console.log("Merged List:", mergedList);
    });
  const tableTemplate = document.querySelector("carpark_table");
  const searchInput = document.querySelector("search");
  const tableinput = document.querySelector("data");
  const clearbtn = document.querySelector("btn");
  const info_carpark = [];
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    info_carpark.forEach((mergedList) => {
      const isVisible = mergedList.address.toLowerCase().includes(value);
      mergedList.element.classList.toggle("hide", !isVisible);
    });
    checkedData();
  });

  clearbtn.addEventListener("click", function (e) {
    // Prevent default action of the button
    e.preventDefault();
    searchInput.value = "";
  });

  function checkedData() {
    info_carpark = mergedList.map((mergedList) => {
      const table = document.importNode(tableTemplate.content, true)
        .children[0];
      const header = table.querySelector(".table__body"); // Adjust the selector accordingly
      const body = table.querySelector(".table-secondary"); // Adjust the selector accordingly

      if (header && body) {
        header.textContent = mergedList.address;
        body.textContent = mergedList.lotsAvailable;
        tableinput.appendChild(table);

        return {
          address: mergedList.address,
          lotsAvailable: mergedList.lotsAvailable,
          element: table,
        };
      } else {
        console.error("Header or body element not found");
        return null;
      }
    });
  }
});
