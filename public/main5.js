const INPUT_HISTORY_UP = 1;
const INPUT_HISTORY_DOWN = -1;
const INPUT_HISTORY_LENGTH = 7;

let bearer = localStorage.getItem("token");
let url = 'http://mud-back/api/profile?token=';
let user = {};
let xhrGetProfileResult = 0;
let secondIteration = 0;

//?
let gameProcess = '';

let inputHistory = [];
let inputHistoryAux = [];
let isInputHistoryReading = 0;


/**
 * select color scheme block
 * @type {Node}
 */
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
//не катит
// let input = document.getElementById("main-input");
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

function isEmptyArray(array) {
    return !(typeof array !== 'undefined' && array.length > 0);
}

// function addToHistoryArray(historyArray, value) {
//     if (historyArray.length >= 7) {
//         historyArray.shift();
//     }
//     historyArray.push(value);
//     return historyArray;
// }

function addToHistoryArray(value) {
    //если новое значение равно последнему в массиве, игнор
    // if (inputHistory[inputHistory.length - 1] !== value) {
    //     if (inputHistory.length >= INPUT_HISTORY_LENGTH) {
    //         inputHistory.shift();
    //     }
    //     inputHistory.push(value);
    // }


    let key = inputHistory.indexOf(value);
    //found
    if (key !== -1) {
        inputHistory.splice(key, 1);
    } else if (inputHistory.length >= INPUT_HISTORY_LENGTH){
        inputHistory.shift();
    }
    inputHistory.push(value);

    console.log('------------------inputHistory:');
    console.log(inputHistory);
}


function getInputHistory(direction) {
    // это для того, чтобы не листать от пустой строки ввода
    isInputHistoryReading = 1;

    // if (direction === INPUT_HISTORY_UP) {
    //     //pop() method removes the last element of an array, and returns that element.
    //     let lastElem = inputHistory.pop();
    //     //Add new items to the beginning of an array:
    //     inputHistory.unshift(lastElem);
    // } else {
    //     //Remove the first item of an array. The return value of the shift method is the removed item
    //     let lastElem = inputHistory.shift();
    //     //push() method adds new items to the end of an array, and returns the new length.
    //     inputHistory.push(lastElem);
    // }

    inputHistoryAux = inputHistory;
    if (direction === INPUT_HISTORY_UP) {

        let lastElem = inputHistoryAux.pop();
        //Add new items to the beginning of an array:
        inputHistoryAux.unshift(lastElem);
    } else {
        //Remove the first item of an array. The return value of the shift method is the removed item
        let lastElem = inputHistoryAux.shift();
        //push() method adds new items to the end of an array, and returns the new length.
        inputHistoryAux.push(lastElem);
    }

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

        let msg = JSON.parse(ev.data);
        let umsg = msg.message;
        let uname = msg.name;
        let utime = msg.time;


        // console.log('*!*!*!*!*!*!*!onmessage*!*!*!*!*!*!*!');
        // console.log(msg);

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

                // document.getElementById('main-panel-text-finally').innerHTML = msg[messageKey] + innerHTML;
                // document.getElementById('main-panel-text-finally-span').innerHTML = msg[messageKey] + innerHTML;
                document.getElementById('main-panel-text-finally-span').innerHTML = innerHTML + msg[messageKey];

                break;
            case 1:
                console.log('1');
                ajaxLogin();
                break;
        }


    };
}

/**/
// document.addEventListener('copy', function(e){
//
//     // Нам необходимо предотвратить стандартное копирование,
//     // иначе все просто скопируется как обычно.
//     e.preventDefault();
//
//     // Событие не дает нам доступ к буферу поэтому
//     // нам надо добавить выделение с помощью Selection API.
//     var selection = window.getSelection().toString();
//
//     // Трансформируем выделенное как хотим
//     // В примере мы кодируем HTML код.
//     var escaped = escapeHTML(selection);
//
//     // Вставляем измененный текст в буфер.
//     e.clipboardData.setData('text/plain', escaped);
//
// });

/**/


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

    // console.log("onEnterKeyUp - inputElement");
    // console.log(inputElement);


    /**/
    // if(!inputElement.activeElement){
    //     console.log("не активен");
    //
    //     inputElement.value = (e.key);
    //     // inputElement.text = (e.key);
    //     inputElement.focus();
    // }

    // inputElement.onclick = function(e) {
    //     // if (!e.altKey || !e.shiftKey) return;
    //     console.log("КЛИК!!!!!!!!");
    //     alert( 'Ура!' );
    // };

    /**/

    let msg = {
        // message: inputElement.value,
        message: '',
        name: user.email,
        uuid: user.uuid
    };

    switch (true) {
        //enter
        case e.keyCode === 13:
            // msg.message = inputElement.value ? inputElement.value : 'empty_string';
            // addToHistoryArray(inputHistory, inputElement.value);

            if (inputElement.value) {
                msg.message = inputElement.value;

                console.log('msg.message');
                console.log(msg.message);

                // addToHistoryArray(inputHistory, msg.message);
                // addToHistoryArray(inputHistory, msg.message);
                addToHistoryArray(msg.message);
                isInputHistoryReading = 0;
            } else {
                msg.message = 'empty_string';
            }
            inputElement.value = "";

            break;
        //numpad 8
        case e.code.localeCompare('Numpad8') === 0 && (e.keyCode === 38 || e.keyCode === 104):
            msg.message = 'north';
            break;
        //numpad 6
        case e.code.localeCompare('Numpad6') === 0 && (e.keyCode === 39 || e.keyCode === 102):
            msg.message = 'east';
            break;
        //numpad 2
        case e.code.localeCompare('Numpad2') === 0 && (e.keyCode === 40 || e.keyCode === 98):
            msg.message = 'south';
            break;
        //numpad 4
        case e.code.localeCompare('Numpad4') === 0 && (e.keyCode === 37 || e.keyCode === 100):
            msg.message = 'west';
            break;
        //numpad 9
        case e.code.localeCompare('Numpad9') === 0 && (e.keyCode === 33 || e.keyCode === 105):
            msg.message = 'up';
            break;
        //numpad 3
        case e.code.localeCompare('Numpad3') === 0 && (e.keyCode === 34 || e.keyCode === 99):
            msg.message = 'down';
            break;

        //pageUp
        case e.code.localeCompare('PageUp') === 0 && e.keyCode === 33:
            document.getElementById("main-panel-text-finally").scrollBy(0, -500);
            break;
        //pageDown
        case e.code.localeCompare('PageDown') === 0 && e.keyCode === 34:
            document.getElementById("main-panel-text-finally").scrollBy(0, 500);
            break;

        //arrowUp
        case e.code.localeCompare('ArrowUp') === 0 && e.keyCode === 38:

            // console.log("this.value");
            // console.log(this);
            // console.log('inputHistory');
            // console.log(inputHistory);

            // getInputHistory(inputHistory);

            if (!isEmptyArray(inputHistory)) {
                e.preventDefault();
                getInputHistory(INPUT_HISTORY_UP);
                inputElement.value = inputHistory[0];
            }
            break;

        //ArrowDown
        case e.code.localeCompare('ArrowDown') === 0 && e.keyCode === 40:
            if (!isEmptyArray(inputHistory) && isInputHistoryReading === 1) {
                e.preventDefault();
                getInputHistory(INPUT_HISTORY_DOWN);
                inputElement.value = inputHistory[0];
            }

            break;

    }
    /**/

    if (msg.message) {
        // console.log("msg.message будет послано websocket.send");
        websocket.send(JSON.stringify(msg));
    }

}

/**/
// let getInputHistoryHandler = function (e) {
//     if (e.code.localeCompare('ArrowUp') === 0 && e.keyCode === 38) {
//         // console.log("this.value");
//         // console.log(this.value);
//         getInputHistory(inputHistory);
//         // let input = document.getElementById("main-input");
//         // input.value = inputHistory[0];
//         this.value = inputHistory[0];
//         e.preventDefault();
//     }
// };
/**/

// register the handler
// document.addEventListener('keyup', onEnterKeyUp, false);
document.addEventListener('keydown', onEnterKeyUp, false);

/**/
// document.getElementById('main-input').addEventListener('keydown', handler, false);
/**/


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
    // register the handler (чтобы курсор не прыгал)
    // document.getElementById('main-input').addEventListener('keydown', getInputHistoryHandler, false);
    /**/


    /**/
    // document.getElementById('main-input').addEventListener('keydown', handler, false);
    // document.getElementById('main-input').addEventListener('keypress', handler, false);
    /**/


    $(document).bind('copy', function () {
        // var text = window.getSelection().toString().replace(/[\n\r]+/g, '');
        var text = window.getSelection().toString();
        copyToClipboard(text);
    });

    // function copyToClipboard(text) {
    //
    //     console.log("text");
    //     console.log(text);
    //
    //     var textarea = document.createElement("textarea");
    //     // textarea.textContent = text;
    //
    //     /**/
    //     console.log("copyToClipboard");
    //     textarea.innerHTML = text;
    //     /**/
    //     textarea.style.position = "fixed";
    //     document.body.appendChild(textarea);
    //     textarea.select();
    //     try {
    //         return document.execCommand("cut");
    //     } catch (ex) {
    //         console.warn("Copy to clipboard failed.", ex);
    //         return false;
    //     } finally {
    //         document.body.removeChild(textarea);
    //     }
    // }

    /**/
    let card = document.getElementsByTagName('body')[0];

    //todo есть дублирование этого селекта.
    let input = document.getElementById("main-input");
    card.onmousedown = function (e) {
        input.removeAttribute('onblur');
    };
    card.onmouseup = function (e) {
        input.setAttribute('onblur', input.focus());
    };
    /**/

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
            $('#main-panel-text div').append('<text style="color:darkgreen">Adding more content here :)</text>' + "<br>");
            $('#main-panel-text div').append('Adding more content here :)' + "<br>");
        },
        // error  : function (jqXHR, textStatus, errorThrown) {
        //     console.log(textStatus, errorThrown);
        // }
    });


});
