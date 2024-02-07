document.addEventListener("DOMContentLoaded", function () {
  event.stopPropagation();
  let CsvList = [];
  let isLoggedIn = false;
  let id = "";
  let deleteid = "";
  const searchInput = document.querySelector(".search");
  const body = document.querySelector("#body");
  const clearbtn = document.querySelector(".btn");
  Checklogin();

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
      localStorage.removeItem(carpark.carparkNumber);
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
        const addfav = document.createElement("span");
        const addfavbtn = document.createElement("button");
        addfav.className = "material-symbols-outlined";
        addfav.textContent = "star";
        addfavbtn.classList.add("addfavbtn");

        addfavbtn.appendChild(addfav);
        addressCell.appendChild(addfavbtn);
        Addbutton.appendChild(button);

        // Append cells to the row
        row.appendChild(Num);
        row.appendChild(addressCell);

        row.appendChild(Addbutton);

        // Append the row to the body
        body.appendChild(row);

        addfavbtn.style.display = "none";
        if (isLoggedIn) {
          addfavbtn.style.display = "block";
        } else {
          addfavbtn.style.display = "none";
        }
        addfavbtn.onclick = function () {
          if (addfavbtn.style.color == "gray") {
            addfavbtn.style.color = "yellow";
            const APIKEY = "65c2552f71a48870cb8b07de";
            const jsondata = {
              id: id,
              carparknumber: carpark.carparkNumber,
              address: carpark.address,
              typeofparkingsystem: carpark.typeOfParkingSystem,
              shorttermparking: carpark.shortTermParking,
              freeparking: carpark.freeParking,
              nightparking: carpark.nightParking,
              gantryheight: carpark.gantryHeight,
            };
            let settings = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
              },
              body: JSON.stringify(jsondata),
            };
            fetch("https://fed123-ecda.restdb.io/rest/fedcar", settings)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                getid();
              });
          } else {
            addfavbtn.style.color = "gray";
            getid();
            const APIKEY = "65c2552f71a48870cb8b07de";
            let settings = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache",
              },
            };
            fetch(
              `https://fed123-ecda.restdb.io/rest/fedcar/${deleteid}`,
              settings
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
              });
          }
        };

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

  function Checklogin() {
    const APIKEY = "65c2552f71a48870cb8b07de";
    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache",
      },
    };
    fetch("https://fed123-ecda.restdb.io/rest/fedinfo", settings)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        let flag = false;
        for (let i = 0; i < data.length; i++) {
          let check = localStorage.getItem(data[i].id);
          //console.log(check);
          if (check) {
            isLoggedIn = true;
            id = data[i].id;
            document.querySelector(".show").style.display = "block";
          }
        }
        if (flag === true) {
          document.querySelector(".show").style.display = "none";
        }
      });
  }
  function getid() {
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
        //console.log(data);
        deleteid = data[data.length - 1]._id;
      });
  }
});
