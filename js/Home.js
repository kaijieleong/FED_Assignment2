document.addEventListener("DOMContentLoaded", function () {
  let CsvList = [];
  const searchInput = document.querySelector(".search");
  const body = document.querySelector("#body");
  const clearbtn = document.querySelector(".btn");
  fetch("../js/HDBCarparkInformation.csv")
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");

      for (let i = 1; i < lines.length; i++) {
        if (i === 0) {
          continue;
        }

        const values = lines[i].split(",");
        //if (values[1] !== "#NAME?") {
        const csvObject = {
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
        CsvList.push(csvObject);
        //}
      }
    });

  clearbtn.addEventListener("click", function (e) {
    searchInput.value = "";
  });
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toUpperCase();

    // Clear existing content in the body
    body.innerHTML = "";
    let counter = 0;
    const total = document.querySelector("#total");
    for (let i = 0; i < CsvList.length; i++) {
      const carpark = CsvList[i];
      if (carpark.address && carpark.address.includes(value)) {
        counter++;
        const button = document.createElement("button");
        button.textContent = "More Detail";
        button.classList.add("detail");

        // Create a new row
        const row = document.createElement("tr");

        // Create and append cells
        const Num = document.createElement("td");
        Num.textContent = counter;
        const addressCell = document.createElement("td");
        addressCell.textContent = carpark.address;
        const Addbutton = document.createElement("td");
        Addbutton.appendChild(button);

        // Append cells to the row
        row.appendChild(Num);
        row.appendChild(addressCell);
        row.appendChild(Addbutton);

        // Append the row to the body
        body.appendChild(row);

        button.addEventListener("click", function () {
          // Retrieve the address when the button is clicked
          const carparkInfo = {
            carparkNumber: carpark.carparkNumber,
            address: carpark.address,
            carparkType: carpark.carparkType,
            typeOfParkingSystem: carpark.typeOfParkingSystem,
            shortTermParking: carpark.shortTermParking,
            freeParking: carpark.freeParking,
            nightParking: carpark.nightParking,
            carparkDecks: carpark.carparkDecks,
            gantryHeight: carpark.gantryHeight,
            carparkBasement: carpark.carparkBasement,
          };
          localStorage.clear();
          localStorage.setItem(
            carpark.carparkNumber,
            JSON.stringify(carparkInfo)
          );
          window.location.href = "../Html/CarParkInfo.html";
        });
      }
    }
    total.textContent = `${counter}`;
  });
});
