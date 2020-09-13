# 4. 강제 변환

## 4.1. 값 변환

- 명시적 강제변환
  - 코드만 봐도 의도적으로 일으킨다는 사실이 명백함
- 암시적 강제변환
  - 불분명한 부수 효과로부터 발생

```javascript
var a = 42;

var b = a + ""; // 암시적 강제 변환

var c = String(a); // 명시적 강제변화
```

## 4.2. 추상 연산

- 값 -> 문자열 / 숫자 / 불리언 등의 타입으로 변하는 기본 규칙

### 4.2.1. ToString

- '문자열이 아닌 값' -> '문자열' 변환 작업은 ToString 추상 연상 로직이 담당
- 내장 원시 값은 본연의 문자열 화 방법이 정해져 있음
- 일반 객체 : Object.prototype.toString() 동작 -> 내부 [[Class]] 를 반환
- toString() 정의 객체 : 자동으로 기존 toString()을 대체

> ### JSON 문자열화
>
> ---
>
> ```javascript
> JSON.stringify(42); // "42"
>
> JSON.stringify("42"); // ""42""
> "42".toString(); // "42"
>
> JSON.stringify(null); // "null"
> null.toString(); // Uncaught TypeError: Cannot read property 'toString' of null
>
> JSON.stringify(undefined); // undefined
> undefined.toString(); // Uncaught TypeError: Cannot read property 'toString' of undefined
>
> JSON.stringify(function () {}); // undefined
> (function () {}.toString()); // "function() {}"
> ```
>
> - Json 안전값은 모두 문자열화 가능
> - 안전하지 않은 값들은 JSON 문자열에서 자동으로 누락 시킴
> - 배열안에 포함 -> undefined
> - 객체 프로퍼티 포함 -> 지워 버림
>
> - 부적절한 JSON 값처리, 직렬화를 정의하기 위해 toJSON()을 정의
> - toJSON()은 적절한 값을 반환
> - 문자열화는 JSON.stringify()가 담당

### 4.2.2 ToNumber

- '숫자가 아닌 값' -> '수식 연산이 가능한 숫자' 변환 로직은 ToNumber 추상 연산에 정의

* 변환에 실패하면 결과는 NaN이다.
* 8진수 앞에 0이 붙으면 ToNumber은 8진수로 처리하지 않는다.

```javascript
var o = 0o11; // (1 * 8) + (0 * 8) = 9
console.log(o); // 9
Number(o); // 9
```

- 객체의 경우

  1. 동등한 원시 값으로 변경
  2. 해당 결과 값을 ToNumber 규칙에 의해 변경

* 동등한 원시값으로 변경하는 방법

  1. 동등한 원시값으로 변경하기 위해서는 ToPrimitive 추상 연산이 동작함
  2. 해당 객체가 valueOf를 구현했는지 확인
  3. valueOf를 구현했고, 반환 값이 원시 값이면 강제 변화
  4. 그렇지 않으면 toString을 이용해 강제 변환

> ### ToPrimitive
>
> ---
>
> - ToString, ToNumber 와 같은 추상 명세
> - 명시적으로만 정의됨 -> 규칙
> - 엔진이 알아서 처리 함
>
> ---
>
> - 객체의 형 변환은 3가지 종류로 구분
> - 구분 기준은 'hint' 라는 값으로 명명
>
> ### 1. string
>
> - hint 가 string 이 되는, 즉 변경 대상 객체가 string 형으로 변경되어야 할 때
> - ex) [Window.alert()](https://developer.mozilla.org/ko/docs/Web/API/Window/alert), 객체를 프로퍼티 키로 사용 하려고 할 때
>
> ```javascript
> alert(obj);
> another[obj] = 123;
> ```
>
> ### 2. number
>
> - 수학을 할 때와 같이 객체를 숫자로 변환하는 경우
>
> ```javascript
> // 명시적 형 변환
> let num = Number(obj);
> // (이항 덧셈 연산을 제외한) 수학 연산
> let n = +obj; // unary plus
> let delta = date1 - date2;
> // 크고 작음 비교하기
> let greater = user1 > user2;
> ```
>
> ### 3. default
>
> 연산자가 기대하는 자료형이 확실하지 않을 때, hint는 default가 된다. 예를 들어 이항 덧셈 연산자인 +는 피연산자의 자료형에 따라 문자열을 합칠 수도 있고, 숫자를 더해줄 수도 있다. 이런 경우에 hint는 default가 된다.
>
> ### 4. 순서
>
> 1. hint가 string이라면, obj.toString()이나 obj.valueOf()를 호출한다. (존재하는 메소드 우선 실행)
> 2. hint가 number, default일 경우, obj.valueOf()나 obj.toString()을 호출한다. (존재하는 메소드 우선 실행)

### 4.2.3. To Boolean

- js 에서는 강제변환을 통해 true <-> 1, false <-> 0 가능은 하지만 각각 별개의 값
- 강제 변환은 가능

  > c++ 에서 true <-> 1, false <-> 0
  >
  > ```c++
  > int main() {
  >     std::cout << true << std::endl; // true evaluates to 1
  >      std::cout << !true << std::endl; // !true evaluates to 0
  >     bool b(false);
  >     std::cout << b << std::endl; // b is false, which evaluates to 0
  >     std::cout << !b << std::endl; // !b is true, which evaluates to > 1
  >     return 0;
  >  }
  > ```

- Boolean 에 대응하는값으로 변경 했을 때 대응 하는 값들을 Falsy / Truthy 라고 함

#### Falsy 값

- Boolean 에 대응하는값으로 강제변환했을 때, 이 값들은 어떻게 작동?
  1. 불리언으로 강제변환하면 false 가 되는 값 (Falsy 값)
  2. 1번을 제외한 나머지(Truthy 값)
- 모든 객체는 명백히 truthy 하다.
- falsy 값 목록 (강제 변환시 false)
  1. undefinde
  2. null
  3. false
     4.+0, -0, NaN
  4. ""

#### Falsy 객체

- 모든 객체는 truthy 하다.
- Falsy 객체란?
- Falsy 객체에 해당하는 객체는 js 표준이 아닌 다른 컨텍스트에 속한 객체
- 대표적으로 브라우저에 속한 documenmt.all 값
- 사용 이유 : 레거시 추출 & 꼼수 -> 추천 ㄴㄴ

#### truthy 값

- falsy 값 목록에 없으면 무조건 truthy 값

## 4.3. 명시적 강제변환

- 분명하고 확실한 강제 변환

### 4.3.1. 문자열 <-> 숫자

- 추상 변환 로직에 따라 원시값으로 변경
- 함수 호출이 아닌 다른 명시적 변환 방법

```javascript
var a = 42;
var b = a.toString();

var c = "3.14";
var d = +c;

b; // "42"
d: // 3.14
```

> ### 단항 연사자 특징
>
> 사용시 주의사항 (명시적으로 복잡하게 표현 가능=)
>
> ```javascript
> 1 + -+(+(+-+1)); // 2
> ```
>
> #### 문자열 -> 숫자
>
> - Date -> 숫자로 강제 변환 용도로도 쓰임
>
> ```javascript
> var d = new Date(2020, 10, 10) + d; // 1604934000000
> ```
>
> - 사실 date.getTime(); / date.now() 방식이 더 명시적임
>
> ### ~ 틸트 연산자
>
> - 대부분의 언어나 환경에서 -1 은 '경계값', 보통 '실패' 라는 의미를 가짐
> - indexOf와 같은 메소드는 특정 문자를 발견하지 못했을 경우 -1을 호출
> - 틸트 연산자는 2의 보수를 구하는 비트 역전 연사자
> - -1에 2의 보수를 구하면 0이 나옴
> - js 에서 0 은 falsy 한 값
>
> ```javascript
> if(str.indexOf('h') < 0)
> // or
> if(str.indexOf('h') == -1)
> // 위와 같은 표현식 보다는, 틸트 연산자를 이해하고 있다면
> if(~str.indexOf('h'))
> // 와 같은 표현식이 오히려 더 명시적인 강제변환에 더 가깝다
> ```

### 4.3.2 숫자 형태의 문자열 파싱

- 파싱하는 것은 '문자열 -> 숫자' 결과와는 비슷하지만, 파싱은 ;비 숫자열 문자'를 허용한다.
- parserInt 메소드에 비 문자열 값을 넘기는건 감춰진 암시적 강제변환을 추가하는것 -> 최대한 지양

### 4.3.3 명시적 강제변환 : \* -> 불리언

- Boolean는 falsy / false 인 값들은 false, 나머지는 true로 변경함
- 이중 부정(!!) 과 동일한 결과
- var b = a ? true : false 에서는 a를 Boolean 으로 강제 변환을 해야 true / false 를 따져볼 수 있기 떄문에 암시적인 형 변환 일종이다. -> 쓰지말자

## 4.4. 암시적 변환

- 부수 효과가 명확하지 않게 숨겨진 형태로 일어남
- 코드를 어렵게 만듬
- 암시적 변환 목적은 보일러플레이트, 불필요한 상세 구현등을 줄이기 위함

### 4.4.1. '암시적' 이란?

- 유용하게 사용될 수 있다.

```javascript
SomeType x = SomeType(AnotherType(y));
// 해당 구문을
SomeType x = SomeType(y);
// 암시적 변경을 통해 간단하고 가독성 있게 변경 가능함 (AnotherType 단계를 거치지 않음)
```

### 4.4.2. 문자열 <-> 숫자

#### 4.4.2.1. 숫자 -> 문자열

- '+' 이항 연산자는 '숫자의 덧셈'과 '문자열 접합' 중 어떤 연산을 해야 할지 어떻게 알까?
- 한쪽 또는 양쪽 모두 문자열인지 아닌지에 따라 결정한다? -> 어느정도만 정답

```javascript
var a = [1, 2];
var b = [3, 4];

a + b; // "1, 23, 4"
```

- 분명 a,b 문자열이 아니지만 문자열로 변경 후 접합됐다.
- 한쪽 피 연산자가 문자열 이거나, 다음 과정을 통해 문자열 표현형으로 나타낼 수 있으면 문자열 붙이기를 함
  - 피 연산자중 하나를 ToPrimitive 추상 연상을 실행하고, number hint 를 넘겨 실행함
  - 피 연산자 valueOf()를 호출, 원시값으로 변경 불가능
  - toString() 호출을 통해 문자열로 변경
  - 문자열 붙이기 실행

* 주의할 점은 특정 객체가 valueOf 또는 toString 연산을 구현했다면, ToPrimitive 추상 연상이 의도한 것과는 다르게 동작 할 수 있음

#### 4.4.2.2. 문자열 -> 숫자

- 숫자로 강제 변환함

### 4.4.3. 불리언 -> 숫자

- var sum = 0;
- sum + boolean 값 -> 자동으로 암시적 숫자 변환

> # 과제 1. 119p onlyOne(undefined, null, false, +0, -0, NaN, "", []) -> true 가 나오도록 수정하라 (Number 사용 금지, return 문 변경 금지)

### 4.4.4 암시적 강제 변환 : \* -> 불리언

- 불리언으로 암시적 강제 변환이 일어나느 표현식

1. if () 의 조건
2. for 문의 탈출 조건 문
3. while 조건문
4. ? : 삼항 연산자 첫 번째 조건 표현식
5. ||, && 논리 연산자

### 4.4.5. && 와 || 연산자

- 결과 값이 항상 불리언 값은 아님
- 두 피 연산자 중 한쪽 값

1. 첫번째 피 연산자의 불리언 값을 평가
1. || 연산자일 경우 그 결과가 true 면 첫 번째 피연산자 값, false 면 두번째 피연산자 값
1. && 연산자일 경우 그 결과가 true 면 두 번째 피연산자 값, flase 면 첫 번째 피연산자 값

- && 연산자 특징을 이용하여 가드 연산자 형식을 사용할 수 있음, 첫 번째 표현식이 두 번째 표현식의 '가드' 역할을 함

* %% / || 연산자 반환 값이 피 연산자 타입이라고 해도, 암시적으로 불리언 타입으로 변경되어 표현식에 사용된다.

### 4.4.6. 심벌의 강제 변환

- 심벌 -> 문자 에서 명시적 강제변환은 허용, 암시적 강제 변환은 에러
- 숫자로는 변환 X
- 불리언 값으로는 명시적/ 암시적 둘다 가능 (항상 true)

## 4.5 느슨함/엄격함 동등 비교

- "==" 는 값의 동등함, "===" 타입의 동등함? -> 틀림
- 동등함 비교시 "=="는 강제 변환을 허용하지만, "===" 는 강제변환을 허용하지 않음

## 4.5.1. 비교 성능

- "==" 연산자가 강제 변환을 허용하니 더 느리다?
- 그런거 크게 상관없다. 그냥 강제 변환이 필요한지 아닌지를 파악해서 둘중 잘 선택해서 써라

### 4.5.2. 추상 동등 비교 (==)

![스펀지밥](./img/img2.jpeg)

- 타입이 같으면 값을 식별
- 객체의 동등 비교는 같은 레퍼런스 일 경우에만 동등 (강제 변환 X)

#### 4.5.2.1. 문자열 -> 숫자

```javascript
var a = 42;
var b = "42";

a === b; // false
a == b; // true
```

- == 연산자는 String 타입이 Number로 변경됨

```javascript
var a = 42;
var b = "42";

a === b; // false
a == Number(b); // true
```

#### 4.5.2.2. \* -> 불리언

```javascript
var a = "42";
var b = true;

a == b; // false
```

- "42"는 truthy 값이지만 false 가 나옴
- 한쪽이 Boolean 이면 Boolean 값은 ToNumber 추상 명세 가 동작함

```javascript
var a = "42";
var b = true;

a == Number(b); // step1, false
Number(a) == Number(b); // step2, false
```

- == true / == false 구문은 사용하지 말자

#### 4.5.2.3. null -> undefined

- 비교 피연산자가 서로 null 또는 undefined 면 상호 간 강제 변환이 일어남

```javascript
null == undefined; // treu
undefined == null; // treu
null == null; // treu
undefined == undefined; // treu
```

- 셀프 또는 서로 끼리 비교에서만 true가 나옴

```javascript
if(a == null)
// 또는
if(a == undefined)
// 둘다 안전 (a가 반환하는게 null 이던 undefined건 둘다 true가 나와서 비교 안전)
```

#### 4.5.2.4. 객체 -> 비객체

- ToPrimitive 추상 명세를 통해 객체값이 변환되고, 해당 값을 통해 비교

> # 과제 2.
>
> ```javascript
> if (true == obj) {
>   console.log("1");
> }
> ```
>
> console 을 출력하는 obj를 만들어라, obj 타입은 Object

### 4.5.3. 희귀 사례

- ToPrimitive 오류
- ToPrimitive 추상 명세는 강제 변환 후 valueOf를 호출함

![사탄](./img/img1.jpg)

```javascript
var i = 2;
Number.prototype.valueOf ==
  function () {
    return i++;
  };

if (a == 2 && a == 3) {
  console.log("세상에...");
}
```

```javascript
[] == ![]; // true
2 == [2]; // true
"" == [null]; // true
```

- 나쁜 부분 7인방

```javascript
"0" == false; // true
false == 0; // true
false == ""; //true
false == []; // true
"" == 0; // true
"" == []; // true
0 == []; // true
```

- 사실 이런 코드가 조금만 주의 한다면 나올 가능성의 극히 드물다

#### 안전한 사용법

- 피연산자 중 하나가 true/false 일 가능성이 있으면 '절대로' == 연산자 금지
- 피연산중 하나가 [], " ", - 이 될 가능성이 있으면 가급적 == 연산자 금지

## 4.6 추상 관계 비교

- 두 피연산자가 문자열일때와 아닐때로 나뉨
- 피연산자 한쪽이라도 문자열이 아닌경우 ToNumber 추상 명세로 강제 변환한다.
- 두 피연산자 모두 문자열일 경우, 각 문자를 단순 어휘 비교 한다.

```javascript
a < b; // false
a == b; // false
a > b; // false

a <= b; // true
a >= b; // true
// ?????
// 실제 구현
// 처리 : a <= b; -> !(b < a)
```
