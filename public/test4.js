// class HttpError extends Error {
//     constructor(response) {
//         super(`${response.status} for ${response.url}`);
//         this.name = 'HttpError';
//         this.response = response;
//     }
// }


let bearer = localStorage.getItem("token");
let url = `http://mud-back/api/profile?token=`;

// let user = {1: 2};

async function xhrGetProfile(bearer) {
    // const response = await fetch(url, {mode: 'cors'});
    const response = await fetch(url + bearer);
    const json = await response.json();

    console.log('xhrGetProfile - json');
    console.log(json);


    let responseCode = json.code;

    // console.log('responseCode');
    // console.log(responseCode);
    switch (responseCode) {
        case 0:
            console.log('case 0');
            // ajaxProfile(response.refreshed_token);
            // localStorage.setItem("token", response.refreshed_token);

            // ajaxProfile(jqXHR.responseJSON.refreshed_token);
            // localStorage.setItem("token", jqXHR.responseJSON.refreshed_token);

            xhrGetProfile(json.refreshed_token).then(jsonRefreshed => {
                console.log('рефреш токена');
                console.log(json);
                localStorage.setItem("token", json.refreshed_token);
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
    // return json.user.name.concat(' ').concat(json.user.email);
    return json;
}

// xhrGetProfile().then(json => {
//     console.log(json);
// })

//     .catch(err => {
//
//     console.log('err');
//     console.log(err.response.status);
//
//     if (err instanceof HttpError && err.response.status == 404) {
//         alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
//         return demoGithubUser();
//     } else {
//         throw err;
//     }
// });

// .catch(function (err) {
//     // Run this when promise was rejected via reject()
//     // console.log(typeof err);
//     console.log(err.toString())
// });


// .then(response => response.text())
//     .then(contents => console.log(contents))
//     .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

// console.log('after all - user');
// console.log(user);


if (bearer) {
    xhrGetProfile(bearer).then(json => {
        console.log('в блоке if bearer, json:');
        console.log(json);
    })
} else {
    document.location.href = '/login.html';
    // ajaxLogin();
}