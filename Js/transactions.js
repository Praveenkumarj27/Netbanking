$(document).ready(function () {

  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });

  $.ajax({
    url: "http://localhost:3000/transactions",
    method: "GET",
    success: function (response) {


    // var table =   $("#myDataTable").DataTable({
    //     data:response,
    //     columns:[{data:"name"},{data:"receiverAccountNumber"},{data:"currentDate"},{data:"currentTime"},{data:"amount"}]
    //   })

      // var minDate, maxDate;

      // // Custom filtering function which will search data in column four between two values
      // $.fn.dataTable.ext.search.push(
      //     function( settings, data, dataIndex ) {
      //         var min = minDate.val();
      //         var max = maxDate.val();
      //         var date = new Date( data[2] );
    
      //         if (
      //             ( min === null && max === null ) ||
      //             ( min === null && date <= max ) ||
      //             ( min <= date   && max === null ) ||
      //             ( min <= date   && date <= max )
      //         ) {
      //             return true;
      //         }
      //         return false;
      //     }
      // );
    
      //     // Create date inputs
      //     minDate = new DateTime($('#min'), {
      //         format: 'MMMM DD YYYY'
      //     });
      //     maxDate = new DateTime($('#max'), {
      //         format: 'MMMM DD YYYY'
      //     });
    
      var db = JSON.parse(localStorage.getItem("user"));

   $(".datepicker").datepicker();
      var data = response;
      console.log(data);
      function generateRowHtml(rowData) {
        console.log(rowData);
        

        console.log(db.accountNumber);
        console.log(rowData.userAccountNumber);

        if (db.accountNumber === rowData.userAccountNumber) {
          let senderStatus="Debited"

          return '<tr>' +
          '<td>' + rowData.name + '</td>' +
          '<td>' + rowData.receiverAccountNumber + '</td>' +
          '<td>' + rowData.currentDate + '</td>' +
          '<td>' + rowData.currentTime + '</td>' +
          '<td>' + rowData.amount + '</td>' +
          '<td>' + senderStatus + '</td>' +
          '</tr>';
        }else if (db.accountNumber === rowData.receiverAccountNumber){

          let receiverStatus= "Credited";
          let senderName
          return '<tr>' +
          '<td>' + rowData.senderName + '</td>' +
          '<td>' + rowData.userAccountNumber + '</td>' +
          '<td>' + rowData.currentDate + '</td>' +
          '<td>' + rowData.currentTime + '</td>' +
          '<td>' + rowData.amount + '</td>' +
          '<td>' + receiverStatus + '</td>' +
          '</tr>';
        }
      }

      var tableBody = $('table tbody');
      data.forEach(function(rowData) {
        var rowHtml = generateRowHtml(rowData);
        tableBody.append(rowHtml);
      });
      
      $("#filter").click(function(){
       
        var minDate=$("#startdate").val()
        console.log(typeof(minDate));
        var maxDate=$("#enddate").val()
        console.log(minDate);
        $.ajax({
            url: "http://localhost:3000/transactions",
            method: "GET",
            success: function (response) {
             console.log(response)

              var res=response.filter((e)=>(e.currentDate >=minDate && e.currentDate<=maxDate))
              console.log(res.length);

              function filterdData(e) {
                console.log(e);
                if (db.accountNumber === e.userAccountNumber) {
                  let senderStatus="Debited"
        
                  return '<tr>' +
                  '<td>' + e.name + '</td>' +
                  '<td>' + e.receiverAccountNumber + '</td>' +
                  '<td class="date-column">' + e.currentDate + '</td>' +
                  '<td>' + e.currentTime + '</td>' +
                  '<td>' + e.amount + '</td>' +
                  '<td>' + senderStatus + '</td>' +
                  '</tr>';
                }else if (db.accountNumber === e.receiverAccountNumber){
        
                  let receiverStatus= "Credited";
                  let senderName
                  return '<tr>' +
                  '<td>' + e.senderName + '</td>' +
                  '<td>' + e.userAccountNumber + '</td>' +
                  '<td class="date-column">' + e.currentDate + '</td>' +
                  '<td>' + e.currentTime + '</td>' +
                  '<td>' + e.amount + '</td>' +
                  '<td>' + receiverStatus + '</td>' +
                  '</tr>';
                }
              }
               
              var filteredTableBody
              if(res.length<=0){
                $('table tbody').html("<h2>No Transactions</h2>").css("textAlign","center");
              }else{
                res.forEach(function(e) {
                  var newData = filterdData(e);
                  filteredTableBody += newData
                  $('table tbody').html(filteredTableBody);
                });
              }
             
            },
          });
          
    })
      // $("#search-input").on("keyup", function () {
      //   var value = $(this).val().toLowerCase();
      //   $("#myDataTable tr").filter(function () {
      //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      //   });
      // });

      // Search on name column only
      $('#search-input').keyup(function(){
        // Search Text
        var search = $(this).val();
    
        // Hide all table tbody rows
        $('table tbody tr').hide();
    
        // Count total search result
        var len = $('table tbody tr:not(.notfound) td:contains("'+search+'")').length;
    
        if(len > 0){
          // Searching text in columns and show match row
          $('table tbody tr:not(.notfound) td:contains("'+search+'")').each(function(){
            $(this).closest('tr').show();
          });
        }else{
          $('.notfound').show();
        }
      });

    
//       var today = new Date();
// var tenDaysAgo = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);

//       $("#last-btn").click(function(){
//         $('table tr').each(function() {
//           var dateValue = $(this).find('.date-column').text(); // assuming your date column has a class of 'date-column'
//           var date = new Date(dateValue);
       
//           if(date < tenDaysAgo) {
//               $(this).hide();
//           }
//        });
//       })




    },
  });
 

 
});
