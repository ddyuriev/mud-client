// let bearer = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9tdWQtYmFja1wvYXBpXC9sb2dpbiIsImlhdCI6MTU3OTg3MTc1OSwiZXhwIjoxNTc5ODc1MzU5LCJuYmYiOjE1Nzk4NzE3NTksImp0aSI6InNuTUliakNoaUh2ZXlXZWkiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.uKMrVR21-TnXYj390bBmA8y4Bd0kT5zXPnx2KWdbLxE';

let bearer = localStorage.getItem("token");
let url = `http://mud-back/api/profile?token=`;

let user = {'start': 'val'};


function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

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

function ajaxProfile2(bearer) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://mud-back/api/profile?token=" + bearer,); // async=true
    xhr.onload = function (e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('ajaxProfile2');
            // console.log(xhr.responseText);
            console.log(xhr.response);

            user = xhr.response.user;
            $(".login-logout .btn").text(user.name.toLowerCase());
        }
    };
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {   //if complete
            if (xhr.status === 200) {  //check if "OK" (200)
                //success
            } else {
                // error_handle_function(); //otherwise, some other code was returned
                console.log('onerror- ajaxProfile2');
                console.log(xhr.response);
            }
        }
    };
    xhr.send(null);
}

function ajaxProfile3(/*method, url*/) {

    // user = {1: 2};
    return new Promise(function (resolve, reject) {

        console.log('Promise - user');
        // console.log(Promise.resolve(user));
        console.log(user);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://mud-back/api/profile?token=" + bearer,); // async=true
        xhr.onload = function (e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log('ajaxProfile3');
                // console.log(xhr.responseText);
                // console.log(typeof(xhr.responseText));
                // console.log(typeof(xhr.response));
                // console.log(typeof(xhr.responseXML));
                // console.log(xhr.response);
                // console.log(xhr.responseXML);
                // user = xhr.response.user;

                console.log('user - onload');
                console.log(user);

                let requestObj = JSON.parse(xhr.responseText);
                user = requestObj.user;

                console.log('start_user - onload2:');
                console.log(user);
                console.log('end_user - onload2:');
                $(".login-logout .btn").text(user.name.toLowerCase());
            }
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {   //if complete
                if (xhr.status === 200) {  //check if "OK" (200)
                    //success
                } else {
                    // error_handle_function(); //otherwise, some other code was returned
                    console.log('onerror- ajaxProfile2');
                    console.log(xhr.response);
                }
            }
        };
        xhr.send();
    });
}


async function xhrGetProfile(bearer) {
    // const response = await fetch(url, {mode: 'cors'});
    const response = await fetch(url + bearer);
    const json = await response.json();

    // console.log('xhrGetProfile - json');
    // console.log(json);

    let responseCode = json.code;


    // if (json.hasOwnProperty("user")) {
    //
    //     let userPromise = new Promise(function(resolve, reject) {
    //         // Эта функция будет вызвана автоматически
    //
    //         // В ней можно делать любые асинхронные операции,
    //         // А когда они завершатся — нужно вызвать одно из:
    //         // resolve(результат) при успешном выполнении
    //         // reject(ошибка) при ошибке
    //
    //         console.log('userPromise - основное тело - json:');
    //         console.log(json);
    //     })
    // }


    // console.log('responseCode');
    // console.log(responseCode);
    switch (responseCode) {
        case 0:
            console.log('case 0');
            // ajaxProfile(response.refreshed_token);
            // localStorage.setItem("token", response.refreshed_token);

            // ajaxProfile(jqXHR.responseJSON.refreshed_token);
            // localStorage.setItem("token", jqXHR.responseJSON.refreshed_token);

            // xhrGetProfile(json.refreshed_token).then(jsonRefreshed => {
            //     // console.log('рефреш токена');
            //     // console.log('json:');
            //     // console.log(json);
            //     // console.log('jsonRefreshed:');
            //     // console.log(jsonRefreshed);
            //     localStorage.setItem("token", json.refreshed_token);
            // });

            refreshedToken = json.refreshed_token;
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
            // ajaxLogin();
            // document.location.href = '/login.html';
            document.location.href = '/login.html';
            break;
        case 3:
            console.log('3');
            ajaxLogin();
            break;
    }

    // console.log('перед return');
    // console.log(json);
    // console.log(jsonRefreshed);

    return json;
}


if (bearer) {
    // xxx =
        xhrGetProfile(bearer)
        .then(json => {
            console.log('в блоке if bearer, json:');
            console.log(json);

            console.log('typeof json');
            console.log(typeof json);

            console.log(`json.hasOwnProperty("refreshed_token")`);
            console.log(json.hasOwnProperty("refreshed_token"));

            console.log(`json.hasOwnProperty("user")`);
            console.log(json.hasOwnProperty("user"));

            //делаем промис
            // if (json.hasOwnProperty("user")) {
            //
            //     let userPromise = new Promise(function(resolve, reject) {
            //         // Эта функция будет вызвана автоматически
            //
            //         // В ней можно делать любые асинхронные операции,
            //         // А когда они завершатся — нужно вызвать одно из:
            //         // resolve(результат) при успешном выполнении
            //         // reject(ошибка) при ошибке
            //
            //         console.log('userPromise - json:');
            //         console.log(json);
            //     })
            // }

            user = json;
        })
    // .then(json => {
    //     console.log('в блоке if bearer2, json:');
    //     console.log(json);
    // })
    // .finally(json => {
    //     console.log('в блоке if bearer,finally  json:');
    //     console.log(json);
    // })
        //тоже самое
        // .then(function (fulfilled) {
        //     // yay, you got a new phone
        //     console.log(fulfilled);
        // })

    // console.log('xxx');
    // console.log(xxx);
} else {
    document.location.href = '/login.html';
    // ajaxLogin();
}

// console.log(user.start);

// setTimeout(function () {
//     console.log('user.start == val');
// }, 1000);

// while (user.start == 'val') {
//     setTimeout(function () {
//         console.log('user.start == val');
//     }, 1000);
// }

// timerId = setTimeout(function go() {
//
//     console.log('_______started: ');
//     console.log(user);
//
//     setTimeout(go, 1000/* + i * 100*/);
//
// }, 5000);


// userPromise
//     .finally(function (fulfilled) {
//         // yay, you got a new phone
//         console.log(fulfilled);
//     })

$(document).ready(function () {

    // if (bearer) {
    //     ajaxProfile(bearer);
    //     // ajaxProfile2(bearer);
    //     // ajaxProfile3().then(function(response) {
    //     //     console.log('response');
    //     //     console.log(response);
    //     //     user = {5:67};
    //     // });
    //     // ajaxProfile3().then(response =>
    //     //     console.log('dddddddddddddddddddd')
    //     // );
    // } else {
    //     document.location.href = '/login.html';
    // }

    // console.log($('#second-row').height());
    // console.log($('#main-panel-text div').height());

    // let height = $('#second-row').height();
    let height = $('#main-panel').height();

    // $('#main-panel-text div').height(height - 100);
    // $('#main-panel-text div').height(height - 50);
    $('#main-panel-text div').height(height);

    //пошел коннект к сокет-серверу

    // console.log('___________________________user-end');
    // console.log(user);
    return;

    if (!isEmptyObject(user)) {
        console.log('user');
        console.log(user);
        // websocket = new WebSocket("ws://127.0.0.1:8000");
        /**/
        websocket = new WebSocket("ws://127.0.0.1:8000/?user=" + user.email);
        /**/

        websocket.onopen = function (ev) {
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

    console.log('convertRemToPixels(2.5)');
    console.log(convertRemToPixels(2.5));
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

