let bearer = localStorage.getItem("token");
let url = `http://mud-back/api/profile?token=`;

let myVar = 0;
let user = {};

let jsonXXX = 0;

let fetchResponse2 = 0;
let xhrGetProfileResult = 0;

let secondIteration = 0;


function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

function newWebSocketConnection(user) {

    console.log('------------------newWebSocketConnection!');


    websocket = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email);
    websocket.onopen = function (ev) {
        console.log('*!*!*!*!*!*!*!onopen, Вы подключены!');
    }
}

const xhrGetProfile = async function (bearer) {
    const fetchResponse = await fetch(
        url + bearer)
        .then(response => response.json())
        .catch(error => console.error('error:', error));

    console.log('fetchResponse:');
    console.log(fetchResponse);

    if (fetchResponse && fetchResponse.hasOwnProperty("user")){
        console.log('случай удачного подключения - присваеваем user:');
        user = fetchResponse;
        newWebSocketConnection(user);
    }

        xhrGetProfileResult = fetchResponse;
};

// if (xhrGetProfileResult && xhrGetProfileResult.hasOwnProperty("code")) {
//     switch (fetchResponse.code) {
//         // refresh
//         case 0:
//             console.log('case 0');
//
//             refreshedToken = fetchResponse.refreshed_token;
//             xhrGetProfile(refreshedToken).then(jsonXXX => {
//                 console.log('рефреш токена');
//                 // console.log('jsonXXX:');
//                 // console.log(jsonXXX);
//                 console.log('refreshedToken:');
//                 console.log(refreshedToken);
//                 localStorage.setItem("token", refreshedToken);
//
//                 fetchResponse2 = fetchResponse;
//
//                 // newWebSocketConnection(fetchResponse.user);
//             });
//
//             break;
//         //токен не парсится. Требуется логинить заново
//         case 1:
//             console.log('1');
//             ajaxLogin();
//             break;
//         //токен попал в блеклист. Требуется логинить заново
//         case 2:
//             console.log('2');
//             document.location.href = '/login.html';
//             break;
//         //тут врядли что будет, на всяк случай
//         case 3:
//             console.log('3');
//             ajaxLogin();
//             break;
//     }
//
// }

// myVar = fetchResponse;


// xhrGetProfile();


// timerId = setTimeout(function go() {
//     console.log('myVar: ');
//     console.log(myVar);
//     // setTimeout(go, 1000);
//
//     if (!myVar.hasOwnProperty("user")) {
//         setTimeout(go, 3000);
//     }
//
//     if (myVar.hasOwnProperty("user")) {
//         console.log('clearTimeout: ');
//         console.log(timerId);
//         clearTimeout(timerId);
//         user  = myVar.user;
//         myVar = 0;
//     }
//
// }, 5000);
//
//
// setTimeout(
//     function () {
//         // alert("Hello");
//         console.log('Hello: ');
//         console.log(timerId);
//         // clearTimeout(1);
//         console.log(user);
//
//     },
//     10000);

// setTimeout(
//     function () {
//         console.log('Hello-setTimeout: ');
//         console.log(fetchResponse2);
//     },
//     10000);


if (bearer) {
    xhrGetProfile(bearer)
        .then(function () {
            console.log('блок then: ');
            console.log('xhrGetProfileResult:');
            console.log(xhrGetProfileResult);

            if (xhrGetProfileResult && xhrGetProfileResult.hasOwnProperty("code")) {
                switch (xhrGetProfileResult.code) {
                    // refresh
                    case 0:
                        console.log('case 0');

                        refreshedToken = xhrGetProfileResult.refreshed_token;
                        xhrGetProfile(refreshedToken).then(jsonXXX => {
                            console.log('рефреш токена');
                            console.log('refreshedToken:');
                            console.log(refreshedToken);
                            localStorage.setItem("token", refreshedToken);

                            secondIteration = 1;

                            // fetchResponse2 = fetchResponse;

                            // newWebSocketConnection(fetchResponse.user);
                        });

                        break;
                    //токен не парсится. Требуется логинить заново
                    case 1:
                        console.log('1');
                        ajaxLogin();
                        break;
                    //токен попал в блеклист. Требуется логинить заново
                    case 2:
                        console.log('2');
                        document.location.href = '/login.html';
                        break;
                    //тут врядли что будет, на всяк случай
                    case 3:
                        console.log('3');
                        ajaxLogin();
                        break;
                }

            }

        })
        .finally(function () {
            console.log('блок finally: ');
            // newWebSocketConnection(fetchResponse2.user);

            if (!isEmptyObject(user) && secondIteration === 1){
                newWebSocketConnection(user);
            }
        });

    console.log('------------перед if------------');



    // xhrGetProfileObertka(bearer)
    //     .finally(function () {
    //         console.log('блок finally: ');
    //         newWebSocketConnection(fetchResponse2.user);
    //     })
} else {
    document.location.href = '/login.html';
}


$(document).ready(function () {

    // console.log($('#second-row').height());
    // console.log($('#main-panel-text div').height());

    // let height = $('#second-row').height();
    let height = $('#main-panel').height();

    // $('#main-panel-text div').height(height - 100);
    // $('#main-panel-text div').height(height - 50);
    $('#main-panel-text div').height(height);

    //пошел коннект к сокет-серверу
    if (!isEmptyObject(user)) {
        console.log('___________________________user !empty');
        console.log(user);
    }

});


$(document).on("click", "#send-main", function (event) {

    console.log('convertRemToPixels(2.5)');
    console.log(convertRemToPixels(2.5));
    // var values = $(this).serialize();

    let message = {
        user: user,
    };
    // websocket.send(JSON.stringify(message));

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
