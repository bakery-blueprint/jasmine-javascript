
  function delay(time, value) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, time, value);
    });
  }

  function last(promises) {
    return new Promise(function (resolve, reject) {
        var count = promises.length;
        var result = [];
        var index = 0;
        var checkDone = function () {       
            resolve(result[index-1]);
        };
  
        for(var i = 0;i<count;i++){
            promises[i].then(
               function(data){
                result.push(data);
                index++;
               },
               function () {
               }         
            ).then(checkDone);
        }
    });
  }
 

  function any(promises) {
    return new Promise(function (resolve, reject) {
        var count = promises.length;
        var result = [];
        var checkDone = function () {       
            resolve(result);
        };
  
        for(var i = 0;i<count;i++){
            promises[i].then(
               function(data){
                result.push(data);
               },
               function () {å
               }         
            ).then(checkDone);
        }
    });
  }
 
  
  last([delay(1, 'a'), delay(200, 'b'), delay(50, 'c'), delay(1000, 'd')]).then(
    function (msg) {
        console.log('last msg');
        console.log(msg);
    },
    function (error) {
        console.log('error');
        console.log(error);
    }
  ); 


   
  any([delay(1, 'a'), delay(200, 'b'), delay(50, 'c'), delay(1000, 'd')]).then(
    function (msg) {
        console.log('any msg');
        console.log(msg);
    },
    function (error) {
        console.log('error');
        console.log(error);
    }
  ); 
