// let bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tdWQtYmFja1wvYXBpXC9sb2dpbiIsImlhdCI6MTU3OTg3MTc1OSwiZXhwIjoxNTc5ODc1MzU5LCJuYmYiOjE1Nzk4NzE3NTksImp0aSI6InNuTUliakNoaUh2ZXlXZWkiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.uKMrVR21-TnXYj390bBmA8y4Bd0kT5zXPnx2KWdbLxE';

let bearer = localStorage.getItem("token");


function ajaxLogin() {
    $.ajax({
        url    : "http://mud-back/api/login",
        type   : "POST",
        data   : {
            'email'   : 'therion@mail.ru',
            'password': '1'
        },
        success: function (response) {
            console.log('login:');
            console.log(response);
            localStorage.setItem("token", response.token);
        },
    });
}

function ajaxProfile(bearer) {
    $.ajax({
        type   : 'GET',
        url    : "http://mud-back/api/profile?token=" + bearer,
        cache  : false,
        success: function (response) {
            console.log(response);
            // $('.login-logout img').attr("src","public/_images/exit-512.png");

            let responseCode = response.code;
            switch (responseCode) {
                case 0:
                    console.log('0');
                    ajaxProfile(response.refreshed_token);
                    localStorage.setItem("token", response.refreshed_token);
                    break;
                case 1:
                    ajaxLogin();
                    break;
                case 2:
                    console.log('2');
                    ajaxLogin();
                    break;
                case 3:
                    ajaxLogin();
                    break;
            }

        },
        error  : function (jqXHR, textStatus, errorThrown) {
            console.log('жопа');
            console.log(jqXHR.status, textStatus, errorThrown);

            let responseText = jqXHR.responseText;
            console.log('responseText');
            console.log(responseText);
            switch (responseCode) {
                // case 0:
                //     console.log('0');
                //     ajaxProfile(response.refreshed_token);
                //     localStorage.setItem("token", response.refreshed_token);
                //     break;
                case 1:
                    ajaxLogin();
                    break;
                case 2:
                    console.log('2');
                    ajaxLogin();
                    break;
                case 3:
                    ajaxLogin();
                    break;
            }
        }
    });
}


$(document).ready(function () {
    // console.log( "ready!" );

    if (bearer) {
        // $.ajax({
        //     type   : 'GET',
        //     url    : "http://mud-back/api/profile?token=" + bearer,
        //     cache  : false,
        //     success: function (response) {
        //         console.log(response);
        //         // $('.login-logout img').attr("src","public/_images/exit-512.png");
        //
        //         let responseCode = response.code;
        //         switch (responseCode) {
        //             case 0:
        //                 alert('Маловато');
        //                 break;
        //             case 4:
        //                 alert('В точку!');
        //                 break;
        //             case 5:
        //                 alert('Перебор');
        //                 break;
        //             default:
        //                 alert("Нет таких значений");
        //         }
        //
        //     },
        //     error  : function (jqXHR, textStatus, errorThrown) {
        //         console.log('жопа');
        //         console.log(jqXHR.status, textStatus, errorThrown);
        //     }
        // });

        ajaxProfile(bearer);

    } else {
        ajaxLogin();
    }

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

