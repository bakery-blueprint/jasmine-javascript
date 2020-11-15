## 3.5 에러 처리

-   try-catch 문은 비동기에서 정상작동하지 않을수 있다.

```javascript
function foo() {
    setTimeout(function () {
        // error 발생!!!
        throw 'err!!!!!!!!!!';
    }, 100);
}

try {
    foo();
} catch (err) {
    // ? 과연?
    console.log(err);
}
```

-   그럼 Promise 는 완벽한가?

```javascript
var p = Promise.resolve(42);

p.then(function fulfillen(msg) {
    console.log(msg.toLowerCase());
});
// 아래처럼 reject 로 귀결하는 프로미스를 받을 수 있어야 처리 가능
/* .then(
    function () {},
    function (err) {
        console.log('err');
    }
); */
```

### 3.5.1. 절망의 구덩이

-   프로그래밍 언어는 개발자가 정신을 바짝 차리고 여~~~~얼 심히 코딩해야 한다. 아니면 절망의 구덩이에 빠진다.
-   아쉽게도 프로미스 에러 처리는 '절망의 구덩이' 방식으로 설계되어 있다.(위 예제)
-   그렇다면 마지막에 catch를 쓴다면?!
-   그럼 catch 에서 에러나면? 계속 catch ????!?!?

```javascript
var p = Promise.resolve(42);

p.then(function fulfillen(msg) {
    console.log(msg.toLowerCase());
})
    .then(
        function () {},
        function (err) {
            throw 'error1';
        }
    )
    .catch(function (err2) {
        console.log(err2);
        throw 'error2';
    })
    .catch(function (err3) {
        console.log(err3);
        throw 'error3';
    }); // ...catch catch1000000??
```

-   '전역 미처리 버림'이라는 것을 만들기도 한다.

```javascript
// node.js , 12부터 삭제 사용 금지
process.on('unhandledRejection', function (err, promise) {
    console.error(
        'Unhandled rejection (promise: ',
        promise,
        ', reason: ',
        err,
        ').'
    );
});
```

-   done 를 써서 명시적으로 표시 -> 이것도 es6 표준이 아니라..으흠...

### 3.5.2. 성공의 구덩이

-   버림을 잃어 버리지 않고(놓쳐서 전역 에러로 알려지기 전에), 개발자 에게 알려줄 수 있는 아름다운 방법이 나왔으면 좋겠다.
-   여기서 예로 defer() 이라는 함수를 설정했다.

## 3.6. 프라미스 패턴

### 3.6.1. Promise.all([])

-   2개 이상의 단계를 병렬로 실행 가능
-   아래는 두개의 ajax 처리가 모두 완료 후 진행

```javascript
var r1 = request(url1);
var r2 = request(url2);

Promise.all([r1, r2]).then(/*처리~*/);
```

-   두개다 '이룸' 상태로 전달이 되어야 합니다.
-   안그럼 '버림' 상태로 들어가야함

### 3.6.2. Promise.race([])

-   1등만 살아 남는다.
-   그치만 실패한 놈이 있으면 전부 실패~!

```javascript
const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'two');
});

Promise.race([promise1, promise2]).then(
    (value) => {
        console.log(value);
    },
    (err) => {
        console.log(err);
    }
);
```

-   결론 : 프로미스의 귀결을 확인 한 후 따로 처리해주는 finally 같은 것이 있으면 좋겠다~

-   있냉!?! 띠용!

```javascript
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally
let isLoading = true;

fetch(myRequest)
    .then(function (response) {
        var contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
    })
    .then(function (json) {
        /* process your JSON further */
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        isLoading = false;
    });
```

### 3.6.3 all([]) / race([]) 의 변형

> # 과제 1. 요놈 과제로 맛있겠다 헿헿 츄릅

-   none ([]) : 모든 프로미스가 버려져야 하며, 버림이 이룸값이 된다.

```javascript
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
```

## 3.8 프로미스의 한계

### 3.8.1 시퀀스 에러 처리

-   에러가 묻혀버리기 쉬움
-   마지막에 에러 핸들러를 만들어 두더라도 중간에서 유실되는 에러는 잡지 못함

### 3.8.2 단일값

-   단일값을 전달함, 많은 결과를 한번에 절달할때 배열이나 객체로 묶고 푸는 과정이 필요함 (해결책은 책 282P)

### 3.8.3 단일 귀결

```javascript
var p = new Promise(function (res, rej) {
    click('#btn', resolve);
});

p.then(function (event) {
    return request(event);
}).then(function (text) {
    console.log(text);
});

// click 행위는 resolve 에 귀결되어 있음
// click 행위가 일어날 때 마다 다수의 귀결 값을 처리하기 위해서는 연쇄 전체를 생성해주어야함
```

### 3.8.4 타성

-   이미 전에 사용하던 콜백을 수정하기 쉽지 않음
-   콜백 -> 프로미스 형태를 만들어서 사용

### 3.8.5 프라미스는 취소 불가

-   외부에서 멈출 방법이 없음

### 3.8.6 프로미스 성능

-   콜백 보다 조금 더 느릴 수있음
-   다만 믿음성/조합성이라는 해택을 보았을때 차라리 프로미스~!
