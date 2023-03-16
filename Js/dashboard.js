$(document).ready(function () {
  // var balanceData = JSON.parse(localStorage.getItem("balance"));
  var db = JSON.parse(localStorage.getItem("user"));


  var balanceData=localStorage.getItem("balance")
console.log(balanceData);
    var z = JSON.parse(balanceData);
 var cuurentBalance= z.balance;

  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });

  
  // $.get("http://localhost:3000/balance", function (data) {
  //   balanceData = data.find((e) => db.id === e.id);
  //   console.log(balanceData);

    // console.log(balanceData);

    $("#current-balance").text("XXXXX").css({ marginLeft: "25px" });
    if (
      $("#show-balance").click(function () {
        $("#current-balance").text(cuurentBalance);
        $("#current-balance").show(1000).css({ marginLeft: "20px" });
        $("#show-balance").hide();
      })
    ) {
    } else {
      $("#current-balance").hide(1000);
    }
  // });

  // $.get("http://localhost:3000/transactions", function (data) {
  //   console.log(data);
  //   var transactionsData = data.reverse();
  //   console.log(transactionsData);
  //   // var findDebitedAmount = transactionsData.find(
  //   //   (e) => e.status === "Debited"
  //   // ); // e.status==="Debited"

  //   // var debitedAmount = JSON.parse(findDebitedAmount.amount);
  //   // console.log(debitedAmount);
  //   // $("#debit").text(debitedAmount);
  // });

  $.get("http://localhost:3000/transactions", function (data) {
    console.log(data);

    var db = JSON.parse(localStorage.getItem("user"));
    var creditedData = [];
    var debitedData = [];
    $.each(data, function (i, s) {
      console.log(s.name, s.receiverAccountNumber, s.currentDate, s.amount);

      if (db.accountNumber === s.receiverAccountNumber) {
        creditedData.push(s);
      } else if (db.accountNumber === s.userAccountNumber) {
        debitedData.push(s);
      }
    });
    console.log(creditedData[creditedData.length - 1].amount);
    $("#credit").text(creditedData[creditedData.length - 1].amount);

    console.log(debitedData[debitedData.length - 1].amount);

    $("#debit").text(debitedData[debitedData.length - 1].amount);
  });
});
