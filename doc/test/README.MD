# 5.문법

## 5.1. 문과 표현식

- 문과 표현식
  - 익숙하게. 문장/어구 /구두점,접속사
  - 적용하여, 문 /표현식/연산자

```javascript
var a = 3 * 6; 
var b = a; 
b;
// 문 : var a, var b, b
// 표현식 : 3 * 6, a, b
// 연산자 : =, *
```

## 5.1.1 문의 완료 값

- 모든 문은 완료 값을 가진다. 그 값이 undifined라 할지라도.
- 한 마디로 콘솔은 실행한 문의 완료 값을 보고하며 이 값은 개발자가 내부 프로그램에서 사용할 수 있는 값이 아니다.
  -> 콘솔의 완료 값을 순간 포착할 방법은 없을까?
  
```javascript
var a = 42;
// > undefined.
```

- 방법 1 : { } 블록은 내부의 가장 마지막 문/표현식의 완료 값을 자신의 완료 값으로 반환한다.
          하지만, 변수에 결과 값을 담을 수 없다.

```javascript
var b;
if(true) {
    b = 4 + 38;
}
// > 42
```

- 방법 2 : eval() 함수 / 참고로, 책에서도 말하지만 쓰레기다.
          과제. 문제가 되는 사례 및 대체
          과제이유. 경각심 부각

```javascript
var a,b;
a = eval("if(true) { b = 4+38; }");
a;
// > 42
```

- 방법 3 : 'do 표현식' ES7 명세, 실제 사용에 실패하여 코드를 적지 않음.

### 5.1.2. 표현식의 부수 효과

- 부수 : 주된 것이나 기본적인 것에 붙어서 따름. 또는 그러한 것에 붙어 따르게 함. (국어사전)
- 부수 효과를 지닌 여러가지 표현식 : function, ++, --, = 
- 개인적으로, 잘 사용한다면 코드를 맛깔나게 줄일 수 있다 정도의 장점밖에 모르겠습니다.

```javascript
//function
function foo() {
    a = a + 1;
}
var a = 1;
foo();
a;
```

```javascript
//++, --
var a = 42;
var b = a++;

var a = 42;
a++;
++a;
```

```javascript
//=
var a, b, c;
a = b = c = 42;
```

### 5.1.3 콘텍스트 규칙

- Context(문맥) : 같은 표현이라도 문장의 흐름에 따라 뜻이 달라질 수 있다.(국어사전X)
* Ex) 나는 아직도 배가 고프다.
- 같은 구문이지만 어디에서 어떤 식으로 사용하느냐에 따라 서로 다른 의미를 가지는 경우가 있다. 
* Ex) 중괄호

> 중괄호 1 : 객체 리터럴

>```javascript
>function bar() {
>    return 10;
>}
>var a = {
>    foo: bar()
>};
>```
>
>- 중괄호 2 : 레이블, P161, 책 내용이 잘 이해되지 않음.
>* 이 { } 코드 블록은 for/while 루프, if 조건 등에 붙어있는 코드 블록과 기능적으로 매우 유사하다.
>
>```javascript
>//foo라는 레이블을 정의.
>foo: for(var i=0; i<4; i++) {
>  for(var j=0; j<4; j++) {
>    if(j == i) {
>      continue foo;
>      //break foo;
>    }
>    
>    if((j*i)%2 == 1) {
>      continue;
>      //break;
>    }
>    console.log(i,j);
>  }
>}
>```
>
>```javascript
>//bar라는 레이블을 정의.
>function foo() {
>  bar: {
>    console.log("a");
>    break bar;
>    console.log("b");
>  }
>  console.log("c");
>}
>
>foo();
>```

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
