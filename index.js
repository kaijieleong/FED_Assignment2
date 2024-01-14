var settings = {
  async: true,
  crossDomain: true,

  method: "GET",
  headers: {
    "content-type": "application/json",
    "x-apikey": "65996a870b08685ca8232bf2",
    "cache-control": "no-cache",
  },
};

function performLogin() {
  let name = document.getElementById("exampleInputEmail1").value;
  let password = document.getElementById("exampleInputPassword1").value;

  fetch("https://fed23-25a3.restdb.io/rest/accc", settings)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let loggedIn = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === name && data[i].password === password) {
          // Successful login
          console.log("Login successful");
          loggedIn = true;
          break; // Exit the loop once a match is found
        }
      }

      if (loggedIn) {
        // Redirect to the next page
        window.location.href = "index1.html"; // Replace with the actual page URL
      } else {
        console.log("Login failed");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

document
  .querySelector(".btn.btn-primary")
  .addEventListener("click", performLogin);

const fs = require("fs");

// Read the carpark information file
const carparkInfo = fs.readFileSync("HDBCarparkInformation.csv", "utf8");
const lines = carparkInfo.trim().split("\n");

// Split the header
const info = lines[0].split(",");

// Create empty list
const carparkList = [];

// Iterate through the other lines of car park info
for (let i = 1; i < lines.length; i++) {
  // Create dictionary
  const carpark = {};
  const data = lines[i].split(",", 3);

  // Populate the dictionary using a for-loop
  for (let j = 0; j < info.length; j++) {
    carpark[info[j]] = data[j];
  }

  // Append the dictionary to the carparkList
  carparkList.push(carpark);
}

// Convert the carparkList to JSON
const carparkJson = JSON.stringify(carparkList, null, 2);

// Write the JSON to a file
fs.writeFileSync("carpark-information.json", carparkJson);

// Now, carpark-information.json contains the carpark information in JSON format
