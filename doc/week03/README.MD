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

### 5.1.1 문의 완료 값

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

> 중괄호 2 : 레이블, P161, 책 내용이 잘 이해되지 않음.
>* 이 { } 코드 블록은 for/while 루프, if 조건 등에 붙어있는 코드 블록과 기능적으로 매우 유사하다.

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

> 중괄호 3 : 블록

>```javascript
>[] + {}; // "[object Object]", [] " " 강제변환, {} "[object Object]" 강제변환
>{} + []; // 0, {} 빈블록, + [] 0 강제변환
>```

> 중괄호 4: 객체분해, ES6부터 객체 분해 시 { }를 사용한다.
>
>```javascript
>function getData() {
>  return {
>    a: 42,
>    b: "f"
>  };
>}
>var { a, b } = getData();
>console.log(a,b); 
>//42, f
> /*
> var res = getData();
> var a = res.a;
> var b = res.b;
> */
>```

> 중괄호 4 : else if와 선택적 블록
> * if/else if/else --> if/else(if/else)
> * 단일 블록은 { } 필요가 없지만, 스타일 가이드 문서대로 개발을 진행하는 것이 좋다.

## 5.2. 연산자 우선순위

- &&, || 복습시간.
- 이러한 연산자에 우선순위가 존재한다.
- 책에 MDN 웹사이트 연산자 우선순위 참고 
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/%EC%97%B0%EC%82%B0%EC%9E%90_%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84

```javascript
if( str && (matches = str.match( /[aeiou]/g ))){ //... }
if( str && matches = str.match( /[aeiou]/g )){ //... }
```
### 5.2.1. 단락 평가

- 효율적이다. 
 
```javascript
var a;       //falsy
var b = 1;   //truly

if(a && b) { }
if(a || b) { }
```
```javascript
if( opts && opts.cool ) { }
//opts 먼저 검사해서 falsy면 한 번만 검사.
```

### 5.2.2. 끈끈한 우정

- 별 내용이 없다. 삼항 연산자(? :), &&, || 우선순위 비교임.
- 무조건, 삼항 연산자가 우선순위가 낮다.
- 이것도 5.2 연산자 우선순위 홈피참고.

```javascript
a && b || c ? c || b ? a : c && b : a
```

### 5.2.3. 결합성

- 결합성 : 두 개 이상의 물체나 현상이 하나로 어울리려는 특성.(국어사전)
- 지금까지는 연산자 연산에 대한 우선순위였지만, 결합성은 좌측->우측(좌결합성) 우측->좌측(우결합성) 이냐에 대한 문제
- 이것도 5.2 연산자 우선순위 홈피참고.

> &&, || 좌결합성 연산자, 실제 좌/우 별상관 없는 연산자 중 하나.
> 좌, 우 먼저 결합하여 연산해도 값은 같다. 그래도 좌결합성 연산자임.
>```javascript
> a && b && c
> a || b || c
>```

> ? : 삼항 연산자, 우결합성 연산자로써 좌/우에 따라 값이 달라짐.
>```javascript
>// a(true), b(false), c(true), d(true), e(true) 일때, 값이 다르다.
> a ? b : (c ? d : e)
> (a ? b : c ) d : e
>```

> = 연산자, 우결합성 연산자로써 좌/우에 따라 값이 달라짐.
>```javascript
> var a = 42;
> var b = "f";
> var c = false;
> var d = a && b || c ? c || b ? a : c && b : a;
> d;
>```

### 5.2.4. 분명히 하자
- 우선순위, 결합성 잘 알고 써라.
- 명시하는 거 안하는 거 너의 선택이다.
- 대신, 분명히 하자라는 필자의 생각입니다.

## 5.3. 세미콜론 자동 삽입
- ASI(Automatic Semicolon Insertion)
- 자바스크립트 프로그램의 세미콜론(;)이 누락된 곳에 엔진이 자동으로 ;을 삽입함.
- New Line에만 적용, 줄 단위로 파싱한 후 에러가 나면 ;을 넣어보고 타당하면 삽입함.
- 엄청난 논쟁입니다. 저는 개인적으로 쓰지 않는 것이 좋다고 생각합니다. 필자의 의견과 동일합니다.

- 장점 : 편하다. 개발자의 실수에 대해 너그럽다.

```javascript
var i = 9;
do {
    console.log(i);
} while(i===10) //여기 ; 을 ASI가 넣어줌
i;
```
- 단점 : 예상치 못한 결과가 발생할 수 있다.
        차라리 컴파일 오류가 찾기 쉬운거 아닌가.

```javascript
function foo(){
    if(true) return
    console.log("foo");
}
```

## 5.4. 에러

- 자바스크립트 Error : Rumtime Error, Compile Error.
```javascript
var a;
42 = a; // Error.
```

- ES5에는 엄격 모드가 존재하여 사용하면 Compile Error, Early Error를 깐깐하게 걸러낼 수 있다.
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode

```javascript
// use strict Ex 1. 함수 인자 중복
function aa(a,a){"use strict"};
function aa(a,a){};

// use strict Ex 2. 선언하지 않은 변수
"use strict"
awejiofawjeifo = 1;

// use strict Ex 3. 중복 변수
"use strict"
var a = {
  b:43, b:42
};
```

### 5.4.1. 너무 이른 변수 사용
- ES에는 TDZ(Temporal Dead Zone)이라는 새로운 개념이 도입.
- TDZ는 아직 초기화를 하지 않아 변수를 참조할 수 없는 코드 영역.

> Hoisting : 끌어올리다. 들어올리다.
> 자바스크립트에서 var 변수는 Hoisting이 가능하지만, let/const는 Hoisting이 되지 않음.
> 이 때, let/const의 초기화 전 변수들은 TDZ에 있다..는 이야기입니다.
>```javascript
>// Hoisting 
>console.log(foo); // Not Error! undefined!
>
>// Not Hoisting
>console.log(bar); // Error! Reference Error!
>let bar = 42;
>```

>```javascript
>// var Scope - 전역
>{
>  var foo = 456; // 전역 변수
>}
>console.log(foo); // 456
>
>// let Scope - Block
>let foo = 123; // 전역 변수
>{
>  let foo = 456; // 지역 변수
>  let bar = 456; // 지역 변수
>}
>
>console.log(foo); // 123
>console.log(bar); // ReferenceError: bar is not defined
>```

## 5.5. 함수 인자

- TDZ 개념을 잘 이해하지 못하였지만, 초기화하지 않은 변수 상태면 TDZ에 들어있는 개념입니다.
- 또한, 아래와 같은 함수 매개변수도 TDZ 내부에 있으므로 정의 시 주의해야 합니다.
- 좌측에서 우측 순서로 let 선언을 한 것과 동일하게 처리됨.

```javascript
var a = 2;
function square(a = a) {
  return a * a;
}
square(); // ReferenceError!
```

- 함수 매개변수, Arguments 배열
- 어렵다..

```javascript
function foo(a=42, b=a+1) {
  console.log(
    arguments.length,
    arguments[0],
    arguments[1],
    a,b
  );
};

foo();
foo(10);
foo(10, undefined);
foo(10, null);

// undefined Vs. '' Vs. null
function test(num = 1) {
  console.log(typeof num)
}

test()            // 'number' (num 은 1로 설정됨)
test(undefined)   // 'number' (num 이 역시 1로 설정됨)

// 다른 falsy values로 테스트 하기:
test('')          // 'string' (num 은 ''로 설정됨)
test(null)        // 'object' (num 은 null로 설정됨)
```

- 인자 및 Arguments 연결 예제.
- 이리하여, 인자와 arguments를 함꼐 사용하지 마라!
```javascript
function foo(a) {
  a = 42;
  console.log(arguments[0]);
}

foo(2);
foo();
foo(undefined);
foo(null);
```
## 5.6. try...finally

- try절에 return문이 있으면 무조건 return 값을 반환할텐데, 반환받은 호출부 코드는 finally 이전에 실행? 이후에 실행?
```javascript
function foo() {
  try {
    return 42;
    //throw 42;
  }
  finally {
    console.log( "a" );
  }
}
console.log(foo());
//Hello
//42, //Uncaught Exception: 42
```

- finally 절에 throw가 던져지면. try는 그냥 무시됨.
```javascript
function foo() {
  try {
    return 42;
  }
  finally {
    throw 1;
  }
}
console.log(foo());
//Uncaught Exception: 1
```

- continue, break도 마찬가지로 무시됨.
```javascript
for(var i=0; i<10; i++) {
  try {
    continue;
  }
  finally {
    console.log(i);
  }
};
// 0 1 2 3 4 5 6 7 8 9
```

## 5.7 switch

- 보통 알고 있는 특이점 없는 switch.
```javascript
var a = 42;
switch(a) {
  case 2:
    //...
    break;
  case 42:
    //...
    break;
  default:
    //...
}
```

- 자바스크립트에서 switch문은 switch(A)와 case(B)의 동등비교로 이루어짐.
- 아래 코드의 (a||b==10)은 true가 아닌 truly. 이럴경우는 매치가 되지 않음.
```javascript
var a = "H";
var b = 10;
switch(true) {
  case (a||b==10):
    //...
    break;
  default:
    console.log("default");
}
```

# 1. 스코프란 무엇인가.

- 스코프(Scope) : 범위, 영역
- 프로그래밍 언어의 기본 패러다임은 변수에 값을 저장하고 저장된 값을 가져다 쓰는 것.
>이 변수는 어디에 살아있는가? 다른 말로 하면 변수는 어디에 저장되는가?
>필요할 때 프로그램은 어떻게 변수를 찾는가?
- 특정 장소에 변수를 저장하고 나중에 그 변수를 찾는데 잘 정의된 규칙이 필요함, 이러한 규칙을 스코프라 한다.

## 1.1. 컴파일러 이론

- 자바스크립트도 컴파일러 언어이다.

## 1.2. 스코프 이해하기

- 스코프를 이해하기 위해 대화 형식으로 살펴봄.

### 1.2.1. 출연진

- 프로그램 "var a = 2;"를 처리할 주역들
> 엔진 : 컴파일레이션의 시작부터 끝까지 전 과정과 자바스크립트 프로그램 실행을 책임진다.
> 컴파일러 : 엔진의 친구로, 파싱과 코드 생성의 모든 잡일을 도맡아 한다.
> 스코프 : 엔진의 또 따른 친구로, 선언된 모든 확인자(변수) 검색 목록을 작성하고 유지한다. 또한, 엄격한 규칙을 강제하여 현재 실행 코드에서 확인자의 적용 방식을 정한다.

### 1.2.2. 앞과 뒤

- 프로그램 "var a = 2;"
>컴파일러는 'var a' 스코프에게 변수 a가 특정 스코프 컬렉션에 있는지 질문,
>있다면 컴파일러 선언 무시, 없다면 변수 a를 스코프 컬렉션 내 선언하도록 요청
>컴파일러는 'a = 2' 처리 하기 위해 엔진이 실행할 수 있는 코드 생성.
>엔진이 스코프에게 a라 부르는 변수가 스코프 컬렉션 내에 접근가능한지 확인.
>가능하다면 엔진은 변수 a 사용, 아니라면 엔진은 다른곳(중첩 스코프 부분을 보라)을 살핀다.
>엔진이 변수를 찾으면 a = 2 대입, 찾지 못한다면 에러 발생

- 해당 프로그램은 별개의 두 가지 동작을 취함.
>1. 컴파일러가 변수를 선언한다.
>2. 엔진이 스코프에서 변수를 찾고 변수가 있다면 값을 대입한다.

### 1.2.3. 컴파일러체

- 엔진이 스코프에서 변수를 찾고 변수를 찾는 과정에서 검색을 수행한다.
- 검색은 LHS / RHS 종류가 존재함. (엔진이 스코프에서 변수를 찾을 때,)
- 대입연산의 방향
- LHS(Left-Hand Side) : 값을 대입하여야 하므로 변수 컨테이너 자체를 검색
- RHS(Right-Hand Side) : 값만 필요함
```javascript
console.log(a); //RHS
a = 2; // LHS
```

## 1.3. 중첩 스코프

- 스코프는 확인자 이름으로 변수를 찾기 위한 규칙의 집함.
- 즉, 스코프는 블록이나 함수 안에 중첩될 수 있다!

```javascript
//최상위 Scope.
{
  //최상위-1 Scope.
  var a = 2;
  {
    //최상위-2 Scope.
    var b = 4;
    {
      a+b;
    }
  }
}
```

## 1.4. 오류
- LHS, RHS 검색 방식이 다르다.
```javascript
aaaa = 30; // LHS, Not Error! 
bbbb; // RHS, ReferenceError! 
```
