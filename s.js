document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch and display CSV data
  function displayCSVData() {
    fetch("HDBCarparkInformation.csv")
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n");
        const table = document.createElement("table");

        // Create table headers
        const headers = rows[0].split(",");
        const headerRow = document.createElement("tr");

        // Exclude columns 2 and 3
        for (let i = 0; i < headers.length; i++) {
          if (i !== 2 && i !== 3) {
            const th = document.createElement("th");
            th.appendChild(document.createTextNode(headers[i]));
            headerRow.appendChild(th);
          }
        }

        table.appendChild(headerRow);

        // Create table rows
        for (let i = 1; i < rows.length; i++) {
          const rowData = rows[i].split(",");
          console.log(rowData);

          const row = document.createElement("tr");

          // Exclude columns 2 and 3
          for (let j = 0; j < rowData.length; j++) {
            if (j !== 2 && j !== 3) {
              const td = document.createElement("td");
              td.appendChild(document.createTextNode(rowData[j]));
              row.appendChild(td);
            }
          }

          table.appendChild(row);
        }

        // Display the table on the webpage
        document.getElementById("csvTable").innerHTML = "";
        document.getElementById("csvTable").appendChild(table);
      })
      .catch((error) => console.error("Error:", error));
  }

  // Add an event listener to a button with the ID "displayBtn"
  document
    .getElementById("displayBtn")
    .addEventListener("click", displayCSVData);
});
