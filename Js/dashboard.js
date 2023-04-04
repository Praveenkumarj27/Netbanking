$(document).ready(function () {
  // var balanceData = JSON.parse(localStorage.getItem("balance"));
  // var db = JSON.parse(localStorage.getItem("user"));

  var balanceData = localStorage.getItem("balance");
  console.log(balanceData);
  var z = JSON.parse(balanceData);
  var cuurentBalance = z.balance;

  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    localStorage.removeItem("transactionsData")
    localStorage.removeItem("adminTransactionsData")
    window.location = "index.html";
  });

  $("#enter-otp").hide();
  $("#submit").hide();

  $("#last-credit").hide();
  $("#last-debit").hide();

  if (
    $("#show-balance").click(function () {
      $("#show-balance").hide();
      $("#enter-otp").show();
      $("#submit").show();
      $("show-balance").hide();

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
          $("#current-balance").text(`₹ ${cuurentBalance}`);
          $("#enter-otp").hide();
          $("#submit").hide();

          $("#last-credit").show();
          $("#last-debit").show();
        } else {
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
    })
  ) {
  } else {
    $("#current-balance").hide(1000);
  }

  $.get("http://localhost:3000/transactions", function (data) {
    console.log(data);

    var db = JSON.parse(localStorage.getItem("user"));
    console.log(db.accountNumber);
    var creditedData = [];
    var debitedData = [];
    
    $.each(data, function (i, s) {
      console.log(s.name, s.receiverAccountNumber, s.currentDate, s.amount);
      console.log(s.receiverAccountNumber);
      if (db.accountNumber === s.receiverAccountNumber) {
        creditedData.push(s);
      } else if (db.accountNumber === s.userAccountNumber) {
        debitedData.push(s);
      }
    });

    if (creditedData.length > 0) {
      $("#credit").text(`₹ ${creditedData[creditedData.length - 1].amount}`);
    } else {
      $("#credit").text("N/A");
    }

    if (debitedData.length > 0) {
      $("#debit").text(`₹ ${debitedData[debitedData.length - 1].amount}`);
    } else {
      $("#debit").text("N/A");
    }
  });
});
