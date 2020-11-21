//https://ko.javascript.info/async-await
  var a = 20;
  async function foo(){
    function sleep(ms) {
        return new Promise(
          resolve => setTimeout(resolve, ms)
        );
    }
    await sleep(1000);
    a = a + 1;
    console.log("foo " + a);
  }
  function bar(){
     a = a * 2;
     console.log("bar " + a);
  }
  foo();
  bar();
