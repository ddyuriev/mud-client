let bearer = localStorage.getItem("token");
let url    = `http://mud-back/api/profile?token=`;


// const response = await fetch(
//     url + bearer)
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(error => console.error('error:', error));
//
//
// console.log('fetch');
// console.log(fetch);

let myVar = 0;
let user = 0;

const start = async function () {
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

    // console.log('json');
    // console.log(json);

    console.log(fetchResponse);

    myVar = fetchResponse;

    // return response;
};
start();


timerId = setTimeout(function go() {
    console.log('myVar: ');
    console.log(myVar);
    // setTimeout(go, 1000);

    if (!myVar.hasOwnProperty("user")){
        setTimeout(go, 1000);
    }

    if (myVar.hasOwnProperty("user")) {
        console.log('clearTimeout: ');
        console.log(timerId);
        clearTimeout(timerId);
        user = myVar.user;
        myVar=0;
    }

}, 2000);


setTimeout(
    function () {
        // alert("Hello");
        console.log('Hello: ');
        console.log(timerId);
        // clearTimeout(1);
        console.log(user);

    },
    10000);

// let x = start();
// console.log(x);


// !async function(){
//     let data = await fetch("https://raw.githubusercontent.com/IbrahimTanyalcin/LEXICON/master/lexiconLogo.png")
//         .then((response) => response.blob())
//         .then(data => {
//             return data;
//         })
//         .catch(error => {
//             console.error(error);
//         });
//
//     console.log(data);
// }();



// let ii = 0;
// const fetchResponse2 = fetch(url + bearer)
//     .then(
//         function(response) {
//             if (response.status !== 200) {
//                 console.log('Looks like there was a problem. Status Code: ' +
//                     response.status);
//                 return;
//             }
//             ii = 53;
//
//             // Examine the text in the response
//             response.json().then(function(data) {
//                 console.log(data);
//                 ii = data;
//             });
//         }
//     )
//     .catch(function(err) {
//         console.log('Fetch Error :-S', err);
//     });
//
// console.log(fetchResponse2);
// console.log(ii);
//
// timerId = setTimeout(function go() {
//     console.log('_______ii: ');
//     console.log(ii);
//     setTimeout(go, 1000/* + i * 100*/);
// }, 5000);
