// let bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tdWQtYmFja1wvYXBpXC9sb2dpbiIsImlhdCI6MTU3OTg3MTc1OSwiZXhwIjoxNTc5ODc1MzU5LCJuYmYiOjE1Nzk4NzE3NTksImp0aSI6InNuTUliakNoaUh2ZXlXZWkiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.uKMrVR21-TnXYj390bBmA8y4Bd0kT5zXPnx2KWdbLxE';

let bearer = localStorage.getItem("token");
let user = {};


// function convertRemToPixels(rem) {
//     return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
// }

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}


function ajaxProfile(bearer) {
    $.ajax({
        type: 'GET',
        url: "http://mud-back/api/profile?token=" + bearer,
        cache: false,
        /**/
        async: false,
        /**/
        success: function (response) {
            // console.log('success, response:');
            // console.log(response);

            // console.log(response.user);
            // console.log(response.user.name);

            user = response.user;
            $(".login-logout .btn").text(response.user.name.toLowerCase());

            // if(response.code == 0){
            //     ajaxProfile(response.refreshed_token);
            //     localStorage.setItem("token", response.refreshed_token);
            //     $(".login-logout btn").val(response);
            // }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('жопа');
            // console.log(jqXHR.status, textStatus, errorThrown);

            // console.log('jqXHR.responseJSON');
            // console.log(jqXHR.responseJSON);


            let responseCode = jqXHR.responseJSON.code;

            // console.log('responseCode');
            // console.log(responseCode);
            switch (responseCode) {
                case 0:
                    console.log('case 0');
                    // ajaxProfile(response.refreshed_token);
                    // localStorage.setItem("token", response.refreshed_token);

                    ajaxProfile(jqXHR.responseJSON.refreshed_token);
                    localStorage.setItem("token", jqXHR.responseJSON.refreshed_token);
                    // $(".login-logout btn").val(response);

                    break;
                case 1:
                    console.log('1');
                    ajaxLogin();
                    break;
                case 2:
                    console.log('2');
                    // ajaxLogin();
                    document.location.href = '/login.html';
                    break;
                case 3:
                    console.log('3');
                    ajaxLogin();
                    break;
            }
        }
    });
}


$(document).ready(function () {
    // console.log( "ready!" );
    // console.log('ready - user:');
    // console.log(user);
    // console.log('isEmptyObject');
    // console.log(isEmptyObject(user));

    if (bearer) {
        ajaxProfile(bearer);

    } else {
        document.location.href = '/login.html';
        // ajaxLogin();
    }

    // console.log($('#second-row').height());
    // console.log($('#main-panel-text div').height());

    let height = $('#second-row').height();
    // $('#main-panel-text div').height(height - 100);
    // $('#main-panel-text div').height(height - 50);
    $('#main-panel-text div').height(height - 42);

    //пошел коннект к сокет-серверу

    if (!isEmptyObject(user)) {
        console.log('user');
        console.log(user);
        websocket = new WebSocket("ws://127.0.0.1:8000");

        websocket.onopen = function(ev) {
            // template('#system_msg', "td", ['Вы подключены!'])
            // uniqueId = genarationString();
            // userColor = genarationColor();
            console.log('onopen, Вы подключены!');
        }

        // let message = {
        //     // message: mymessage,
        //     // name: myname,
        //     // uniqueId: uniqueId,
        //     // userColor: userColor,
        //     user: user,
        // };
        //
        // websocket.send(JSON.stringify(message));

    }


});

$(document).on("click", "#send-main", function (event) {

    // console.log('convertRemToPixels(1)');
    // console.log(convertRemToPixels(1));
    // var values = $(this).serialize();


    let message = {
        user: user,
    };
    websocket.send(JSON.stringify(message));

    let values = ['wwwww', 'asdasdasd'];

    $.ajax({
        url: "http://mud-back/userinput",
        type: "post",
        // data   : values,
        // data   : {info: values},
        // data   : {values},
        data: {'a': 'wwwww', 'b': 'asdasdasd'},
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

