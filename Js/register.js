
$(document).ready(function () {

  $('input[name="address"]').click(function() {
    if($(this).val() === 'permanent') {
      $('#present-address').val($('#permanent-address').val());
    }
  });

  $("#register-btn").click(function () {
    var name = $("#name").val();
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var permanentAddress = $("#permanent-address").val();
    var presentAddress=$("#present-address").val();
    var fName = $("#fathers-name").val();
    var mName = $("#mothers-name").val();
    var pan = $("#pan").val();
    var aadhar = $("#aadhar").val();
    var password1 = $("#password").val();
    var confirmPassword1 = $("#confirm-password").val();

    var hashedPassword = CryptoJS.SHA256(password1).toString();
    console.log(hashedPassword);
    var hashedConfirmPassword = CryptoJS.SHA256(confirmPassword1).toString();


    var email = $('#email').val();
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // matches a standard email address format
    if (!pattern.test(email)) {
     // alert('Please enter a valid email address.');
      Toastify({
        text: "Please enter a valid email address.",
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
      return false;
    }

      var mobile = $('#mobile').val();
      var pattern = /^[6-9]\d{9}$/; // matches a 10-digit mobile number starting with 6, 7, 8 or 9
      if (!pattern.test(mobile)) {
       // alert('Please enter a valid mobile number.');
       Toastify({
        text: "Please enter a valid mobile number.",
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
        return false;
      }
   
      var pan = $('#pan').val();
      var pattern = /[A-Z]{5}[0-9]{4}[A-Z]{1}/; // matches a standard PAN number format
      if (!pattern.test(pan)) {
       // alert('Please enter a valid PAN number.');
        Toastify({
          text: "Please enter a valid PAN number.",
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
        return false;
      }

      // var aadhaar = $('#aadhaar').val();
      // var pattern = /^\d{12}$/; // matches a 12-digit Aadhaar number format
      // if (!pattern.test(aadhaar)) {
      //  // alert('Please enter a valid Aadhaar number.');
      //   Toastify({
      //     text: "Please enter a valid Aadhaar number.",
      //     duration: 3000,
      //     newWindow: true,
      //     close: true,
      //     gravity: "top", 
      //     position: "right", 
      //     stopOnFocus: true, 
      //     style: {
      //          background: "#df5853" ,
      //          color:"white",
      //          padding:"16px 30px",
      //          fontSize:"17px",
      //          borderRadius:"3px"
      //     },
      // }).showToast()
      //   return false;
      // }

      

var accountNumber=""
    function generateAccountNumber() {
      var digits = "0123456789";
    
      var length = 5;
      var res = "";
      for (let i = 1; i <= length; i++) {
        var index = Math.floor(Math.random() * digits.length);
    
        res = res + digits[index];
         accountNumber=`600100${res}`
      }
      
    }
    
    generateAccountNumber();
   


    if (
      !name ||
      !email ||
      !mobile ||
      !permanentAddress ||
      !presentAddress ||
      !accountNumber ||
      !fName ||
      !mName ||
      !pan ||
      !aadhar ||
      !hashedPassword ||
      !hashedConfirmPassword
    ) {
      return Toastify({
        text: "Please fill all the details",
        duration: 4000,
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
    if (password1 === confirmPassword1) {
      $.post(
        "http://localhost:3000/users",
        {
          name,
          email,
          mobile,
          accountNumber,
          permanentAddress,
          presentAddress,
          fName,
          mName,
          pan,
          aadhar,
         password: hashedPassword,
         confirmPassword: hashedConfirmPassword,
        },
        window.location = "login.html"
      );

      $.post("http://localhost:3000/balance", {
        accountNumber: accountNumber,
        balance: "5000",
      });
    } else {
      Toastify({
        text: "Password didn't match",
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
});
