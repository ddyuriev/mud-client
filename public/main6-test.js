let bearer              = localStorage.getItem("token");
// let url                 = `http://mud-back/api/profile?token=`;
let url                 = 'http://mud-back/api/profile?token=';
let user                = {};
let xhrGetProfileResult = 0;
let secondIteration     = 0;

let gameProcess = '';

let otladka = 0;

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

function newWebSocketConnection(user) {
    // console.log('------------------newWebSocketConnection!');
    websocket = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email);
    /**/
    // websocket = new WebSocket("ws://192.168.0.104:8000/?user=" + user.email);
    // websocket = new WebSocket("ws://192.168.215.29:8000/?user=" + user.email);
    /**/
    websocket.onopen = function (ev) {
        console.log('*!*!*!*!*!*!*!onopen, Вы подключены!');
    };

    websocket.onmessage = function (ev) {

        var msg   = JSON.parse(ev.data);
        var umsg  = msg.message;
        var uname = msg.name;
        var utime = msg.time;


        console.log('*!*!*!*!*!*!*!onmessage*!*!*!*!*!*!*!');
        console.log(msg);

        // console.log('msg key:');
        // console.log(Object.keys(msg)[0]);

        let messageKey = Object.keys(msg)[0];

        /**/
        let innerHTML = document.getElementById('main-panel-text-finally').innerHTML;
        console.log('innerHTML');
        console.log(innerHTML);
        /**/

        switch (messageKey) {
            case 'selectCharacterDialog':

                // console.log('msg.messageKey');
                // console.log(msg[messageKey]);

                gameProcess                                                  = msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerText = msg[messageKey];
                document.getElementById('main-panel-text-finally').innerHTML = msg[messageKey];

                break;
            case 'for_client':

                // console.log('msg.messageKey');
                // console.log(msg[messageKey]);

                // gameProcess = msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerText += msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerHTML += msg[messageKey];
                document.getElementById('main-panel-text-finally').innerHTML = innerHTML + msg[messageKey];
                // document.getElementById('main-panel-text-finally').outerHTML += msg[messageKey];

                break;
            // case 1:
            //     console.log('1');
            //     ajaxLogin();
            //     break;
        }


    };
}

// define a handler
function onEnterKeyUp(e) {

    let inputElement = document.getElementById("main-input");

    if (e.key === 'Enter' && e.keyCode === 13) {
        // call your function to do the thing
        console.log('enter pressed');

        console.log('user');
        console.log(user.uuid);

        let msg = {
            message: inputElement.value,
            name   : user.email,
            uuid   : user.uuid
        };

        websocket.send(JSON.stringify(msg));
        inputElement.value = "";
    }
}

// register the handler
document.addEventListener('keyup', onEnterKeyUp, false);

//test backup0217

/**/
// websocket.onmessage = function (ev) {
//
//     var msg   = JSON.parse(ev.data);
//     var umsg  = msg.message;
//     var uname = msg.name;
//     var utime = msg.time;
//
//
//     console.log('*!*!*!*!*!*!*!onmessage*!*!*!*!*!*!*!');
//     console.log(ev.data);
// };


/**/

const xhrGetProfile = async function (bearer) {

    // console.log('###############otladka0:');
    // console.log(otladka);
    // otladka++;

    const fetchResponse = await fetch(
        url + bearer)
        .then(response => response.json())
        .catch(error => console.error('error:', error));

    // console.log('fetchResponse:');
    // console.log(fetchResponse);

    //базовый случай, когда токен принят сразу
    if (fetchResponse && fetchResponse.hasOwnProperty("user")) {

        // console.log('###############otladka1:');
        // console.log(otladka);
        // otladka++;

        // console.log('случай удачного подключения - присваеваем user:');
        user = fetchResponse.user;
        newWebSocketConnection(user);
        document.getElementById('user-name-btn').innerText = user.email;
    }
    xhrGetProfileResult = fetchResponse;
};

if (bearer) {
    xhrGetProfile(bearer)
        .then(function () {
            // console.log('блок then: ');
            // console.log('xhrGetProfileResult:');
            // console.log(xhrGetProfileResult);

            if (xhrGetProfileResult && xhrGetProfileResult.hasOwnProperty("code")) {
                switch (xhrGetProfileResult.code) {
                    // refresh
                    case 0:
                        // console.log('case 0');

                        refreshedToken = xhrGetProfileResult.refreshed_token;
                        xhrGetProfile(refreshedToken).then(jsonXXX => {
                            // console.log('рефреш токена');
                            // console.log('refreshedToken:');
                            // console.log(refreshedToken);
                            localStorage.setItem("token", refreshedToken);
                            secondIteration = 1;
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
                    //Token has expired and can no longer be refreshed
                    case 3:
                        console.log('3');
                        document.location.href = '/login.html';
                        break;
                }

            }

        });
    // .finally(function () {
    //     console.log('блок finally: ');
    //     console.log('###############otladka-2-finally:');
    //     console.log(otladka);
    //     otladka++;
    //
    //     if (!isEmptyObject(user) && secondIteration === 1){
    //
    //         console.log('finally-got-user:');
    //
    //         console.log('###############otladka-3-finally:');
    //         console.log(otladka);
    //         otladka++;
    //
    //         newWebSocketConnection(user);
    //     }
    // });

    // console.log('------------перед if------------');

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
    // if (!isEmptyObject(user)) {
    //     console.log('___________________________user !empty');
    //     console.log(user);
    // }

});


$(document).on("click", "#send-main", function (event) {

    // console.log('convertRemToPixels(2.5)');
    // // console.log(convertRemToPixels(2.5));
    // // var values = $(this).serialize();
    //
    // let message = {
    //     user: user,
    // };
    //
    // let values = ['wwwww', 'asdasdasd'];
    //
    // $.ajax({
    //     url    : "http://mud-back/userinput",
    //     type   : "post",
    //     // data   : values,
    //     // data   : {info: values},
    //     // data   : {values},
    //     data   : {'a': 'wwwww', 'b': 'asdasdasd'},
    //     success: function (response) {
    //
    //         // You will get response from your PHP page (what you echo or print)
    //
    //         console.log(response);
    //
    //         // $('#panel-body').find('.panel-body').append('Adding more content here :)');
    //
    //         // $('#main-panel').append('Adding more content here :)' + "<br>");
    //
    //         // $('#main-panel-text').append('Adding more content here :)' + "<br>");
    //         // $('#main-panel-text').append('Adding more content here :)' + "<br>");
    //         // $('#main-panel-text').append('Adding more content here :)' + "<br>");
    //         // $('#main-panel-text').append('Adding more content here :)' + "<br>");
    //
    //
    //         $('#main-panel-text div').append('Adding more content here :)' + "<br>");
    //         $('#main-panel-text div').append('Adding more content here :)' + "<br>");
    //         $('#main-panel-text div').append('<text style="color:darkgreen">Adding more content here :)</text>' + "<br>");
    //         $('#main-panel-text div').append('Adding more content here :)' + "<br>");
    //     },
    //     // error  : function (jqXHR, textStatus, errorThrown) {
    //     //     console.log(textStatus, errorThrown);
    //     // }
    // });


    // let innerHTML = document.getElementById('main-panel-text-finally').innerHTML;
    let newEl = '<div style="color:darkgreen">Adding more content here :)</div>';
    // let newEl = 'Adding more content here<br>';
    // document.getElementById('main-panel-text-finally').innerHTML = innerHTML + newEl;


    document.getElementById('main-panel-text-finally').insertAdjacentHTML('beforeend', newEl);

    // let text = document.createTextNode("This just got added");
    // let text = document.createElement("span");

    // document.getElementById('main-panel-text-finally').appendChild(text);


});
