const APIKEY = "65996a870b08685ca8232bf2";
document.addEventListener("DOMContentLoaded", function () {
  // [STEP 1]: Create our submit form listener
  document.querySelector(".btn-Create").addEventListener("click", function (e) {
    // Prevent default action of the button
    e.preventDefault();

    // [STEP 2]: Call your function to fetch and process data
    getdata();
    Createdata();
    getdata();
  });
  let datas;
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
        datas = data;
        console.log(datas);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
  function Createdata() {
    let names = document.getElementById("name").value;
    let phonenumber = document.getElementById("number").value;
    let passwords = "";
    for (i = 0; i < datas.length; i++) {
      if (datas[i] === phonenumber) {
      } else {
        if (
          document.getElementById("Password1").value ===
          document.getElementById("Password2").value
        ) {
          passwords = document.getElementById("Password2").value;
        } else {
        }
      }
    }

    let jsondata = {
      name: names,
      number: phonenumber,
      password: passwords,
    };
    let settings = {
      method: "POST", //[cher] we will use post to send info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.querySelector(".btn-Create").disabled = true;
        // Clear our form using the form ID and triggering its reset feature
        document.getElementById("add-contact-form").reset();
      },
    };
    fetch("https://fed23-25a3.restdb.io/rest/account", settings)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
        document.querySelector(".btn-Create").disabled = false;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
});

function togglePasswordVisibility() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  const showPasswordCheckbox = document.getElementById("Check");

  for (let i = 0; i < passwordInputs.length; i++) {
    if (showPasswordCheckbox.checked) {
      passwordInputs[i].type = "password";
    } else {
      passwordInputs[i].type = "text";
    }
  }
}

// Attach the togglePasswordVisibility function to the checkbox change event
const showPasswordCheckbox = document.getElementById("Check");
showPasswordCheckbox.addEventListener("click", togglePasswordVisibility);
