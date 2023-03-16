$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });

  var allBalance = JSON.parse(localStorage.getItem("allBalance"));

  var allUsers = JSON.parse(localStorage.getItem("allUsers"));

  var balanceData = JSON.parse(localStorage.getItem("balance"));

  var db = JSON.parse(localStorage.getItem("user"));

  console.log(allBalance);
  console.log(allUsers);
  console.log(balanceData);
  console.log(db);

  var userAccountNumber = balanceData.accountNumber;

  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var currentDate = `${day}-${month}-${year}`;
  console.log(currentDate);

  var hours = date.getHours();
  var mins = date.getMinutes();
  var sec = date.getSeconds();

  var currentTime = `${hours}:${mins}:${sec}`;
  console.log(currentTime);

  console.log(balanceData);

  $("#transfer-btn").click(function () {
    var name = $("#name").val();
    var receiverAccountNumber = $("#acct-num").val();
    var reEnterAccountnumber = $("#re-acct-num").val();
    var amount = $("#amount").val();

    console.log(name);
    console.log(receiverAccountNumber);
    console.log(reEnterAccountnumber);
    console.log(amount);

    if (!name || !receiverAccountNumber || !reEnterAccountnumber || !amount) {
      alert("Fill all the details");
    } else if (receiverAccountNumber === reEnterAccountnumber) {
      var findUser = allBalance.find(
        (e) => e.accountNumber === receiverAccountNumber
      );
      console.log(findUser);

      if (findUser) {
        if (amount > 0) {
          if (parseInt(balanceData.balance) > parseInt(amount)) {
            if (amount < 10000 && amount > 0) {
              var currentBalance = JSON.parse(findUser.balance);
              console.log("previous balance", findUser.balance);
              var updateBalance = currentBalance + parseInt(amount);
              console.log("update balance", updateBalance);
              console.log("your previous balance is", balanceData.balance);
              var selfUserAmount = balanceData.balance - amount;
              console.log("your current balance is", selfUserAmount);
              $.post("http://localhost:3000/transactions", {
                name,
                receiverAccountNumber,
                currentDate,
                currentTime,
                amount,
                userAccountNumber,
                senderName: db.name,
              });
              if (db.accountNumber === userAccountNumber) {
                $.ajax({
                  type: "PUT",
                  url: `http://localhost:3000/balance/${db.id}`,
                  data: {
                    accountNumber: db.accountNumber,
                    balance: selfUserAmount.toString(),
                  },
                  success: function (response) {
                    balanceData.balance = selfUserAmount.toString();
                    localStorage.setItem(
                      "balance",
                      JSON.stringify(balanceData)
                    );

                    console.log("User updated successfully");
                  },
                  error: function (xhr, status, error) {
                    console.error("Error updating user: " + error);
                  },
                });
              }
              var finduser = allBalance.find(
                (e) => e.accountNumber === receiverAccountNumber
              );
              console.log(findUser.id);

              $.ajax({
                type: "PUT",
                url: `http://localhost:3000/balance/${findUser.id}`,
                data: {
                  accountNumber: receiverAccountNumber,
                  balance: updateBalance.toString(),
                },
                success: function (response) {
                  $.get("http://localhost:3000/balance", function (data) {
                    allBalance = JSON.stringify(data);
                    //   console.log(allBalance);

                    localStorage.setItem("allBalance", allBalance);
                  });
                  console.log("User updated successfully");
                },
                error: function (xhr, status, error) {
                  console.error("Error updating user: " + error);
                },
              });

              // db.balance=selfUserAmount.toString()
              // localStorage.setItem("balance",JSON.stringify(balanceData))

              alert("Transferred sucessfully");
            } else {
              alert("Amount should be lesser than 10000 ");
            }
          } else {
            alert("your balance is low");
          }
        } else {
          alert("Amount should be greater than 0 ");
        }
      } else {
        alert("Account number not valid");
      }
    } else {
      alert("Invalid credentials");
    }
  });
});
