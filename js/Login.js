const APIKEY = "65996a870b08685ca8232bf2";
document.addEventListener("DOMContentLoaded", function () {
  // [STEP 1]: Create our submit form listener
  document
    .querySelector(".btn-primary")
    .addEventListener("click", function (e) {
      // Prevent default action of the button
      e.preventDefault();

      // [STEP 2]: Call your function to fetch and process data
      getdata();
    });

  function getdata() {
    let settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache",
      },
    };
    fetch("https://fed23-25a3.restdb.io/rest/account", settings)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let names = document.getElementById("name").value;
        let passwords = document.getElementById("Password").value;

        for (let i = 0; i < data.length; i++) {
          if (data[i].name === names && data[i].password === passwords) {
            location.href = "Home.html";
            return; // exit the loop if the user is found
          }
        }

        // If the loop completes without redirecting, the credentials are incorrect
        console.error("Invalid credentials");
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
});

//function togglePasswordVisibility() {
//const passwordInputs = document.querySelectorAll('input[type="password"]');
// const showPasswordCheckbox = document.getElementById("Check");

// if (showPasswordCheckbox.checked) {
// for(i=0;){

//  }
//   passwordInputs[i].type = "password";
// } else {
//   passwordInputs[i].type = "text";
// }

//}

// Attach the togglePasswordVisibility function to the checkbox change event
//const showPasswordCheckbox = document.getElementById("Check");
//showPasswordCheckbox.addEventListener("click", togglePasswordVisibility);
