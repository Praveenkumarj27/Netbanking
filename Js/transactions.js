$(document).ready(function () {
  
  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });

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

          var count = 0;

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

      $('#search-input').on('keyup', function() {
        var searchTerm = $(this).val().toLowerCase();
        var filteredData = data.filter(function(rowData) {
          var searchMatches = false;
          Object.keys(rowData).forEach(function(key) {
            if (rowData[key].toString().toLowerCase().indexOf(searchTerm) > -1) {
              searchMatches = true;
            }
          });
          return searchMatches;
        });
        tableBody.empty();
        filteredData.forEach(function(rowData) {
          var rowHtml = generateRowHtml(rowData);
          tableBody.append(rowHtml);
        });
      });

      // let table = new DataTable('#myDataTable')

    }
  })

});


