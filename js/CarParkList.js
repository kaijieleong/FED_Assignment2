document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch and display CSV data
  function displayCSVData() {
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

          total++; // Increment total count

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

  // Call the function to display CSV data
  displayCSVData();
});
