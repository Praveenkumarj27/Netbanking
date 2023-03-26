$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });

  $.get("http://localhost:3000/balance", function (data) {
    allBalance = JSON.stringify(data);
    //   console.log(allBalance);

    localStorage.setItem("allBalance", allBalance);
  });

  var db = JSON.parse(localStorage.getItem("user"));
  console.log(db.name);

  $.ajax({
    url: "http://localhost:3000/users",
    type: "GET",
    success: function (data) {
      console.log(data);
      var findUser = data.find(
        (e) => db.email == e.email && db.password == e.password
      );
      console.log(findUser);
      getUserData(findUser);
    },
  });

  function getUserData(userData) {
    console.log(userData);

    $("#name").text(userData.name);
    $("#fathers-name").text(userData.fName);
    $("#account-number").text(userData.accountNumber);
    $("#aadhar-number").text(userData.aadhar);
    $("#pan-number").text(userData.pan);
    $("#email").text(userData.email);
    $("#mobile").text(userData.mobile);
  }

  $("#enter-otp").hide();
  $("#submit").hide();

  $.get("http://localhost:3000/balance", function (data) {
    var findBalance = data.find((e) => db.id === e.id);
    if (findBalance) {
      getBalanceData(findBalance);
    } else {
      alert("error");
    }
  });

  function getBalanceData(balanceData) {
    console.log(balanceData);
    var usersBalance = balanceData.balance;
    window.localStorage.setItem("balance", JSON.stringify(balanceData));
    console.log(usersBalance);
    $("#balance").text(usersBalance);

    var balanceData = localStorage.getItem("balance");
    console.log(balanceData);
    var z = JSON.parse(balanceData);
    var cuurentBalance = z.balance;

    $("#view-balance").click(function () {
      $("#view-balance").hide();
      $("#enter-otp").show();
      $("#submit").show();
      $("view-balance").hide();

      function generateOTP() {
        var digits = "0123456789";

        var otpLength = 4;
        var otp = "";
        for (let i = 1; i <= otpLength; i++) {
          var index = Math.floor(Math.random() * digits.length);

          otp = otp + digits[index];
        }
        //   console.log(otp);
        localStorage.setItem("otp", otp);
        alert(`your otp is ${otp}`);
      }
      generateOTP();
      var res = localStorage.getItem("otp");
      console.log(res);

      $("#submit").click(function () {
        var enterdOtp = $("#enter-otp").val();
        console.log(enterdOtp);
        if (res == enterdOtp) {
          // console.log("from localstorage",res);
          // console.log("User enterd",enterdOtp);
          // alert("Otp verified")

          $("#current-balance").text(`₹ ${cuurentBalance}`);
          $("#enter-otp").hide();
          $("#submit").hide();
        } else {
          // alert("otp incorrect");
          Toastify({
            text: "Otp incorrect",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                 background: "#df5853" ,
                 color:"white",
                 padding:"16px 30px",
                 fontSize:"17px",
                 borderRadius:"3px"
            },
        }).showToast()
        }
      });
    });
  }
});
