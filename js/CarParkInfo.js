document.addEventListener("DOMContentLoaded", function () {
  let CarparkLot = [];
  GetLot();

  console.log(CarparkLot);
  function GetLot() {
    fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
      .then((response) => response.json())
      .then((data) => {
        let datas = data.items;

        for (let i = 0; i < datas.length; i++) {
          let carparkData = datas[i].carpark_data;
          //console.log(carpark);
          for (let j = 0; j < carparkData.length; j++) {
            let carparkInfo = carparkData[j].carpark_info;
            // console.log(carparkInfo);
            if (Array.isArray(carparkInfo) && carparkInfo.length > 0) {
              //let carparkInfo = car[0];

              // Create an object representing the carpark and push it to the list
              let carparkObject = {
                carparkNumber: carparkData[j].carpark_number,
                lotsAvailable: carparkInfo.lots_available,
                totalLots: carparkInfo.total_lots,
                lotType: carparkInfo.lot_type,
              };

              CarparkLot.push(carparkObject);
            }
          }
        }
        let flag = false;
        const addName = document.getElementById("address-name");
        for (let i = 0; i < CarparkLot.length; i++) {
          const carparks = CarparkLot[i];
          const carparkNumber = carparks.carparkNumber;
          const Data = localStorage.getItem(carparkNumber);
          const newdata = JSON.parse(Data);

          if (newdata) {
            flag = true;
            addName.textContent = newdata.address;

            console.log(newdata.carparkNumber);
            for (let k = 0; k < CarparkLot.length; k++) {
              if (newdata.carparkNumber === CarparkLot[k].carparkNumber) {
                const LA = parseFloat(CarparkLot[k].lotsAvailable);
                const TL = parseFloat(CarparkLot[k].totalLots);
                let percentage = (LA / TL) * 100;
                console.log(percentage);
              }
            }
          }
        }
      });
  }
});
