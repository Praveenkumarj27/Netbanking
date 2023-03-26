$(document).ready(function () {

    $("#logout").click(function () {
      localStorage.removeItem("user");
      localStorage.removeItem("balance");
      localStorage.removeItem("allUsers");
      localStorage.removeItem("allBalance");
      window.location = "index.html";
    });
   
  //   function applyFilter() {
  //     var filterType = $("#rangeval").val(),
  //         start, end;
  //     // Set the visibility of the two date fields:
  //     $("#selectDate").toggle(["Single Date", "Custom Date Range"].indexOf(filterType) > -1);
  //     $("#selectDate2").toggle(filterType === "Custom Date Range");
  //     // Depending on the type of filter, set the range of dates (start, end):
  //     if (filterType === "") {
  //         // Show all: choose extreme dates
  //         start = new Date('1000-01-01');
  //         end = new Date('3000-01-01');
  //     } else if (!parseInt(filterType)) {
  //         // Use data entry:
  //         start = $("#selectDate").date();
  //         end = filterType === "Custom Date Range" ? $("#selectDate2").date() : start;
  //     } else {
  //         // Show last X days:
  //         start = new Date();
  //         start.setHours(0,0,0,0);
  //         start.setDate(start.getDate() - parseInt(filterType));
  //         end = new Date(); // today
  //     }
  //     // For each row: set the visibility depending on the date range
  //     $(".myTable tr").each(function () {
  //         var date = $("td:last-child", this).date();
  //         $(this).toggle(date >= start && date <= end);
  //     });
  // }
  // applyFilter(); 
  
    $.ajax({
      url: 'http://localhost:3000/transactions',
      method: 'GET',
      success: function(response) {
        var data = response;
        console.log(data);
        function generateRowHtml(rowData) {
          console.log(rowData);
          var db = JSON.parse(localStorage.getItem("user"));
           var sNo = 0;
               sNo +=1
          
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
  
        // $("#search-input").on("keyup", function () {
        //   var value = $(this).val().toLowerCase();
        //   $("#myDataTable tr").filter(function () {
        //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        //   });
        // });
  
         let table = new DataTable('#myDataTable')
  
      }
    })
  });
  
  
  