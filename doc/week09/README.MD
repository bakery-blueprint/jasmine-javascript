# 프라미스

## 3.1 프라미스란?
- 자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다. 하지만 전통적인 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는 데도 한계가 있다.

- ES6에서는 비동기 처리를 위한 또 다른 패턴으로 프로미스(Promise)를 도입했다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.

### 3.1.1 미래값

- 숫자 계산 등 어떤 값을 내는 코드를 짤 때 우리는 그 값이 지금 존재하는 구체적인 값이라는 가정을 함.

```javascript
  var x, y = 2;
  console.log(x + y); //NaN
```

- x에도 값이 있고, y에도 값이 준비되어있을 때 덧셈하도록 하려면 두 값 모두 나중으로 만들어 비동기화 하면 됨.

```javascript
  function add(getX, getY, cb) {
    var x, y;
    getX(function(xVal) {
      x = xVal;
      if (y != undefined) {
        cb(x + y);
      }
    });

    getY(function(yVal) {
      y = yVal;
      if (x != undefined) {
        cb(x + y);
      }
    });
  }
  add(fetchX, fetchY, function(sum) {
    console.log(sum);
  })
```

> 프라미스 값
```javascript
  function add(xPromise, yPromise) {
    return Promise.all([xPromise, yPromise])
    .then(function(values) {
      return values[0] + values[1];
    })
  }

  add(fetchX(), fetchY())
  .then(function(sum) {
    console.log(sum);
  })
```
- fetchX()와 fetchY()를 직접 호출하여 반환 값(프라미스)를 add()에 전함.
- Promise.all 는 프라미스 배열을 인자로 받아 프라미스들이 모두 귀결될 때까지 기다렸다가 새 프라미스를 만들어서 반환하는 함수로 프라미스가 귀결되면 then에서 x와 y  값을 받아서 더한다. 이때 values는 두 프라미스에서 건내준 메시지 배열.
- 새 프라미스가 반환되면, add 호출부에서 두 숫자의 합이 담긴 프라미스를 받아 then에서 console.log를 출력.

> 이룸함수, 버림함수
- 프라미스 then() 함수는 이름함수를 첫 번째 인자로, 버림함수를 두번째 인자로 각각 넘겨받음
- 이룸은 귀결 값을 프로그램이 결정짓지만, 버림값은 프로그램 로직에 따라 직접 세팅되거나 런타임 예외에 의해 암시적으로 생겨나기도 함
```javascript
  add(fetchX(), fetchY())
  .then(
    function(sum) { // 이룸함수
      console.log(sum);
    },  
    function(err) { // 버림함수
      console.err(err);
    }
  )
```

### 3.1.2 완료이벤트
- 프라미스 각각은 미랫값으로서 작동하지만 프라미스의 귀결은 비동기 작업의 여러단계를 흐름제어(시간적으로 이것 다음 저것)하기 위한 체계라고 볼 수 있음.

- 어떤 작업을 하려고 foo()를 부르면 작업 내용은 구체적으로 알필요가 없고, 다음 단계로 진행 할 수 있게끔 foo()의 완료상태를 알 수 있는 listener가 있으면됨.
- foo애 콜백함수를 넘겨주는 대신 foo()가 evt라는 이벤트 구독기를 반환하고, 여기에 콜백함수를 넣음.
```javascript
  function foo(x) {
    // 여러 작업 중
    return listener;
  }

  var evt = foo(42);
  evt.on("complete", function() {
    // 다음 단계 진행.
  });
  evt.on("failure", function() {
    // foo에서 뭔가 잘못되었음.
  });

  // 관심사 분리하여 bar, baz는 foo()에 끼어들 필요도 없고 foo()도 bar, baz가 있거나 말거나 함, evt 객체가 분리된 관심사 간의 중재자 역할을 수행.
   bar(evt);
   baz(evt);
```

> 프라미스 '이벤트'
 - 위의 listener와 비슷한 프라미스
```javascript
  function foo(x) {
    //뭔가 로직이 있고,

    // 프라미스 생성하여 반환
    return new Promise(function(resolve, reject) {
      // 결과적으로 resolve, reject 중 한쪽을 호출하게 되고, 이들은 프라미스의 귀결 콜백함수 역할을 하게됨.
    })
  }

  var p = foo(42);
  bar(p);

  function bar(fooPromise) {
    // foo의 완료 여부를 리스닝
    fooPromise.then(
      function() {
        // foo는 이제 bar의 작업을 한다.
      },
      function() {
        // foo에 뭔가 에러가 있음
      }
    )
  }
```
- 무조건 bar 호출

```javascript
  function bar() {
    // foo()의 작업이 확실 히 끝났으므로 bar()의 작업을 함.
  }

  function oppsBar() {
    // foo()의 작업이 뭔가 잘못되어 bar()는 실행되지 않는다.
  }

  var p = foo(42);
  p.then(bar, oppsBar);

```
- foo() 성공 시에만 bar()를 호출하고 foo() 실행이 실패할 경우엔 oppsBar() 함수를 호출.


## 데너블 덕 타이핑
- 프라미스인지 아닌지는 어떻게 판별할 수 있을까? ES6 이외의 라이브러리에서는 고유의 방법으로 프라미스를 사용하기도 함.
- 프라미스는 then() 메서드를 가진 데너블이라는 객체 또는 함수를 정의하여 판별하는 것으로 규정됨. 데너블에 해당하는 값은 무조건 프라미스 규격에 맞다고 간주함.
```javascript
  Object.prototype.then = function() {};
  Array.prototype.tnen = function() {};

  var v1 = {hello : "world"};
  var v2 = ["hello", "world"];
```
- v1, v2 둘다 데너블임.
- ES6 이전 커뮤니티를 통해 배포된 프라미스와 무관한 유명 라이브러리에 우연히 then()이라는 이름의 메서드가 사용된 적이 있는데, 충돌을 피하려고 나중에 메서드 명을 변경하긴 했지만 변경하지 못한 라이브러리는 프라미스와 같이 사용할 수 없었음...


## 프라미스 믿음

> ### 너무 빨리 콜백 호출
- 같은 작업인데도 어떨때는 동기적으로 어떨때는 비동기적으로 동작하는 콜백 문제
- 프라미스는 바로 이루어져도 프라미스의 정의상 동기적으로 볼 수 없으며, then()을 호출하면 프라미스가 이미 귀결된 이후라 해도 then()에 건넨 콜백은 항상 비동기적으로만 부르만 부름.

> ### 너무 늦게 콜백 호출
- 프라미스 then()에 등록한 콜백은 새 프라미스가 생성되면서 resolve(), reject() 중 어느 한쪽은 자동호출하도록 스케줄링 된다. 이렇게 스케줄링된 두 콜백은 다음 비동기 시점에 예상대로 실행될 것이다.
- 프라미스가 귀결되면 then()에 등록된 콜백들이 그다음 비동기 기회가 찾아왔을 때 순서대로 실행되며 어느 한 콜백 내부에서 다른 콜백의 호출에 영향을 주거나 지연시킬 일은 있을 수 없음.

```javascript
  p.then(function() {
    p.then(function() {
      console.log("C");
    });
    console.log("A");
  });
  p.then(function() {
    console.log("B");
  });
  // A, B, C
```
- 프라미스 작동 원리 덕분에 "C"가 툭 끼어들어 "B"를 앞지를 가능성은 없음

- 별개의 두 프라미스에서 연쇄된 콜백 사이의 상대적인 실행순서는 장담할 수 없음
```javascript
  var p3 = new Promise(function (resolve, reject) {
    resolve("B");
  });

  var p1 = new Promise(function(resolve, reject) {
    reslove(p3);  // 즉시값으로 귀결되지 않고, 다른프라미스 p3로 귀결
  });

  p2 = new Promise(function(resolve, reject) {
    resolve("A");
  });

  p1.then(function(v) {
    console.log(v);
  });

  p2.then(function(v) {
    console.log(v);
  });

  // A B 
```
- p1은 즉시값으로 귀결되지 않고, 다른프라미스 p3로 귀결되고 p3는 다시 "B"로 귀결, 이때 p3는 p1으로 비동기적으로 풀리므로 p1 콜백은 p2 콜백보다 비동기 잡 큐에서 후순위로 밀려나게됨.

> ### 3.3.3 한번도 콜백을 안호출
- 이룸/버림 콜백이 프라미스에 모두 등록된 상태라면 프라미스 귀결 시 둘 중 하나는 반드시 부름.

> ### 3.3.4 너무 가끔, 너무 종종 호출
- 콜백 호출 횟수는 당연히 한번이며, 너무 가끔은 0번 부른다는 뜻으로 앞절의 내용 처럼 프라미스 귀결 시 이룸/버림 둘중 하나는 반드시 호출됨.
- 프라미스는 정의상 단 한번만 귀결되므로, 어떤 이유로 프라미스 생성 코드가 resolve(), reject() 중 하나 또는 모두를 여러 차례 호출하려고 하면 프라미스는 오직 최초의 귀결만 취하고 이후의 시도는 조용히 무시됨.

> ### 3.3.5 인자/환경 전달 실패
- 프라미스 귀결 값(이룸/버림)은 딱 하나 뿐.
- 명시적인 값으로 귀결되지 않으면 그 값은 undefined로 세팅되며, 값이야 어떻든간에 지금이든, 나중이든 프라미스는 모두 등록한 콜백으로 반드시 전해짐.
- resolve(), reject()함수를 부를 때 인자를 여러 개 넘겨도 두번째 이후 인자는 그대로 무시하며 값을 여러개 넘기고 싶다면 배열이나 객체로 꼭 감싸야 함.

> ### 3.3.6 에러/예외 삼키기
- 에러 메시지로 프라미스를 버리면 그 값은 버림 콜백으로 전달되며 프라미스가 생성 중 또는 귀결을 기다리는 도중 언제라도 TeypError, ReferencdError 등의 자바스크립트 에러가 나면, 예외를 잡아 주어진 프라미스를 강제로 버림
```javascript
  var p = new Promise(function(resolve, reject) {
    foo.bar();    // foo는 정의된 바 없으니 에러가 난다.
    resolve(42);  // 실행되지 않는다.
  });

  p.then(
    function fulfilled() {
      // 실행되지 않는다.
    },
    function rejected(err) {
      // foo.bar() 줄에서 에러가 나므로 err는 TypeError 예외 객체
    }
  )
```
```javascript
  var p = new Promise(function(resolve, reject) {
    resolve(42);  
  });

  p.then(
    function fulfilled(msg) {
      foo.bar();        // foo는 정의된 바 없으니 에러가 난다.
      console.log(msg); // 실행되지 않음.
    },
    function rejected(err) {
      // 실행 안됨!
    }
  )
```
- 귀결 상태를 감지하는 코드에서 에러가 나도 그 상태를 버림으로 바꿀 수는 없음.

> ### 3.3.7 미더운 프라미스
- Promise.resolve와 Promise.reject 메소드는 존재하는 값을 Promise로 래핑하기 위해 사용
- 정적 메소드 Promise.resolve 메소드는 인자로 전달된 값을 resolve하는 Promise를 생성
- 248p

```javascript
  var p1 = new Promise(function(resolve, reject) {
    resolve(42);
  });
  var p2 = Promise.resolve(42);
```


## 3.4 연쇄 흐름
- 프라미스는 장난감 블록 같아서 여러 개를 길게 늘어놓으면 일련의 비동기 단계를 나타낼 수 있다.

> 프라미스에 내재된 다음 두가지 작동 방식.
- 프라미스에 then()을 부를때마다 생성하여 반환하는 새 프라미스를 계속 연쇄할 수 있다.
- then()의 이룸 콜백 함수 가 반환한 값은 어떤 값이든 자동으로 연쇄된 프라미스의 이룸으로 세팅된다.

```javascript
  var p = Promise.resolve(21);
  p.then(function(v) {
    console.log(v);
    return v * 2; //연쇄된 프라미스를 이룸
  })
  .then(function(v) { //프라미스 연쇄
    console.log(v); // 42
  })
```
- 위예제는 비동기가 아닌가..?
- 프라미스 시퀀스가 각 단계마다 진짜 비동기적으로 작동하게 만드는 핵심은 Promise.resolve()에 넘긴 값이 어떤 최종값이 아닌 프라미스/데너블일 때 Promise.resolve()의 작동 로직이다. Promise.resolve()는 진짜 프라미스를 받으면 도로 뱉어내며, 데너블을 받으면 일단 한번 풀어보고, 아니면 원하는 값이 나올때까지 재귀적으로 계속 풀어봄.

```javascript
  var p = Promise.resolve(21);
  p.then(function(v) {
    console.log(v);
    // 프라미스를 생성하여 반환
    return new Promise(function(resolve, reject) {
      resolve(v * 2);   // 결과값 42 이룸
    });
  })
  .then(function(v) { //프라미스 연쇄
    console.log(v); // 42
  })
```
- 42값을 반환하는 프라미스로 감쌌지만 어차피 연쇄된 프라미스의 귀결 시 다시 풀어보므로 두번째 then이 받는 값은 여전히 42

```javascript
  var p = Promise.resolve(21);
  p.then(function(v) {
    console.log(v);
    // 프라미스를 생성하여 반환
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(v * 2);   // 결과값 42 이룸
      }, 100)
    });
  })
  .then(function(v) { //프라미스 연쇄
    // 이전단계에서 100ms 있다가 실행
    console.log(v); // 42
  })
```
- 비동기성을 부여해도 작동방식은 동일함.

```javascript
// 프라미스-인식형 AJAX 
  function request(url) {
    return new Promise( function(resolve,reject){
      ajax( url, resolve );  // ’ajax( )' 콜백이 이 프라미스의 'resolve( )‘ 함수
  } );

  request( "http://some.url.1/" )
  .then( function(response1){
    return request( "http://some.url.2/?v=" + response1 );
  })
  .then( function(response2){
    console.log( response2 );
  } );
```
-  첫번째 URL을 요청하여 연쇄 1단계를 암시적으로 생성하고 첫번째 then에서 만들어진 프라미스를 연쇄
- response1에서 값을 받으면 그 값을 활용하여 두번째 request 요청험
- 두번째 request()프라미스가 넘어오고 3단계에서 AJAX 호출이 끝나기만을 기다리며, response2가 당도하면 출력함
- 프라미스 연쇄는 다단계비동기 시퀀스에서 흐름제어 뿐만 아니라 단계와 단계사이 메시지를 전달하는 채널로도 쓰임
- 프라미스에서 문제가 발생하면? 에러/예외는 프라미스 단위로 한정되므로 전체 연쇄 어느 곳에서 난 에러라도 모두 잡아 바로 그 지점부터 ‘리셋Reset’을 하여 연쇄를 다시 정상 가동시킴. (p265)

```javascript
  var p = new Promise( function(resolve,reject){
    reject( "허걱" );
  } );
  var p2 = p.then(
    function fulfilled(){
    // 실행되지 않는다.
    }
  // 버림 처리기가 생략되거나 함수 아닌 다른 값이 전달되면 
  // 다음과 같은 버림 처리기가 있다고 가정하여 처리한다.
  // function(err) { // throw err;
  // } 
  );

  var p = Promise.resolve( 42 ); 
  p.then(
    // 이룸 처리기가 생략되거나 함수 아닌 다른 값이 넘어오면 
    // 다음과 같은 이룸 처리기가 있다고 가정하여 처리한다.
    // function(v) { 
    //  return v;
    // }
    null,
    function rejected(err){
    // 실행되지 않는다.
    } 
  )
```
- 이룸/버림을 처리하지 않으면 있다고 가정하여 기본으로 처리함.

## 3.4.1 용어 정의 : 귀결, 이룸, 버림
- 이룸 : 수행 성공,
- 버림 : 수행 실패 
- 귀결 : 이룸 아니면 버림
