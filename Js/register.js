$(document).ready(function () {
  $("#register-btn").click(function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var address = $("#address").val();
    var accountNumber = $("#account-number").val();
    var fName = $("#fathers-name").val();
    var mName = $("#mothers-name").val();
    var pan = $("#pan").val();
    var aadhar = $("#aadhar").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirm-password").val();

    if (
      !name ||
      !email ||
      !mobile ||
      !address ||
      !accountNumber ||
      !fName ||
      !mName ||
      !pan ||
      !aadhar ||
      !password ||
      !confirmPassword
    ) {
      return alert("Please fill all the details");
    }

    if (password === confirmPassword) {
      $.post(
        "http://localhost:3000/users",
        {
          name,
          email,
          mobile,
          accountNumber,
          address,
          fName,
          mName,
          pan,
          aadhar,
          password,
          confirmPassword,
        },
        // function (data) {
        //   var dat = JSON.stringify(data);
        //   alert("Registerd sucessfully");
        // }
        window.location = "login.html"
      );

      $.post("http://localhost:3000/balance", {
        accountNumber: accountNumber,
        balance: "1000",
      });
    } else {
      alert("Password didn't match");
    }
  });
});
