$(document).ready(function(){
    var getusersData=localStorage.getItem("editProfile")
   var usersData=JSON.parse(getusersData)

$("#admin-name").val(usersData.name)
$("#admin-email").val(usersData.email)
$("#admin-mobile").val(usersData.mobile)
$("#admin-fathers-name").val(usersData.fName)
$("#admin-pan").val(usersData.pan)
$("#admin-aadhar").val(usersData.aadhar)
$("#admin-address").val(usersData.address)

$("#submit-btn").click(function(){
 var updatedName=$("#admin-name").val()
var updatedEmail=$("#admin-email").val()
var updatedMobile=$("#admin-mobile").val()
var updatedFatherName=$("#admin-fathers-name").val()
var updatedPan=$("#admin-pan").val()
var updatedAadhar=$("#admin-aadhar").val()
var updatedAddress=$("#admin-address").val()

$.ajax({
    type: "PUT",
    url: `http://localhost:3000/users/${usersData.id}`,
    data: {
      name:updatedName,
      email:updatedEmail,
      mobile:updatedMobile,
      accountNumber:usersData.accountNumber,
      address:updatedAddress,
      fName:updatedFatherName,
      mName:usersData.mName,
      pan:updatedPan,
      aadhar:updatedAadhar,
      password:usersData.password,
      confirmPassword:usersData.confirmPassword,
    },
   
    success: function (response) {
      console.log("User updated successfully");
    },
    error: function (xhr, status, error) {
      console.error("Error updating user: " + error);
    },
  });
  window.location = "adminProfile.html";
})


})