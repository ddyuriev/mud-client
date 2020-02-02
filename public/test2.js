// let user = {1: 2};
// let promise = new Promise(function (resolve, reject) {
//     console.log(user);
// });

let bearer = localStorage.getItem("token");

let user = {1: 2};

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

    return loadJson(`http://mud-back/api/profile?token=` + bearer)
        .then(user => {
            // alert(`Полное имя: ${user.name}.`);
            // console.log(`Полное имя: ${user.name}.`);
            console.log(user);
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