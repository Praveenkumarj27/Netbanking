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
        
         console.log(db.accountNumber);
         console.log(rowData.userAccountNumber);

          return '<tr>' +
         
          '<td>' + rowData.senderName + '</td>' +
          '<td>' + rowData.name + '</td>' +
          '<td>' + rowData.currentDate + '</td>' +
          '<td>' + rowData.currentTime + '</td>' +
          '<td>' + rowData.amount + '</td>' +
          '</tr>';
        
      }
      var tableBody = $('table tbody');
      data.forEach(function(rowData) {
        var rowHtml = generateRowHtml(rowData);
        tableBody.append(rowHtml);
      });

      $(".datepicker").datepicker();
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
              console.log(res);

              function filterdData(e) {
                console.log(e);
                return '<tr>' +
         
          '<td>' + e.senderName + '</td>' +
          '<td>' + e.name + '</td>' +
          '<td>' + e.currentDate + '</td>' +
          '<td>' + e.currentTime + '</td>' +
          '<td>' + e.amount + '</td>' +
          '</tr>';
              }
               
              var filteredTableBody
              res.forEach(function(e) {
                var newData = filterdData(e);
                filteredTableBody += newData
                $('table tbody').html(filteredTableBody);
              });
            },
          });
          
    })


      $("#search-input").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myDataTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });

      // let table = new DataTable('#myDataTable')

    }
  })


});


