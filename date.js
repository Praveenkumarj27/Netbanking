// $(document).ready(function(){
//     $(function() {
//         $('input[name="daterange"]').daterangepicker({
//           opens: 'left'
//         }, function(start, end, label) {
//           console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//         });
//       });
// })





    var minDate, maxDate;

 console.log("hello world");
// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = $("#min").val();
        var max = $("#max").val();
        var date = new Date( data[4] );
 
        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )
        ) {
            return true;
        }
        return false;
    }
);
 
$(document).ready(function() {

    var table = new DataTable('#example')
    // Create date inputs
    minDate = new Date($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new Date($('#max'), {
        format: 'MMMM Do YYYY'
    });
 
    // DataTables initialisation
     
 
    // Refilter the table
    $('#min, #max').on('change', function () {
        table.draw();
    });
});









//Date Range filter in jquery
