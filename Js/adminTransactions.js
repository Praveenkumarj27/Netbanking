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
    url: 'http://localhost:3000/transactions',
    method: 'GET',
    success: function(response) {
      var data = response;
      console.log(data);

      localStorage.setItem("adminTransactionsData", JSON.stringify(data));
        
        $.each(data, function (i, rowData) {
          console.log(rowData.name);
          console.log(data.length);

         
          $("#myTable").append(`<tr>
                    <td>  ${ rowData.senderName}  </td> 
                    <td>  ${rowData.name}  </td> 
                    <td>  ${rowData.currentDate}  </td> 
                    <td>  ${rowData.currentTime}  </td> 
                    <td>  ${rowData.amount}  </td> 
                   
                     </tr>`);
                     
      })
      
    }
  })
      var z = localStorage.getItem("adminTransactionsData");
      var response = JSON.parse(z);
    

      $(".datepicker").datepicker();
      $("#filter").click(function(){
       
        var minDate = $("#startdate").val();
        var maxDate = $("#enddate").val();
      

              var res=response.filter((e)=>(e.currentDate >=minDate && e.currentDate<=maxDate))
              console.log(res);
              var filterdData = "";
              $.each(res, function (i, e) {
                console.log(e.name);


                filterdData += `<tr>
                <td>  ${e.senderName}  </td> 
                <td>  ${e.name}  </td> 
                <td>  ${e.currentDate}  </td> 
                <td>  ${e.currentTime}  </td> 
                <td>  ${e.amount}  </td> 
               
                 </tr>`;
           
             if(res.length<=0){
              $("table tbody").html("<h4>No Transactions</h4>");
             }else{
              $("#myTable").html(filterdData)
             }
          
            })
    })


      // $("#search-input").on("keyup", function () {
      //   var value = $(this).val().toLowerCase();
      //   $("#myDataTable tr").filter(function () {
      //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      //   });
      // });

      $("#search-input").keyup(function () {
        var search = $(this).val();
        $("table tbody tr").hide();
        var len = $(
          'table tbody tr:not(.notfound) td:contains("' + search + '")'
        ).length;
    
        if (len > 0) {
          // Searching text in columns and show match row
          $('table tbody tr:not(.notfound) td:contains("' + search + '")').each(
            function () {
              $(this).closest("tr").show();
            }
          );
        } else {
          $(".notfound").show();
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
    
            
    
              tenDaysData += `<tr>
              <td>  ${e.senderName}  </td> 
              <td>  ${e.name}  </td> 
              <td>  ${e.currentDate}  </td> 
              <td>  ${e.currentTime}  </td> 
              <td>  ${e.amount}  </td> 
             
               </tr>`;
         
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
    
         
    
              fifteenDaysData += `<tr>
              <td>  ${e.senderName}  </td> 
              <td>  ${e.name}  </td> 
              <td>  ${e.currentDate}  </td> 
              <td>  ${e.currentTime}  </td> 
              <td>  ${e.amount}  </td> 
             
               </tr>`;
        
          });
    
          if (res.length <= 0) {
            $("table tbody").html("<h4>No Transactions</h4>");
          } else {
            $("#myTable").html(fifteenDaysData);
          }
        }
      });


});
