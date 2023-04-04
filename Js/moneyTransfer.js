$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    localStorage.removeItem("transactionsData");
    localStorage.removeItem("adminTransactionsData");
    window.location = "index.html";
  });

  var allBalance = JSON.parse(localStorage.getItem("allBalance"));

  var allUsers = JSON.parse(localStorage.getItem("allUsers"));

  var balanceData = JSON.parse(localStorage.getItem("balance"));

  var db = JSON.parse(localStorage.getItem("user"));
  console.log("allbalance", allBalance);
  console.log(allBalance);
  console.log(allUsers);
  console.log(balanceData);
  console.log(db.accountNumber);

  var userAccountNumber = balanceData.accountNumber;

  var date = new Date();
  console.log(date);

  var day = ("0" + date.getDate()).slice(-2);
  var year = date.getFullYear();
  // var month = date.getMonth() + 1;
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();
  var currentDate = `${month}/${day}/${year}`;
  console.log(currentDate);

  var hours = date.getHours();
  var mins = date.getMinutes();
  var sec = date.getSeconds();

  var currentTime = `${hours}:${mins}:${sec}`;
  console.log(currentTime);

  console.log(balanceData);

  var limitAmount = 0;
  var totalLimitAmount;
  $("#amount").on("keyup", function () {
    amount1 = $("#amount").val();

    console.log(amount1);

    totalLimitAmount = Number(limitAmount) + Number(amount1);
    console.log(totalLimitAmount);
  });

  $.ajax({
    url: "http://localhost:3000/transactions",
    method: "GET",
    success: function (data) {
      console.log(data);

      var res = data.filter(
        (e) =>
          e.currentDate >= currentDate &&
          db.accountNumber === e.userAccountNumber
      );
      console.log(res);
      $.each(res, function (i, e) {
        console.log(e.amount);
        var t = JSON.parse(e.amount);
        limitAmount += t;
        console.log(limitAmount);
      });
    },
  });

  $("#transfer-btn").click(function (e) {
    var name = $("#name").val();
    var receiverAccountNumber = $("#acct-num").val();
    var reEnterAccountnumber = $("#re-acct-num").val();
    var amount = $("#amount").val();

    console.log(name);
    console.log(receiverAccountNumber);
    console.log(reEnterAccountnumber);
    console.log(amount);

    if (!name || !receiverAccountNumber || !reEnterAccountnumber || !amount) {
      // alert("Fill all the details");
      Toastify({
        text: "Fill all the details",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#df5853",
          color: "white",
          padding: "16px 30px",
          fontSize: "17px",
          borderRadius: "3px",
        },
      }).showToast();
    } else if (receiverAccountNumber === reEnterAccountnumber) {
      $.get("http://localhost:3000/balance", function (data) {
        var fullBalance1 = JSON.stringify(data);
        //   console.log(allBalance);

        var fullBalance = JSON.parse(fullBalance1);

        var findUser = fullBalance.find(
          (e) => e.accountNumber === receiverAccountNumber && e.name == name
        );
        console.log(findUser);
        console.log(totalLimitAmount);
        if (findUser) {
          if (totalLimitAmount <= 30000) {
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
                  e.preventDefault();
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
                      type: "PATCH",
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
                    var finduser = allBalance.find(
                      (e) => e.accountNumber === receiverAccountNumber
                    );
                    console.log(findUser.id);

                    $.ajax({
                      type: "PATCH",
                      url: `http://localhost:3000/balance/${findUser.id}`,
                      data: {
                        accountNumber: receiverAccountNumber,
                        balance: updateBalance.toString(),
                      },
                      success: function (response) {
                        console.log("User updated successfully");
                      },
                      error: function (xhr, status, error) {
                        console.error("Error updating user: " + error);
                      },
                    });
                  }
                  alert("Transferred sucessfully");
                  //   Toastify({
                  //     text: "Transferred sucessfully",
                  //     duration: 3000,
                  //     newWindow: true,
                  //     close: true,
                  //     gravity: "top",
                  //     position: "right",
                  //     stopOnFocus: true,
                  //     style: {
                  //          background: "#29aa40",
                  //          color:"white",
                  //          padding:"16px 30px",
                  //          fontSize:"17px",
                  //          borderRadius:"3px"
                  //     },
                  // }).showToast()
                } else {
                  Toastify({
                    text: "Amount should be lesser than 10000",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background: "#df5853",
                      color: "white",
                      padding: "16px 30px",
                      fontSize: "17px",
                      borderRadius: "3px",
                    },
                  }).showToast();
                }
              } else {
                // alert("your balance is low");
                Toastify({
                  text: "your balance is low",
                  duration: 3000,
                  newWindow: true,
                  close: true,
                  gravity: "top",
                  position: "right",
                  stopOnFocus: true,
                  style: {
                    background: "#df5853",
                    color: "white",
                    padding: "16px 30px",
                    fontSize: "17px",
                    borderRadius: "3px",
                  },
                }).showToast();
              }
            } else {
              // alert("Amount should be greater than 0 ");
              Toastify({
                text: "Amount should be greater than 0 ",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "#df5853",
                  color: "white",
                  padding: "16px 30px",
                  fontSize: "17px",
                  borderRadius: "3px",
                },
              }).showToast();
            }
          } else {
            // alert("limit over")
            Toastify({
              text: "You reached daily limit of 30000",
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: "top",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "#df5853",
                color: "white",
                padding: "16px 30px",
                fontSize: "17px",
                borderRadius: "3px",
              },
            }).showToast();
          }
        } else {
          // alert("Account number not valid");
          Toastify({
            text: "Account name and Account number not valid",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "#df5853",
              color: "white",
              padding: "16px 30px",
              fontSize: "17px",
              borderRadius: "3px",
            },
          }).showToast();
        }
      });
    } else {
      // alert("Invalid credentials");
      Toastify({
        text: "Invalid credentials",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#df5853",
          color: "white",
          padding: "16px 30px",
          fontSize: "17px",
          borderRadius: "3px",
        },
      }).showToast();
    }
  });

});
