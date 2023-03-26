$(document).ready(function () {
  $("#logout").click(function () {
    localStorage.removeItem("user");
    localStorage.removeItem("balance");
    localStorage.removeItem("allUsers");
    localStorage.removeItem("allBalance");
    window.location = "index.html";
  });

  $.ajax({
    url: "http://localhost:3000/users",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);

      var a = "";
      var j;
      $.each(data, function (i, ele) {
        if (ele.name != "Admin") {
          a += `<tr>
          <td>${ele.name}</td>
          <td>${ele.accountNumber}</td>
          <td><button class="btn btn-warning edit" id='${ele.id} '>Edit</button></td>
        
         </tr>`;
        }
      });

      $("#myTable").html(a);

      $("#searchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });

      $(".edit").click(function () {
        console.log(this.id);

        data.find((ele) => {
          if (this.id == ele.id) {
            localStorage.setItem("editProfile", JSON.stringify(ele));
            window.location = "adminEdit.html";

            // alert(ele.name);
          }
        });
      });
      // $(".delete").click(function () {
      //   console.log(this.id);

      //   data.find((ele) => {
      //     if (this.id == ele.id) {
      //       alert("If you want to delete this account");
      //       $.ajax({
      //         url: `http://localhost:3000/users/${ele.id}`,
      //         type: "DELETE",
      //         dataType: "json",
      //         success: function (response) {
      //           console.log(response);
      //         },
      //         error: function (xhr, status, error) {
      //           console.log(xhr.responseText);
      //         },
      //       });
      //       $.ajax({
      //         url: `http://localhost:3000/balance/${ele.id}`,
      //         type: "DELETE",
      //         dataType: "json",
      //         success: function (response) {
      //           console.log(response);
      //         },
      //         error: function (xhr, status, error) {
      //           console.log(xhr.responseText);
      //         },
      //       });
      //     }

      //     console.log(ele.accountNumber);
      //   });
      // });

      // let table = new DataTable('#myDataTable')
    },
  });
});

//<td><button class="btn btn-danger delete" id='${ele.id}' >Delete</button></td>
