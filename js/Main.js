document.addEventListener("DOMContentLoaded", function () {
  setTimeout(Loadingpage, 3000);
  Login();
  let isLoggedIn = false;
  Checklogin();
});

function Loadingpage() {
  // Hide the loading page
  document.getElementById("loading-page").style.display = "none";
}

function Login() {
  const login = document.querySelector("#login");
  login.addEventListener("click", function () {
    window.location.href = "../Html/Login.html";
  });
}

function Checklogin() {
  const APIKEY = "65c2477d514d39bbd55fdb3d";
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
