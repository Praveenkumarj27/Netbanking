$(document).ready(function () {


    $("#show-password").click(function(){
      $("#login-password").attr("type","text"); 
    })

  $("#login-btn").click(function () {
    
    var email = $("#login-email").val();
    var password = $("#login-password").val();



    var hashedPassword = CryptoJS.SHA256(password).toString();

    $.get("http://localhost:3000/users", function (data) {
      allUsers = JSON.stringify(data);
      //   console.log(allUsers);
      localStorage.setItem("allUsers", allUsers);
    });

    $.get("http://localhost:3000/balance", function (data) {
      allBalance = JSON.stringify(data);
      //   console.log(allBalance);

      localStorage.setItem("allBalance", allBalance);
    });

    $.ajax({
      url: "http://localhost:3000/users",
      type: "GET",
      success: function (data) {
        const findUser = data.find(
          (e) => email === e.email && hashedPassword === e.password
        );
        if (findUser) {
          getData(findUser);
        } else {
          // alert("Invalid Credential");
          Toastify({
            text: "Invalid Credential",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", 
            position: "right", 
            stopOnFocus: true, 
            style: {
                // background: "linear-gradient(to right, #00b09b, #96c93d)",
                 background: "#df5853" ,
                 color:"white",
                 padding:"16px 30px",
                 fontSize:"17px",
                 borderRadius:"3px"
            },
        }).showToast()
        }
      },
      dataType: "json",
    });

    function getData(v) {
      console.log(v);
      localStorage.setItem("user", JSON.stringify(v));
      var z = localStorage.getItem("user");
      var verify = JSON.parse(z);
      if (verify.name == "Admin") {
        window.location = "adminProfile.html";
      } else {
        window.location = "profile.html";
      }
    }
  });
});
