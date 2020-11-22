function any(promises) {
  return new Promise(function (resolve, reject) {
      var count = promises.length;
      var result = [];
      var checkDone = function () {
          if (1 === result.length) resolve(result);
      };
      promises.forEach(function (p, i) {
          p.then(
              function (x) {
                result.push(x);
              },
              function (x) {
              }
          ).then(checkDone);
      });
  });
}

function last(promises) {
  return new Promise(function (resolve, reject) {
      var count = promises.length;
      var result = [];
      var checkDone = function () {
          if (1 === result.length) resolve(result);
      };

      for (var i = promises.length -1 ; i >= 0; i--) {
        promises[i].then(
          function (x) {
            result.push(x);
          },
          function () {
          }
        ).then(checkDone);
      }
  });
}

function resolveDelay(time, value) {
  return new Promise(function (resolve, reject) {
      setTimeout(resolve, time, value);
  });
}

function rejectDalay(time, value) {
  return new Promise(function (resolve, reject) {
      setTimeout(reject, time, value);
  });
}

any([rejectDalay(1, 'a'), resolveDelay(200, 'b'), resolveDelay(50, 'c'), rejectDalay(1000, 'd')]).then(
  function (msg) {
      console.log('msg');
      console.log(msg);
  },
  function (error) {
      console.log('error');
      console.log(error);
  }
);

last([rejectDalay(1, 'a'), resolveDelay(200, 'b'), resolveDelay(50, 'c'), rejectDalay(1000, 'd')]).then(
  function (msg) {
      console.log('msg');
      console.log(msg);
  },
  function (error) {
      console.log('error');
      console.log(error);
  }
);