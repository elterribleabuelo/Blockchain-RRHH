$(document).ready(function() {
    console.log("DataTables.js");
    //$('#example').DataTable(); 

    // Setup - add a text input to each footer cell
    $('#example tfoot th').each( function () {
        var title = $(this).text();
        $(this).html( '<input type="text" placeholder = "Buscar por DNI '+title+'" />' );
    } ); 

    // DataTable 
    var table = $('#example').DataTable({
        "searching": true
    });
    
 
    // #myInput is a <input type="text"> element
    $('#myInput').on( 'keyup change clear', function () {
        table.search( this.value ).draw();
    });
    /*var table = $('#example').DataTable({
        initComplete: function () {
            // Apply the search
            this.api().columns([4]).every( function () {
                var that = this;

                $( 'input', this.footer() ).on( 'keyup change clear', function () {
                    if ( that.search() !== this.value ) {
                        that
                            .search( this.value )
                            .draw();
                    }
                } );
            } );
        }
    });*/

});