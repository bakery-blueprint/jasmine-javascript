function delay(time, value) {
    return new Promise(function (resolve, reject) {
        setTimeout(reject, time, value);
    });
}


function last(promises) {
    return new Promise(function(resolve,reject) {
        var count = promises.length;
        var result = [];
        var endCount = 0;
        var checkDone = function(){
            if (endCount == count && result.length > 0){
                resolve(result[result.length-1])
            }
        }
        promises
        .forEach(function(p, i) {
            p.then(function(x){
                endCount++;
                result.push(x)
            }, function(err){
                endCount++
            })
            .then(checkDone)
        })
    })
}

function any(promises) {
    return new Promise(function(resolve,reject) {
        var count = promises.length;
        var result = [];
        var endCount = 0;
        promises.forEach(function(p, i) {
            p.then(function(x) {
                endCount++;
                result.push(x)
            },function(err){
                endCount++;
            })
            .finally(function(){
                if (endCount == count && result.length > 0){
                    resolve(result);
                }
            })
        })
    })
}
  


last([
    delay(100, 'a'),
    delay(200, 'b'),
    delay(50, 'c'),
    delay(1000, 'd')
  ])
  .then(console.log, console.error) // [ a, b, c, d ]


any([
    delay(100, 'a'),
    delay(200, 'b'),
    delay(50, 'c'),
    delay(1000, 'd')
  ])
  .then(console.log, console.error) // [ a, b, c, d ]
