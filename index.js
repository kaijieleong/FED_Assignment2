const APIKEY = "65996a870b08685ca8232bf2";

function getdata() {
  let name = document.getElementById("exampleInputEmail1").value;
  let password = document.getElementById("exampleInputPassword1").value;

  let settings = {
    method: "GET", //[cher] we will use GET to retrieve info
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache",
    },
  };
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
document.querySelector(".btn.btn-primary").addEventListener("click", getdata());
