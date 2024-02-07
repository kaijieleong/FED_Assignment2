const APIKEY = "65c2552f71a48870cb8b07de";
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

    fetch("https://fed123-ecda.restdb.io/rest/fedinfo", settings)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let name = document.getElementById("name").value;
        let password = document.getElementById("Password").value;

        for (let i = 0; i < data.length; i++) {
          if (data[i].name === name && data[i].password === password) {
            window.location.href = "../Html/Home.html";
            localStorage.clear();
            localStorage.setItem(data[i].id, data[i].id);
            return; // exit the loop if the user is found
          }
        }
      });
  }
  const checkbox = document.querySelector("#Check");
  const show = document.getElementById("Password");
  checkbox.onclick = function () {
    if (show.type == "password") {
      // Show password
      show.type = "text";
    } else {
      // Hide password
      show.type = "password";
    }
  };
});
