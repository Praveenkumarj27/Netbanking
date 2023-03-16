$(document).ready(function () {
  $("#login-btn").click(function () {
    var email = $("#login-email").val();
    var password = $("#login-password").val();

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
          (e) => email === e.email && password === e.password
        );
        if (findUser) {
          getData(findUser);
         
        } else {
          alert("Invalid Credential");
        }
      },
      dataType:"json"
    });

    function getData(v){
      console.log(v);
     localStorage.setItem("user",JSON.stringify(v))
      window.location="profile.html"
      let z=JSON.parse(localStorage.getItem("email"))
      console.log(z);
    }


 
  });
});
