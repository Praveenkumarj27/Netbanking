$(document).ready(function () {

  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    localStorage.removeItem("transactionsData")
    localStorage.removeItem("adminTransactionsData")
    localStorage.removeItem("editProfile")
    window.location = "index.html";
  });
  
  var db = JSON.parse(localStorage.getItem("user"));
  
  $.ajax({
    url: "http://localhost:3000/transactions",
    method: "GET",
    success: function (data) {
      console.log(data);
      localStorage.setItem("transactionsData", JSON.stringify(data));
     
      $.each(data, function (i, rowData) {
        console.log(rowData.userAccountNumber);
        console.log(data.length);
        console.log(rowData.receiverAccountNumber);
      var j=db.accountNumber === rowData.userAccountNumber
      console.log(j);
      var k=db.accountNumber === rowData.receiverAccountNumber
      console.log(k);


        if (db.accountNumber === rowData.userAccountNumber) {
          let senderStatus = "Debited";
          var temp=""
          temp += `<tr>
                    <td>  ${rowData.name}  </td> 
                    <td>  ${rowData.receiverAccountNumber}  </td> 
                    <td>  ${rowData.currentDate}  </td> 
                    <td>  ${rowData.currentTime}  </td> 
                    <td>  ${rowData.amount}  </td> 
                    <td>  ${senderStatus}  </td> 
                     `;
        } else if (db.accountNumber === rowData.receiverAccountNumber) {
          let receiverStatus = "Credited";

          temp += `<tr>
                    <td>  ${rowData.senderName}  </td> 
                    <td>  ${rowData.userAccountNumber}  </td> 
                    <td>  ${rowData.currentDate}  </td> 
                    <td>  ${rowData.currentTime}  </td> 
                    <td>  ${rowData.amount}  </td> 
                    <td>  ${receiverStatus}  </td> 
                     `;
        };
        if (j ===false && k===false) {
         // $("table tbody").html("<h5>No transactions</h5>");
         $(".notfound1").show()
        } else {
          $(".notfound1").hide()
          $("#myTable").append(temp);
        }
      });
    },
  });
 

  $(".datepicker").datepicker();
  $("#filter").click(function () {
    var minDate = $("#startdate").val();
    var maxDate = $("#enddate").val();
    var z = localStorage.getItem("transactionsData");
    var response = JSON.parse(z);
console.log(response);
    var res = response.filter(
      (e) => e.currentDate >= minDate && e.currentDate <= maxDate
    );
    console.log(res);
    var filterdData = "";
    $.each(res, function (i, e) {
      console.log(e.name);

      if (db.accountNumber === e.userAccountNumber) {
        let senderStatus = "Debited";

        filterdData += `<tr>
                        <td>  ${e.name}  </td>
                        <td>  ${e.receiverAccountNumber}  </td>
                        <td>  ${e.currentDate}  </td>
                        <td>  ${e.currentTime}  </td>
                        <td>  ${e.amount}  </td>
                        <td>  ${senderStatus}  </td>
                         `;
      } else if (db.accountNumber === e.receiverAccountNumber) {
        let receiverStatus = "Credited";

        filterdData += `<tr>
                        <td>  ${e.senderName}  </td>
                        <td>  ${e.userAccountNumber}  </td>
                        <td>  ${e.currentDate}  </td>
                        <td>  ${e.currentTime}  </td>
                        <td>  ${e.amount}  </td>
                        <td>  ${receiverStatus}  </td>
                         `;
      }
    });
    if (res.length <= 0) {
      $("table tbody").html("<h4>No Transactions</h4>");
    } else {
      $("#myTable").html(filterdData);
    }
  });

 
  var notFound = $(".notFound")
  // make it hidden by default
  notFound.hide()

  $("#search-input").on("keyup", function() {
    var value = $(this).val().toLowerCase()
    
    // select all items
    var allItems = $("#myDataTable tr")
    
    // get list of matched items, (do not toggle them)
    var matchedItems = $("#myDataTable tr").filter(function() {
      return $(this).text().toLowerCase().indexOf(value) > -1
    });
    
    // hide all items first
    allItems.toggle(false)
    
    // then show matched items
    matchedItems.toggle(true)
    
    // if no item matched then show notFound row, otherwise hide it
    if (matchedItems.length == 0) {
      notFound.show()
    }   else {
      notFound.hide()
    }
  });


 

  var today = moment().format("MM/DD/YYYY");
  console.log(today);
  var tenDaysAgo = moment().subtract(10, "days").calendar();
  console.log(tenDaysAgo);
  var fifteenDaysAgo = moment().subtract(15, "days").calendar();
  console.log(fifteenDaysAgo);

  var retriveData = localStorage.getItem("transactionsData");
  var transData = JSON.parse(retriveData);
  console.log(transData);

  $('select[name="filter"]').on("change", function () {
    var ev = $(this).val();
    console.log(ev);

    if (ev === "10days") {
      var res = transData.filter((e) => e.currentDate >= tenDaysAgo);
      console.log(res);

      var tenDaysData = "";
      $.each(res, function (i, e) {
        console.log(e.amount);

        if (db.accountNumber === e.userAccountNumber) {
          let senderStatus = "Debited";

          tenDaysData += `<tr>
                      <td>  ${e.name}  </td>
                      <td>  ${e.receiverAccountNumber}  </td>
                      <td>  ${e.currentDate}  </td>
                      <td>  ${e.currentTime}  </td>
                      <td>  ${e.amount}  </td>
                      <td>  ${senderStatus}  </td>
                       `;
        } else if (db.accountNumber === e.receiverAccountNumber) {
          let receiverStatus = "Credited";

          tenDaysData += `<tr>
                      <td>  ${e.senderName}  </td>
                      <td>  ${e.userAccountNumber}  </td>
                      <td>  ${e.currentDate}  </td>
                      <td>  ${e.currentTime}  </td>
                      <td>  ${e.amount}  </td>
                      <td>  ${receiverStatus}  </td>
                       `;
        }
      });

      if (res.length <= 0) {
        $("table tbody").html("<h4>No Transactions</h4>");
      } else {
        $("#myTable").html(tenDaysData);
      }
    } else if (ev === "15days") {
      var res = transData.filter((e) => e.currentDate >= fifteenDaysAgo);
      console.log(res);
      var fifteenDaysData = "";
      $.each(res, function (i, e) {
        console.log(e.amount);

        if (db.accountNumber === e.userAccountNumber) {
          let senderStatus = "Debited";

          fifteenDaysData += `<tr>
                        <td>  ${e.name}  </td>
                        <td>  ${e.receiverAccountNumber}  </td>
                        <td>  ${e.currentDate}  </td>
                        <td>  ${e.currentTime}  </td>
                        <td>  ${e.amount}  </td>
                        <td>  ${senderStatus}  </td>
                         `;
        } else if (db.accountNumber === e.receiverAccountNumber) {
          let receiverStatus = "Credited";

          fifteenDaysData += `<tr>
                        <td>  ${e.senderName}  </td>
                        <td>  ${e.userAccountNumber}  </td>
                        <td>  ${e.currentDate}  </td>
                        <td>  ${e.currentTime}  </td>
                        <td>  ${e.amount}  </td>
                        <td>  ${receiverStatus}  </td>
                         `;
        }
      });

      if (res.length <= 0) {
        $("table tbody").html("<h4>No Transactions</h4>");
      } else {
        $("#myTable").html(fifteenDaysData);
      }
    }
  });
});



 // $("#search-input").keyup(function () {
  //   var search = $(this).val();
  //   $("table tbody tr").hide();
  //   var len = $(
  //     'table tbody tr:not(.notfound) td:contains("' + search + '")'
  //   ).length;

  //   if (len > 0) {
  //     // Searching text in columns and show match row
  //     $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(
  //       function () {
  //         $(this).closest("tr").show();
  //       }
  //     );
  //   } else {
  //     $(".notfound").show();
  //   }
  // });











   // $("#search-input").on("keyup", function () {
  //   var value = $(this).val().toLowerCase();
  //   $("#myDataTable tr").filter(function () {
  //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  //   });
  // });