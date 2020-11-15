// // function ajax(url, success, fail) {
// //     if (url.includes('naver')) {
// //         fail('500');
// //     } else {
// //         success('200');
// //     }
// // }

// // function request(url) {
// //     return new Promise(function (resolve, reject) {
// //         ajax(url, resolve, reject);
// //     });
// // }

// // request('https://www.naver.com/')
// //     .then(
// //         function (res) {
// //             console.log('res');
// //             console.log(res);
// //         },
// //         function (err) {
// //             console.log('err');
// //             console.log(err);
// //             throw err;
// //         }
// //     )
// //     .then(
// //         function (res) {
// //             console.log('res');
// //             console.log(res);
// //         },
// //         function (err) {
// //             console.log('err');
// //             console.log(err);
// //         }
// //     );

// function foo() {
//     setTimeout(function () {
//         throw 'err!!!!!!!!!!';
//     }, 100);
// }

// try {
//     foo();
// } catch (err) {
//     // ? 과연?
//     console.log('err');
//     console.log(err);
// }
// var p = Promise.resolve(42);

// p.then(function fulfillen(msg) {
//     console.log(msg.toLowerCase());
// })
//     .then(
//         function () {},
//         function (err) {
//             throw 'error1';
//         }
//     )
//     .catch(function (err2) {
//         console.log(err2);
//         throw 'error2';
//     })
//     .catch(function (err3) {
//         console.log(err3);
//         throw 'error3';
//     });
// process.on('unhandledRejection', function (err, promise) {
//     console.error(
//         'Unhandled rejection (promise: ',
//         promise,
//         ', reason: ',
//         err,
//         ').'
//     );
// });

// var p = Promise.reject(43).defer();

// function timeoutPromise(delay) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(() => {
//             reject('error! timeout!');
//         }, delay);
//     });
// }

// function foo() {
//     return new Promise(function (resolve, reject) {
//         setTimeout(() => {
//             resolve('success!!');
//         }, 200);
//     });
// }

// Promise.race([timeoutPromise(3000), foo()]).then(
//     function (msg) {
//         console.log(msg);
//     },
//     function (err) {
//         console.log(err);
//     }
// );
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(resolve, 500, 'one');
// });

// const promise2 = new Promise((resolve, reject) => {
//     setTimeout(reject, 100, 'two');
// });

// Promise.race([promise1, promise2]).then(
//     (value) => {
//         console.log(value);
//     },
//     (err) => {
//         console.log(err);
//     }
// );

function none(promises) {
    return new Promise(function (resolve, reject) {
        var count = promises.length;
        var result = [];
        var checkDone = function () {
            if (count === result.length) resolve(result);
        };
        promises.forEach(function (p, i) {
            p.then(
                function () {},
                function (x) {
                    result.push(x);
                }
            ).then(checkDone);
        });
    });
}

function delay(time, value) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject, time, value);
    });
}

none([delay(1, 'a'), delay(200, 'b'), delay(50, 'c'), delay(1000, 'd')]).then(
    function (msg) {
        console.log('msg');
        console.log(msg);
    },
    function (error) {
        console.log('error');
        console.log(error);
    }
);
