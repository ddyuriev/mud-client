// let user = {1: 2};
// let promise = new Promise(function (resolve, reject) {
//     console.log(user);
// });

let bearer = localStorage.getItem("token");

let user = {1: 2};

// // function functABC() {
// //     return new Promise(function (resolve, reject) {
// //         $.ajax({
// //             url: "http://mud-back/api/profile?token=" + bearer,
// //             success: function (data) {
// //                 user = {1111111: 2222222};
// //                 resolve(data) // Resolve promise and go to then()
// //             },
// //             error: function (err) {
// //                 reject(err) // Reject the promise and go to catch()
// //             }
// //         });
// //     });
// // }
//
//
// async function loadJson(url) { // (1)
//     let response = await fetch("http://mud-back/api/profile?token=" + bearer); // (2)
//
//     if (response.status == 200) {
//         let json = await response.json(); // (3)
//
//         console.log('json');
//         console.log(json);
//
//         user = json;
//         return json;
//     }
//
//     throw new Error(response.status);
// }
//
// // loadJson('no-such-user.json')
// //     .catch(alert); // Error: 404 (4)
//
// // loadJson('no-such-user.json').finally(console.log('ssssssss'))
// loadJson().finally(console.log('ssssssss'))
//
//
// console.log('user');
// console.log(user);
//
// $(document).ready(function () {
//     // functABC().then(function (data) {
//     //     // Run this when your request was successful
//     //     console.log(data)
//     // }).catch(function (err) {
//     //     // Run this when promise was rejected via reject()
//     //     console.log(err)
//     // });
//
//
//
//
//
//     // console.log('user');
//     // console.log(user);
//
// });
//
//
class HttpError extends Error {
    constructor(response) {
        super(`${response.status} for ${response.url}`);
        this.name = 'HttpError';
        this.response = response;
    }
}

function loadJson(url) {
    return fetch(url)
        .then(response => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new HttpError(response);
            }
        })
}

// Запрашивать логин, пока github не вернёт существующего пользователя.
function demoGithubUser() {
    let name = prompt("Введите логин?", "iliakan");

    return loadJson(`https://api.github.com/users/${name}`)
        .then(user => {
            // alert(`Полное имя: ${user.name}.`);
            console.log(`Полное имя: ${user.name}.`);
            return user;
        })
        .catch(err => {
            if (err instanceof HttpError && err.response.status == 404) {
                // alert("Такого пользователя не существует, пожалуйста, повторите ввод.");
                console.log("Такого пользователя не существует, пожалуйста, повторите ввод.");
                return demoGithubUser();
            } else {
                throw err;
            }
        });
}

demoGithubUser();

    console.log('user');
    console.log(user);