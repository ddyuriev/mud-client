/* ES5, using Bluebird */
let isMomHappy = true;

let askMomVar = {};

// Promise
let willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            let phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            let reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);


// call our promise
let askMom = function () {

    // let askMomVar = {};

    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log('fulfilled');
            console.log(fulfilled);
            // askMomVar = {1:2};
            return fulfilled;
        })
        .catch(function (error) {
            // ops, mom don't buy it
            console.log(error.message);
        });

    // console.log(willIGetNewPhone.resolve(phone));

    console.log(willIGetNewPhone);

    console.log('return-------');
    // return willIGetNewPhone;
};

// askMom();

console.log(askMom());


// var p = Promise.resolve([1,2,3]);
// p.then(function(v) {
//     console.log(v[0]); // 1
// });
// console.log(p);