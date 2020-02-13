let bearer = localStorage.getItem("token");
let url = `http://mud-back/api/profile?token=`;

let myVar = 0;
let user = {};

let jsonXXX = 0;

let fetchResponse2 = 0;
let xhrGetProfileResult = 0;


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
        console.log('onopen, Вы подключены!');
    }
}


const xhrGetProfile = async function (bearer) {
    let response = await fetch(url + bearer);

    console.log('перед response.ok');

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();
        console.log(json);
    } else {
        // alert("Ошибка HTTP: " + response.status);
        console.log("Ошибка HTTP: " + response.status);
    }
};

xhrGetProfile(bearer);

console.log('after all');


