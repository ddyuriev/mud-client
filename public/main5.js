let bearer              = localStorage.getItem("token");
let url                 = 'http://mud-back/api/profile?token=';
let user                = {};
let xhrGetProfileResult = 0;
let secondIteration     = 0;

let gameProcess = '';



/**/
let head = document.getElementsByTagName('HEAD')[0];
// Create new link Element
let link = document.createElement('link');
// set the attributes for link element
link.rel = 'stylesheet';
link.type = 'text/css';
let colorScheme = localStorage.getItem('colorScheme');
link.href = 'public/style.css';
link.href = colorScheme === 2 ? 'public/scheme_white.css' : 'public/scheme_black.css';
// Append link element to HTML head
head.appendChild(link);
/**/

/**/
window.localStorage.setItem('colorScheme', 1);
// let colorScheme = localStorage.getItem('colorScheme');

// console.log('------------------colorScheme:');
// console.log(colorScheme);

/**/

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function isEmptyObject(obj) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

function newWebSocketConnection(user) {
    // console.log('------------------newWebSocketConnection!');
    // websocket = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email);
    // websocket = new WebSocket("ws://192.168.0.104:8000/?user=" + user.email);
    // websocket = new WebSocket("ws://192.168.215.29:8000/?user=" + user.email);
    if (user.at_home) {
        websocket = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email + "&color=" + user.color_scheme);
    } else {
        websocket = new WebSocket("ws://192.168.215.37:8000/?user=" + user.email + "&color=" + user.color_scheme);
    }

    /**/


    websocket.onopen = function (ev) {
        console.log('*!*!*!*!*!*!*!onopen, Вы подключены!');
    };

    websocket.onmessage = function (ev) {

        let msg   = JSON.parse(ev.data);
        let umsg  = msg.message;
        let uname = msg.name;
        let utime = msg.time;


        console.log('*!*!*!*!*!*!*!onmessage*!*!*!*!*!*!*!');
        console.log(msg);

        // console.log('msg key:');
        // console.log(Object.keys(msg)[0]);

        let messageKey = Object.keys(msg)[0];

        /**/
        let innerHTML = document.getElementById('main-panel-text-finally').innerHTML;
        // console.log('innerHTML');
        // console.log(innerHTML);
        /**/

        switch (messageKey) {
            case 'selectCharacterDialog':

                // console.log('msg.messageKey');
                // console.log(msg[messageKey]);

                gameProcess = msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerText = msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerHTML = msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerHTML = innerHTML + msg[messageKey];
                document.getElementById('main-panel-text-finally').innerHTML = msg[messageKey] + innerHTML;

                break;
            case 'for_client':

                // console.log('msg.messageKey');
                // console.log(msg[messageKey]);

                // gameProcess = msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerText += msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerHTML += msg[messageKey];
                // document.getElementById('main-panel-text-finally').innerHTML = innerHTML + msg[messageKey];
                // document.getElementById('main-panel-text-finally').outerHTML += msg[messageKey];

                document.getElementById('main-panel-text-finally').innerHTML = msg[messageKey] + innerHTML;

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

    /**/

    // console.log("e:");
    // console.log(e);

    // let charCode = (e.which) ? e.which : event.keyCode;
    // console.log("KeyCode: " + charCode);
    // if (charCode >= 96 && charCode <= 106)
    //     console.log("Numlock number detected: " + charCode);
    /**/

    let inputElement = document.getElementById("main-input");

    let msg = {
        // message: inputElement.value,
        message: '',
        name   : user.email,
        uuid   : user.uuid
    };

    //костыли для обычных стрелочек
    const arrowsKeysList = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
    if (arrowsKeysList.includes(e.code)) {
        e.keyCode = null;
    } else {
        switch (e.keyCode) {
            //enter
            case 13:
                // msg.message        = inputElement.value;
                msg.message        = inputElement.value ? inputElement.value : 'empty_string';
                inputElement.value = "";
                break;

            //numpad 8
            case 38:
            case 104:
                msg.message = 'north';
                break;
            //numpad 6
            case 39:
            case 102:
                msg.message = 'east';
                break;
            //numpad 2
            case 40:
            case 98:
                msg.message = 'south';
                break;
            //numpad 4
            case 37:
            case 100:
                msg.message = 'west';
                break;
        }
    }


    if (msg.message) {
        websocket.send(JSON.stringify(msg));
    }

}

// register the handler
document.addEventListener('keyup', onEnterKeyUp, false);

document.onkeydown = function (e) {
    if (e.which >= 96 && e.which <= 105) {
        return false;
    }
};

const xhrGetProfile = async function (bearer) {

    const fetchResponse = await fetch(
        url + bearer)
        .then(response => response.json())
        .catch(error => console.error('error:', error));

    // console.log('fetchResponse:');
    // console.log(fetchResponse);

    //базовый случай, когда токен принят сразу
    if (fetchResponse && fetchResponse.hasOwnProperty("user")) {

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
    //
    //     if (!isEmptyObject(user) && secondIteration === 1){
    //
    //         console.log('finally-got-user:');
    //
    //         newWebSocketConnection(user);
    //     }
    // });

    // console.log('------------перед if------------');

} else {
    document.location.href = '/login.html';
}


$(document).ready(function () {

    /**/
    // console.log('main-container HEIGHT:');
    // console.log($('#main-container').height());
    /**/

    // console.log($('#second-row').height());
    // console.log($('#main-panel-text div').height());

    // let height = $('#second-row').height();
    let height = $('#main-panel').height();

    // $('#main-panel-text div').height(height - 100);
    // $('#main-panel-text div').height(height - 50);
    //OK!!!
    // $('#main-panel-text div').height(height);
    $('#main-panel-text-finally').height(height);

    // console.log('height:');
    // console.log(height);

    //пошел коннект к сокет-серверу
    // if (!isEmptyObject(user)) {
    //     console.log('___________________________user !empty');
    //     console.log(user);
    // }

/**/
    // console.log('window.height()');
    // console.log(window.innerHeight);
/**/

});


$(document).on("click", "#send-main", function (event) {

    console.log('convertRemToPixels(2.5)');
    // console.log(convertRemToPixels(2.5));
    // var values = $(this).serialize();

    let message = {
        user: user,
    };

    let values = ['wwwww', 'asdasdasd'];

    $.ajax({
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
            $('#main-panel-text div').append('<text style="color:darkgreen">Adding more content here :)</text>' + "<br>");
            $('#main-panel-text div').append('Adding more content here :)' + "<br>");
        },
        // error  : function (jqXHR, textStatus, errorThrown) {
        //     console.log(textStatus, errorThrown);
        // }
    });


});
