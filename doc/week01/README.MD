## 타입

### 타입이란?
어떤 값을 다른 값과 구별할 수 있는, 고유한 내부 특성의 집합

- 내장타입 (원시타입) 
    
    null, undefined, boolean, number, string, object, symbol
    
- typeof : 값의 타입

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
- 자바스크립트는 '타입강제'를 하지않음, 문자를 넣었다가 나중에 숫자를 넣어도됨, 즉 변수는 타입이 없음

- undefined, undeclared
        
    undefined : 접근 가능한 스코프에 변수가 선언되었으나 아무런 값도 할당되지 않은 상태
    undeclared : 접근 가능한 스코프에 변수 자체가 선언되지 않은 상태

    ```javascript 
    var a;
    typeof a    // undefined
    typeof b    // undefined
    if (typeof b != "undefined") {...}    // 안전가드, 안전하게 존재 여부 체크
    ```
    b 처럼 declared 되지 않은 것도 typeof를 쓰면 "undefined" 결과가 나온다 => undefined, undeclared 둘다 undefined 로 체크할 수 있음 (안전가드)




