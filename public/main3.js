let bearer = localStorage.getItem("token");
let url    = `http://mud-back/api/profile?token=`;

let myVar = 0;
let user  = {};

function newWebSocketConnection(user) {
    websocket        = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email);
    websocket.onopen = function (ev) {
        console.log('onopen, Вы подключены!');
    }
}

const xhrGetProfile = async function (bearer) {
    const fetchResponse = await fetch(
        url + bearer)
        .then(response => response.json())
        // .then(
        // json => console.log(json)
        // json => {
        //     return json
        // }
        // )
        .catch(error => console.error('error:', error));


    // const fetchResponse = await fetch(url + bearer).then((response) => {
    //     if (response.ok) {
    //         return response.json();
    //     } else {
    //         throw new Error('Something went wrong');
    //     }
    // })
    //     .then((responseJson) => {
    //         // Do something with the response
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     });

    // console.log('json');
    // console.log(json);

    console.log(fetchResponse);
    if (fetchResponse && fetchResponse.hasOwnProperty("code")){
        switch (fetchResponse.code) {
            case 0:
                console.log('case 0');

                refreshedToken = fetchResponse.refreshed_token;
                xhrGetProfile(refreshedToken).then(json => {
                    console.log('рефреш токена');
                    console.log('json:');
                    console.log(json);
                    // console.log('jsonRefreshed:');
                    // console.log(jsonRefreshed);
                    localStorage.setItem("token", refreshedToken);
                });

                break;
            case 1:
                console.log('1');
                ajaxLogin();
                break;
            case 2:
                console.log('2');
                document.location.href = '/login.html';
                break;
            case 3:
                console.log('3');
                ajaxLogin();
                break;
        }

    }

    myVar = fetchResponse;
};
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


if (bearer) {
    xhrGetProfile(bearer)
    // .then(json => {
    //     console.log('в блоке if bearer, json:');
    //     console.log(json);
    //
    //     console.log('typeof json');
    //     console.log(typeof json);
    //
    //     console.log(`json.hasOwnProperty("refreshed_token")`);
    //     console.log(json.hasOwnProperty("refreshed_token"));
    //
    //     console.log(`json.hasOwnProperty("user")`);
    //     console.log(json.hasOwnProperty("user"));
    //
    //     if (json.hasOwnProperty("user")) {
    //         user = json.user;
    //
    //         /**/
    //         websocket = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email);
    //
    //         websocket.onopen = function (ev) {
    //             // template('#system_msg', "td", ['Вы подключены!'])
    //             // uniqueId = genarationString();
    //             // userColor = genarationColor();
    //             console.log('onopen, Вы подключены!');
    //         }
    //     }
    //
    // })
} else {
    document.location.href = '/login.html';
}