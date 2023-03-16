
// var data;



$(document).ready(function(){
  var db = JSON.parse(localStorage.getItem("user"));

  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });



$.ajax({
  url: "http://localhost:3000/users",
  type: "GET",
  success: function (data) {
  console.log(data)
  var findUser = data.find((e) => db.email == e.email && db.password == e.password);
  console.log(findUser);
   getData(findUser)
  }
})

function getData(userData){
  console.log(userData);
  console.log(userData.pan);


$("#name").val(userData.name)
$("#email").val(userData.email)
$("#mobile").val(userData.mobile)
$("#fathers-name").val(userData.fName)
$("#pan").val(userData.pan)
$("#aadhar").val(userData.aadhar)
$("#address").val(userData.address)

// console.log(db.accountNumber);
// console.log(db.password);
// console.log(db.confirmPassword);
// console.log(db.mName);
}
$("#submit-btn").click(function(){

var updatedName=$("#name").val()
var updatedEmail=$("#email").val()
var updatedMobile=$("#mobile").val()
var updatedFatherName=$("#fathers-name").val()
var updatedPan=$("#pan").val()
var updatedAadhar=$("#aadhar").val()
var updatedAddress=$("#address").val()


console.log(updatedName);

  $.ajax({
    type: "PUT",
    url: `http://localhost:3000/users/${db.id}`,
    data: {
      name:updatedName,
      email:updatedEmail,
      mobile:updatedMobile,
      accountNumber:db.accountNumber,
      address:updatedAddress,
      fName:updatedFatherName,
      mName:db.mName,
      pan:updatedPan,
      aadhar:updatedAadhar,
      password:db.password,
      confirmPassword:db.confirmPassword,
    },
   
    success: function (response) {
      console.log("User updated successfully");
    },
    error: function (xhr, status, error) {
      console.error("Error updating user: " + error);
    },
  });
  window.location = "profile.html";
})

})




