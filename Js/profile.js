$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
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

    // $("#current-balance").text("XXXXX").css({ marginLeft: "50px" });
    // if (
    //   $("#show-balance").click(function () {
    //     $("#current-balance").text(usersBalance);
    //     $("#current-balance").show(1000).css({ marginLeft: "50px" });
    //     $("#show-balance").hide();
    //   })
    // ) {
    // } else {
    //   $("#current-balance").hide(1000);
    // }
    
    // $("#current-balance").show().css({ marginLeft: "50px" });
   
    var balanceData=localStorage.getItem("balance")
    console.log(balanceData);
     var z = JSON.parse(balanceData);
     var cuurentBalance= z.balance;


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
     
        $("#current-balance").text(cuurentBalance);
        $("#enter-otp").hide();
        $("#submit").hide();

        
      } else {
        alert("otp incorrect");
      }
    });
  });


}
});
