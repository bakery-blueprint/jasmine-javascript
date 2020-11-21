unction resolvePromise(time, value) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, time, value)
  })
};

function rejectPromise(time, value) {
  return new Promise(function(resolve, reject) {
    setTimeout(reject, time, value)
  })
};

function any(promises) { 
  return new Promise(function(resolve, reject) {
    var result = []
    promises.forEach(function(p) {
      p.then(
        function(x) {
          result.push(x)
        },
        function(){}
      ).then( 
        function() {
          resolve(result)
        }
      )
    })
  })
};

any([rejectPromise(1, 'a'), rejectPromise(200, 'b'), resolvePromise(50, 'c'), rejectPromise(1000, 'd')]).then(
  function (msg) {
      console.log('msg');
      console.log(msg);
  },
  function (error) {
      console.log('error');
      console.log(error);
  }
);

function last(promises) {
  return new Promise(function(resolve, reject) {
    var count = 0
    var result = ''
    var checkDone = function() {
      if (count === promises.length) resolve(result);
    }
    promises.forEach(function(p,index) {
      p.then(
        function(x) {
          count++;
          result = x
        },
        function(x) {
          count++;
        }
      ).then(checkDone)
    })
  })
};

last([rejectPromise(1, 'a'), resolvePromise(200, 'b'), resolvePromise(50, 'c'), resolvePromise(1000, 'd')]).then(
  function (msg) {
      console.log('msg');
      console.log(msg);
  },
  function (error) {
      console.log('error');
      console.log(error);
  }
);
