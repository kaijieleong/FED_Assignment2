const APIKEY = "65c2477d514d39bbd55fdb3d";
document.addEventListener("DOMContentLoaded", function () {
  HideMsgalert();

  // [STEP 1]: Create our submit form listener
  document.querySelector(".btn-Create").addEventListener("click", function (e) {
    // Prevent default action of the button
    e.preventDefault();

    // [STEP 2]: Call your function to fetch and process data
    getdata();
    Createdata();
    getdata();
  });
  let datas = [];
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
          showMsgalert();
          setTimeout(HideMsgalert, 8000);
        }
      }
    }

    let jsondata = {
      name: names,
      number: phonenumber,

      password: passwords,
    };
    let settings1 = {
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
        document.getElementById("add-form").reset();
      },
    };
    fetch("https://fed23-25a3.restdb.io/rest/account", settings1)
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
  const Password1 = document.querySelector("#Password1");
  const Password2 = document.querySelector("#Password2");
  const Checkbox = document.getElementById("Check");
  Checkbox.onclick = function () {
    if (Password1.type == "password") {
      // Show password
      Password1.type = "text";
      Password2.type = "text";
    } else {
      // Hide password
      Password1.type = "password";
      Password2.type = "password";
    }
  };

  function showMsgalert() {
    const alertMsg = document.querySelector("#msg-alert");
    alertMsg.style.display = "block";
  }
  function HideMsgalert() {
    const alertMsg = document.querySelector("#msg-alert");
    alertMsg.style.display = "none";
  }
});
