

$( document ).ready(function() {
    // console.log( "ready!" );

    console.log($('#second-row').height() );
    console.log($('#main-panel-text div').height() );

    let height = $('#second-row').height();
    $('#main-panel-text div').height(height - 100);

});

$(document).on("click", "#send-main", function (event) {

    console.log('click');


    // var values = $(this).serialize();

    let values = ['wwwww', 'asdasdasd'];

    $.ajax({
        // url: "test.php",
        url    : "http://mud-back/userinput",
        type   : "post",
        // data   : values,
        // data   : {info: values},
        // data   : {values},
        data   : {'a': 'wwwww', 'b': 'asdasdasd'},
        success: function (response) {

            // You will get response from your PHP page (what you echo or print)

            console.log(response);

            // $('#panel-body').find('.panel-body').append('Adding more content here :)');

            // $('#main-panel').append('Adding more content here :)' + "<br>");

            // $('#main-panel-text').append('Adding more content here :)' + "<br>");
            // $('#main-panel-text').append('Adding more content here :)' + "<br>");
            // $('#main-panel-text').append('Adding more content here :)' + "<br>");
            // $('#main-panel-text').append('Adding more content here :)' + "<br>");


            $('#main-panel-text div').append('Adding more content here :)' + "<br>");
            $('#main-panel-text div').append('Adding more content here :)' + "<br>");
            $('#main-panel-text div').append('Adding more content here :)' + "<br>");
            $('#main-panel-text div').append('Adding more content here :)' + "<br>");
        },
        // error  : function (jqXHR, textStatus, errorThrown) {
        //     console.log(textStatus, errorThrown);
        // }
    });



});

