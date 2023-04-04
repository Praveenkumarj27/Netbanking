$(document).ready(function () {
  var getusersData = localStorage.getItem("editProfile");
  var usersData = JSON.parse(getusersData);

  $.ajax({
    url: `http://localhost:3000/users/${usersData.id}`,
    method: "GET",
    success: function (userData) {
      console.log(userData);
      localStorage.setItem("transactionsData", JSON.stringify(userData));

      $("#name").text(userData.name);
      $("#fathers-name").text(userData.fName);
      $("#account-number").text(userData.accountNumber);
      $("#aadhar-number").text(userData.aadhar);
      $("#pan-number").text(userData.pan);
      $("#email").text(userData.email);
      $("#mobile").text(userData.mobile);
      $("#aadhar-img").attr("href", userData.aadharImage);
      $("#pan-img").attr("href", userData.panImage);
    },
  });
});
