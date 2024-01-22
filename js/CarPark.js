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

        const filterLocationInput = document.getElementById("filterLocation");
        filterLocationInput.addEventListener("input", function () {
          const filterLocationText = filterLocationInput.value.toLowerCase();
          const filteredData = rows.filter(row => {
            const rowData = row.split(",");
            const location = rowData[11].toLowerCase(); // Assuming location is in the 11th column
            return location.includes(filterLocationText);
          });

          // Recreate the table with filtered data
          const filteredTable = document.createElement("table");
          const filteredTotal = filteredData.length - 1; // Subtract header row
          // ... (similar logic for creating headers and rows)

          // Display the total of filtered data on the webpage
          document.getElementById("total").innerHTML = filteredTotal;

          // Display the filtered table on the webpage
          csvTableElement.innerHTML = ""; // Clear previous content
          csvTableElement.appendChild(filteredTable);
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  // Call the function to display CSV data
  displayCSVData();
});