//чек логин:

// jQuery.support.cors = true;

let bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tdWQtYmFja1wvYXBpXC9sb2dpbiIsImlhdCI6MTU3OTc5OTg2NiwiZXhwIjoxNTc5ODAzNDY2LCJuYmYiOjE1Nzk3OTk4NjYsImp0aSI6InJCRWQyOHNXSFR1enRtSnUiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.hSvrquz2hL1m-hhd263Q5CXbCGMd2hqcytN5XruS3qw';
// $.ajaxSetup({
//     headers: {
//         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//     }
// });


// fetch("http://mud-back/api/profile", {
//     method     : 'GET',
//     crossDomain: true,
//     mode       : 'cors',
//     headers    : {
//         'Authorization': 'Bearer ' + bearer,
//         'Accept'       : 'application/json',
//         'Content-Type' : 'application/json'
//     }
// });


// fetch("http://192.168.0.74/web/v1/accounts/me", {
//     method     : 'GET',
//     crossDomain: true,
//     mode       : 'cors',
//     headers    : {
//         'Authorization': 'Bearer ' + bearer,
//         'Accept'       : 'application/json',
//         'Content-Type' : 'application/json'
//     }
// });


$.ajax({
    // url    : "http://mud-back/api/profile",
    // type   : "GET",
    // beforeSend: function (xhr) {
    //     request.withCredentials = true;
    //     xhr.setRequestHeader('Authorization', 'Bearer ' + bearer);
    // },
    // headers: {
    //     "authorization": "Bearer " + bearer,
    // },
    // data   : {
    // },
    // jsonp: "callback",
    // dataType: "jsonp",
    // cache:  false,
    // async:  true,
    // contentType:    'application/json',




    // beforeSend: function (xhr) {
    //     xhr.setRequestHeader('Authorization', 'Bearer ' + bearer);
    // },
    headers: {
        "authorization": "Bearer " + bearer,
    },
    type      : 'GET',
    // url       : "http://mud-back/api/profile?token=" + bearer,
    url       : "http://mud-back/api/profile",
    // dataType: 'json',
    // dataType  : "jsonp",
    cache     : false,
    // async:  true,
    // xhrFields : {
    //     withCredentials: true
    // },
    // crossDomain: true,

    success: function (response) {
        // You will get response from your PHP page (what you echo or print)
        console.log(response);
    },
});


//OK!
// $.ajax({
//     url    : "http://mud-back/api/login",
//     type   : "POST",
//     data   : {
//         'email': 'therion@mail.ru',
//         'password': '1'
//     },
//     success: function (response) {
//         // You will get response from your PHP page (what you echo or print)
//         console.log(response);
//     },
// });

$(document).ready(function () {
    // console.log( "ready!" );

    console.log($('#second-row').height());
    console.log($('#main-panel-text div').height());

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
