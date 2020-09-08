## 타입

#### 타입이란?
- 어떤 값을 다른 값과 구별할 수 있는, 고유한 내부 특성의 집합

#### 자바스크립트에서 제공하는 타입
- null, undefined, boolean, number, string, object, symbol
    
#### typeof : 값의 타입

```javascript
typeof undefined            // undefined
typeof true                 // boolean
typeof 42                   // number
typeof "42"                 // string
typeof {}                   // object
typeof Symbol()             // symbol
typeof null                 // object
typeof function a() {}      // function(object 하위타입)
typeof [1,2,3]              // object
```  


- 자바스크립트는 동적 타입 언어로, 변수의 타입 지정없이 값이 할당되는 과정에서 자동으로 변수의 타입이 결정됨. 
- 즉, 변수는 고정된 타입이 없며, 같은 변수에 여러 타입의 값을 자유롭게 할당할 수 있음  

```javascript
    var x  = 'Hello';
    x = 1;
    x = true;

    var foo = 'string';
    console.log(typeof foo); // string
    foo = 1;
    console.log(typeof foo); // number
```

#### undefined, undeclared
        
- undefined : 접근 가능한 스코프에 변수가 선언되었으나 아무런 값도 할당되지 않은 상태
- undeclared : 접근 가능한 스코프에 변수 자체가 선언되지 않은 상태

```javascript 
    var a;
    typeof a                                // undefined
    typeof b                                // undefined
    if (typeof b != "undefined") {...}      // 안전가드, 안전하게 존재 여부 체크
```
    b 처럼 declared 되지 않은 것도 typeof를 쓰면 "undefined" 결과가 나온다 => undefined, undeclared 둘다 undefined 로 체크할 수 있음 (안전가드)


## 값
- 프로그램에 의해 조작될 수 있는 대상으로 가장 간단하게 생성할 수 있는 방법은 리터럴 표기법을 사용함
- 리터럴이란? 소스코드 안에서 직접 만들어 낸 상수 값 자체를 말하며 값을 구성하는 최소 단위

```javascript

10.50                               // 숫자 리터럴
'Hello'                             // 문자열 리터럴
true, false                         // 불리언 리터럴
null                                // null 리터럴
undefined                           //undefined 리터럴
{ name: 'Lee', gender: 'male' }     // 객체 리터럴
[ 1, 2, 3 ]                         // 배열 리터럴
/ab+c/                              // 정규표현식 리터럴
function() {}                       // 함수 리터럴
```

#### 배열
- 배열(array)은 1개의 변수에 여러 개의 값을 순차적으로 저장할 때 사용한다.
-  배열은 Array 생성자로 생성된 Array 타입의 객체이며 프로토타입 객체는 Array.prototype 임

-  문자열, 숫자, 객체, 다른 배열까지 어떤 타입의 값을 담을 수 있음
        배열 크기는 미리 정하지 않고도 선언할 수 있으며 원하는 값을 넣으면 됨.


```javascript

    // 여러 타입의 값을 넣을 수 있음
    var a = [1, "2", [3]];  
    a[2];                           // [3]
    a[2][0];                        // 3
    a.length;                       // 3
```
```javascript

    // 빈 배열을 다룰 때 유의!
    var arr = [];                   // 미리 크기를 정하지 않고도 선언할 수 있음
    arr[0]);                        // undefined
    arr[1] = 1;
    arr[3] = 3;
    arr;                            // (4) [empty, 1, empty, 3]
    arr.lenth;                      // 4
```
```javascript

    // 배열 요소 삭제 delete 
    var numbersArr = ['zero', 'one', 'two', 'three'];
    delete numbersArr[2];               // ["zero", "one", empty, "three"]
    numbersArr.length;                  // 4  값만 삭제함.
    numbersArr.splice(2, 1);            // ["zero", "one", "three"]
```
```javascript

    // 배열의 인덱스에 문자열을 추가 가능
    var a = [];
    a[0] = 1;
    a["test"] = 2;
    a.length = 1                         // 하지만 length가 증가하지는 않음

    // 키로 넣은 문자열 값이 10진수 숫자로 타입이 바뀌면 문자열 키가 아닌 숫자 키를 넣은 것과 같은 결과.. 
    var a = [];
    a["14"] = 1;
    a.length = 15;
```

- 웬만하면 배열원소의 인덱스는 숫자만 쓰도록 하자!





#### 유사배열
- 배열의 형태를 가지고 있지만 배열이 아닌것.
- 조건1 : 반드시 length가 필요하다.
- 조건2 : index의 번호가 0번부터 시작해서 1씩 증가해야한다. 
- 구분 : Array.isArray();

```javascript
    var arr1 = ['aaa', 'bbb', 'ccc'];                   // 배열 
    var arr2 = document.body.children;                  // 유사배열 형태의 DOM 원소 리스트 반환

    Array.isArray(arr1);                                //true
    Array.isArray(arr2);                                //false

    // 유사배열을 배열로 
    var arr = Array.from(document.body.children);       //es6
    var arr = Array.prototype.slice.call(document.body.children);
    
    [].forEach.call(ele, function(element, index, array){ 
        console.log(element, index); 
        });

```
#### 문자열
- 문자열은 배열과 겉모습이 닮은 유사배열, 하지만 배열은 아님
- 배열과 공통점 : length 프로퍼티, indexOf() 메서드, concat() 메서드 
- 배열과 차이점 : 문자열은 불변값, 배열은 가변값. 문자열 메서드는 그 내영을 바로 변경하지 않고 항상 새로운 문자열을 생성한 후 반환, 배열 메서드는 그 자리에서 곧바로 원소를 수정

```javascript
    var a = "foo";                  // 문자열
    var b = ["f", "o", "o"];        // 배열

    var c = a.toUpperCase();
    a === c;                        // false
    a;                              // foo
    c;                              // FOO

    b.push("!");                    
    b;                              //  ["f", "o", "o", "!"]


    // 문자열을 다룰 때 대부분의 배열 메서드는 사실상 문자열에 쓸 수 없음
    a.join;                          //undefined
    a.map;                           //undefined
  
    // 문자열에 대해 불변 배열 메서드는 빌려쓸 수 있음
    var c = Array.prototype.join.call(a, "-");      // "f-o-o"
    var d = Array.prototype.map(a, function(v) {
        return v.toUpperCase() + ".";               //"F.O.O"
    });                                 

    // 거꾸로 뒤집는 reverse()도 사용못함
    a.reverse;                       //undefined
    b.reverse;                       // ["!", "o", "o", "f"];

    // 문자열은 불변 값이라 바로 변경되지 않으므로 빌려쓰는 것 또한 안됨.
    var c = Array.prototype.reverse.call(a);    // error
    
    // 문자열을 배열로 바꾸고, 원하는 작업 수행한 후 문자열로 변경하는 꼼수 사용
    // 문자배열 -> 문자열 join() 사용
    var c = a.splite("").reverse().join();      
```

#### 숫자  
- javascript 숫자 타입은 Number가 유일하며 정수, 부동 소숫점 숫자를 모두 아우름
- 숫자 리터럴은 10진수 리터럴로 표시 
- 아주 크거나 작은 숫자는 지수형으로 표시.
- 숫자 값은 Number 객체 래퍼로 박싱할 수 있기 때문에 Number.prototype의 메서드로 접근 가능

```javascript

    //javascript 숫자 리터럴은 10진수 리터럴로 표시
    var a = 42;
    var b = 42.3;


    //아주 크거나 작은 숫자는 지수형으로 표시 .toExponential() 메서드의 결과와 같음
    var a = 5E10;               // 50000000000
    a.toExponential();          // "5e+10"


    // 숫자 값은 Number 객체 래퍼로 박싱할 수 있기 때문에 Number.prototype 메서드로 접근할 수 있음
    var a = 42.59;
    a.toFixed(0);               // 43
    a.toFixed(1);               // 42.6


    var onethousand = 1E3;      // 1* 10^3 , 큰숫자는 지수로 표시
    0xf3;                       // 243의 16진수
    0363;                       // 243의 8진수, 숫자 리터럴은 2진, 8진, 16진 등 다른 진법으로 나타낼 수 있음
```

- 이진 부동 소숫점 부작용, 미세한 반올림 오차는 Number.EPSILON (es6)를 사용
```javascript
    
    0.1 + 0.2 === 0.3;                                  //false
    
    // 자바스크립트의 미세한 오차(머신 입실론)은 2의 -52승...ㅎ
    if (!Number.EPSILON) {
        Number.EPSILON = Math.pow(2, -52);              // 폴리필
    }

    // es6에서 Number.EPSILON을 사용하여 동등함 비교
    function numbersCloseEnoughToEqual(n1, n2) {
        return Math.abs(n1 - n2) < Number.EPSILON; 
    }

    var a = 0.1 + 0.2;
    var b = 0.3;
    numberCloseEnoughToEqual(a, b);                     // true;
```

- 안전한 정수 범위 :2^53-1
```javascript

    Number.MAX_SAFE_INTEGER                             //  9007199254740991         
    Number.MIN_SAFE_INTEGER                             // -9007199254740991
```

- 정수인지 확인 : Number.isInteger();
- 안전한 정수 여부 (es6부터) : Number.isSafeInteger();

#### 특수값
- undefined : undefined 타입의 값은 undefined 밖에 없음
- null      : null 타입의 값도 null 뿐.
- void      : void ~~는 어떤 값이든 무효로 만들어 결과값을 undefined로 만듬
- NaN       : 숫자아님 정확하게 말하면 유효하지 않은 숫자, 경계값의 일종으로 숫자 집합 내에서 특별한 종류의 에러상황을 나타냄
- -0

```javascript
    var a = 2 / "foo";      // NaN
    a == NaN;               // false, 자기 자신과도 동등하지 않다...
    a === NaN;              // false
    isNaN(a);               // true 내장 전역 유틸리티 isNaN()으로  여부 확인

    var b = "foo";
    isNaN(b);               // true, "foo"는 숫자는 아니지만 NaN은 아님..
    Number.isNaN(b);        // false, es6에서 Number.isNaN()으로 해결

    Object.is(a, NaN)       // true, es6에서 두 값이 절대적으로 동등한지를 확인하는 유틸리티
```

#### 값 복사 vs 레퍼런스 복사 
- 자바스크립트에는 값 또는 레퍼런스의 할딩 및 전달을 제어하는 구문암시가 전혀 없음. 값의 타입만으로 값-복사, 레퍼런스-복사 둘중에 한 쪽이 결정됨. 값의 타입을 보고 엔진의 재량으로 결정
- null, undefined, string, number, boolean, symbol과 같은 원시타입 :  값 복사
- 배열, 함수, 정규표현식 등 원시타입을 제외  : 레퍼런스-복사

```javascript
    var a = 2;
    var b = a;         // 값 복사
    b++;
    a;                 // 2
    b;                 // 3
```

```javascript
    var c = [1, 2, 3];
    var d = c;          // 공유된 [1, 2, 3] 값의 래퍼런스
    d.push(4);        
    c;                  // [1,2,3,4]
    d;                  // [1,2,3,4]
```
- c와 d는 공유값 [1,2,3]에 대한 레퍼런스이며 c와 d가 [1,2,3]을 소유하는 것이 아닌, 이 값을 동등하게 참조함. 따라서 레퍼런스로 실제 공유한 배열 값이 변경되면 공유 값 한군데만 영향을 미치므로 두 레퍼런스는 갱신된 값을 동시에 바라보게됨.

```javascript

    var a = [1, 2, 3];
    var b = a;
    a;                  // [1,2,3]
    b;                  // [1,2,3]
    b = [4,5,6];            
    a;                  // [1,2,3]
    b;                  // [4,5,6]
```
- b = [4,5,6]을 할당해도 a 에 영향을 받지 않음.

- 값-복사냐 레퍼런스-복사냐를 결정하는 유일한 단서는 값의 타입 뿐이므로 사용할 값 타입을 잘 정해서 간접적으로 할당/전달 로직에 반영해야함


## 네이티브
- 네이티브 객체는 ECMAScript 명세에 정의된 객체를 말하며 애플리케이션 전역의 공통 기능을 제공, 특정 환경에 종속되지 않음

#### 종류
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()

```javascript
    var a = new String("abc");  // 생성자 처럼 사용 가능 
    typeof a;                   // 결과 : object, 원시값 "abc"가 아닌 "abc"를 감싼 객체 래퍼
```

#### 내부 [[Class]] 
- 굳이 호출할 일이 있을까?
- typeof가 object인 값(배열 등)에는 [[Class]]라는 내부 프로퍼티가 추가로 붙음
- 직접 접근 불가하며, Object.prototype.toString()라는 메서드에 값을 넣어 호출하여 존재 확인 가능.

```javascript
    // 대부분 내장 네이티브 생성자를 가리킴
    Object.prototype.toString.call([1,2,3]);            // "[object Array]"
    Object.prototype.toString.call(/regex-literal/i);   // "[object RegExp]"
    
    // 네이티브 생성자는 없지만 내부 [[Class]]값을 확인해보면
    Object.prototype.toString.call(null);               // "[object Null]"
    Object.prototype.toString.call(undefined);          // "[object Undefined]"

    // 그 밖의 원시값은 박싱 과정을 거침, 해당 객체 래퍼로 자동 박싱
    Object.prototype.toString.call(1);                  // "[object Number]"
    Object.prototype.toString.call('abc');              // "[object String]"
    Object.prototype.toString.call(true);               //"[object Boolean]"
```

#### Wrapper
원시 타입 값에 대해 표준 빌트인 객체의 메소드를 호출할 때, 원시 타입 값은 연관된 객체(Wrapper 객체)로 일시 변환 됨.. 그리고 메소드 호출이 종료되면 객체로 변환된 원시 타입 값은 다시 원시 타입 값으로 복귀

- .length, .toString()으로 접근하려면 원시값을 객체 래퍼로 감싸줘야함.
- 자바스크립트는 원시 값을 알아서 박싱함.
- 개발자가 굳이 객체 형태로 선 최적화 하면 프로그램이 느려질 수도 있기때문에 엔진에서 알아서 하도록 놔두는 것이 좋음

```javascript

    var a = 'abc';
    a.length;                   // 자동으로 박싱하므로 가능 -> String(a).length 와 동일
    a.toUpperCase;
```

-  언박싱 : valueOf()

```javascript

    var a = new String("abc");  // 래퍼 박싱
    a.valueOf();                // abc
```

#### 네이티브 생성자 
- 확실히 필요해서 쓰는게 아니라면, 생성자는 가급적 쓰지 않는게 좋음.
- Array, Object, Function, RegExp 모두 리터럴 방식으로 쓰는 것을 권장.
- Date(), Error()는 리터럴 방식이 없기 때문에 생성자로 사용.
```javascript

    var date = new Date();
    date;                   // Sun Sep 06 2020 22:26:28 GMT+0900 (대한민국 표준시)
    date.getDate();         // 6
    date.getMonth();        // 8
    date.getTime();         // 1599398788361
```
- Error 객체의 주 용도는 현재의 실행 스택 콘텍스트를 포착하여 객체에 담는 것으로 실행 스택 콘텍스트는 함수호출 스택, error가 만들어진 줄 번호 등 디버깅에 도움이 될 만한 정보를 담고있음, throw 연산자와 함께 사용
```javascript

   function foo(x) {
       if(!x) {
           throw new Error("x없음");
       }
   }
```

#### Symbol() 
- ES6에서 선보인 새로운 원시 값 타입으로 충돌 염려 없이 객체 프로퍼티로 사용 가능한 특별한 '유일 값', ES6의 특수한 내장 로직에 쓰이기 위해 고안
- 객체의 고유한 식별자
- new를 붙이면 에러가나는 유일한 네이티브 '생성자'

```javascript

    var symbolProperty1  = Symbol('key'); // Symbol(key)
    var symbolProperty2  = Symbol('key'); // Symbol(key)
    var ob = {};

    ob[symbolProperty1] = 'value1'
    ob[symbolProperty2] = 'value2'

    console.log(ob[symbolProperty1] === 'value1');                  // true
    console.log(ob[symbolProperty2] === 'value2');                  // true
    console.log(symbolProperty1 !== symbolProperty2);               // true

    console.log(ob);
```

#### 네이티브 프로토타입
- 내장 네이티브 생성자는 각자의 .prototype 객체를 가짐 (Array.prototype, String.prototype 등)
- .prototype 위임 덕분에 모든 문자열들이 prototype에 포함된 메서드를 쓸수있다.

```javascript

    var a = "abc";
    a.indexOf("c");
    a.toUpperCase();
    a.trim();
```
- 즉 정리하면, 단순 스칼라 원시 값이 있을 때, length 프로퍼티나, String.prototype에 정의된 메서드를 호출하면 자바스크립트는
자동으로 원시 값을 '박싱'하기 때문에 필요한 프로퍼티와 메서드를 사용할 수 있다.



#### 과제
- https://poiemaweb.com/js-array
- https://poiemaweb.com/js-string
를 읽어보고 예제를 한번씩 타이핑 해보기!

