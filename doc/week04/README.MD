# 스코프

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

function foo(a){
  var b = a;
  return a+b;
}
var c = foo(2);
//LHS : 3개
//RHS : 4개
```

## 1.3. 중첩 스코프

- 스코프는 확인자 이름으로 변수를 찾기 위한 규칙의 집함.
- 즉, 스코프는 블록이나 함수 안에 중첩될 수 있다!
- 엔진은 현재 스코프에서 변수를 찾기 시작하고, 찾지 못하면 한 단계씩 올라간다.
- 최상위 글로벌 스코프에 도달하면 변수를 찾았든, 못 찾았든 검색을 멈춘다.

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
- LHS, RHS 검색 검색 방식은 변수가 선언되지 않았을 때, 서로 다르게 동작을 함

```javascript
function foo(a){
  console.log(a+b);
  b = a;
}
foo(2)
```

```javascript
aaaa = 30; // LHS, Not Error! 
bbbb; // RHS, ReferenceError! 
```

# 2. 렉시컬 스코프

> 스코프는 두가지 방식으로 작동을 함
 - 렉시컬 스코프 (다수의 프로그래밍 언어가 사용) --> 자바스크립트에서 사용됨
 - 동적 스코프 (Bash Scripting, Perl)
> 렉싱타임때 정의 되는 스코프
> 개발자가 코드를 작성할 떄 함수를 어디에 선언하는지에 따라 정의되는 스코프

 ## 2.1. 렉스타임

 > 렉싱 처리 과정 : 소스 코드 문자열을 분석하여 상태 유지 파싱의 결과로 생성된 토근에 의미를 부여하는 작업
 > 컴파일레이션 렉싱단계 : 확인자가 어디서 어떻게 선언됐는지 파악하여 실행 단계에서 어덯게 확인자를 검색할지 예상할 수 있도록 도와줌
```javascript

//버블 1 - 확인자 > foo
function foo(a){
  //버블 2 - 확인자 > a,b,bar
  var b = a * 2;
  function bar(c) {
    //버블 3 - 확인자 > c
    console.log(a,b,c);
  }
  bar(b*3)
}
foo(2);
```

### 2.1.1. 검색
  - 엔진은 스코프 버블의 구조와 상대적 위치를 통해 어디를 검색해야 확인자를 찾을 수 있는지 암
  - 스코프는 목표와 일치하는 대상을 찾는 즉시 검색을 중단.
  - shadowing(쉐도잉) : 안쪽에 있는 확인자가 바깥족에 확인자를 가리는것 > 즉 상위 참조

## 2.2 렉시컬 속이기
  > 렉시컬 스코프는 개발자가 작성할 때 함수를 어디에 선언했는지에 따라 결정

  - 런타임때 렉시컬 스코프 속이는법
    - eval()
    ```javascript
    function foo(str,a){
        eval(str);
        console.log(a,b);
    }
    var b = 2;
    foo("var b = 3;",1);
    ```
    -> setInterval, setTimeOut, new Function() 똑같은 놈들이니 사용 자제.. (성능이슈)
    - with
    > 한 객체의 여러 속성을 참조할 때 객체 참조를 매번 반복하지 않기 위해 사용하는 일종의 속기법
    ```javascript
      function foo(obj){
        with(obj){
          a = 2; //특이점 > 글로벌 변수 생성!
        }
      }

      var o1 = {
        a : 3
      };

      var o2 = {
        b : 3
      }

      foo(o1);
      console.log(o1.a);
      foo(o2);
      console.log(o2.a);
      console.log(a); 
    ```
    -> 속성을 가진 객체를 받아 하나의 독립된 렉시컬 스코프로 취급, 객체의 속성은 해당 스코프 안에 정의된 확인자로 간주

### 2.2.1 성능
- 자바스크림트 엔진은 컴파일레이션 단계에서 상당수 최적화 작업을 진행
- 하지만, eval(), with코드는 엔진이 미리 확인을 할수가 없음 > 최적화가 의미가 없어짐


# 3. 함수 vs 블록 스코프
 > 자바스크립트가 함수 기반 스코프를 사용한다? 노노..
## 3.1. 함수 기반 스코프
```javascript
  function foo(a) {
    var b = 2;
    // some code
    function bar(){
      // ...
    }
    // more code
    var c = 3;
  }
```
## 3.2. 알반 스코프에 숨기
> 함수에 대한 전통적인 개념
 - 함수를 선언하고 그 안에 코드를 넣음,
 - 작성한 코드에서 임의 부분을 함수 선언문으로 감쌈 > 코드를 숨기는 효과
   - 최소 권한의 원칙
    > 모듈 객체의 API와 같은 소프트웨어를 설계할 때 필요한 것만 최소한으로 남기고 나머지는 숨겨야함
   ```javascript
    function doSomething(a) {
      b = a + doSomethingElse(a*2);
      console.log(b*3);
    }

    function doSomethingElse(a) {
      return a-1;
    }
    var b;
    doSomething(2); //15
   ```
  ```javascript
    function doSomething(a) {
      function doSomethingElse(a) {
        return a-1;
      }
      var b;
      b = a + doSomethingElse(a*2);
      console.log(b*3);
    }
    doSomething(2); //15
   ```
### 3.2.1. 충돌 회피
변수와 함수를 스코프 안에 '숨기는 것'의 또 다른 장점은 같은 이름을 가졌지만 다른 용도를 가진 두 확인자가 충돌하는 것을 피할수 있음
```javascript
function foo(){
  function bar(a){
    i = 3;
    console.log(a+i);
  }
  for(var i = 0;i<10;i++){
    bar(i*2);
  }
}
foo();
```
- 글로벌 네임스페이스 : 라이브러리끼리 충돌 해결(최상위 스코프의 확인자 x , 속성 형태로 라이브러리 기능 노출)
- 모듈관리 : 어떤 라이브러리도 확인자를 글로벌 스코프에 추가할 필요없이, 특정 스코프로부터 의존성 관리자를 이용한 명시적인 방법으로 확인자를 가져와 사용 가능


## 3.3.스코프 역할을 하는 함수
```javascript
  var a = 2;
  function foo(){
    var a = 3;
    console.log(a);
  }
  foo();
  console.log(a);

  ///////////////////////

  var a = 2;
  (function foo(){
    var a = 3;
    console.log(a);
  })();
  console.log(a);

```

### 3.3.1. 익명 vs 기명
> 함수표현식 단점
- 익명 함수는 스택 추적시 표시할 이름이 없어서 디버깅이 더 어려울 수 있다.
- 이름 없이 ㅎ마수 스스로 재귀 호출을 하려면 불행히도 폐기 예정인 arguments.callee 참조가 필요<br>
  자기 참조가 필요할 또 다른 예로는 한번 실행하면 해제되는 이번트 처리 함수가 있다.
- 이름은 보통 쉽게 이해하고 읽을 수 있는 코드 작성에 도움이 되는데 익명함수는 그러지 못함.

> 함수 표현식에도 이름을 항상 쓰는게 특별한 부작용이 없고 좋다!

### 3.3.2. 함수 표현식 즉시 호출하기
```javascript
var a = 2;
  (function foo(){
    var a = 3;
    console.log(a);
  })();
  console.log(a);
  //(function foo(){})() > 첫번째 괄호는 표현식으로 바꾸고, 두번쨰 괄호는 함수를 실행시킴
  // > 즉시 함수 호출 표현식(IIFE)
```
```javascript
  undefined = true;
  (function IIFE(undefined){
    var a;
    if(a === undefined){
      console.log("undefined is safe here!");
    }
  })();
```

## 3.4 스코프 역할을 하는 블록
> 블록스코프의 목적
- 변수를 최대한 사용처 가까이에서 최대한 작은 유효범위를 갖도록 선언
- 자바스크립트는 블록 스코프를 지원하지 않는다.
- with, try/catch, let, const, 가바지 콜렉션

# 4. 호이스팅
> 변수와 함수 선언문은 선언된 위치에서 코드의 꼭대기로 끌어올려서 동작하는 방식
```javascript
a = 2;
var a;
console.log(a);//2
///////////////////////
console.log(a);//undefined
var a = 2;
```
## 4.1.
## 4.2.
## 4.3. 함수가 먼저다
> 호이스팅시 변수와 함수선언문이 모두가 올라가지만 함수가 먼저 끌어올려지고, 변수가 그다음에 올려진다.

# 5. 스코프 클로저
## 5.1
## 5.2
>클로저 : 함수가 속한 렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때에도 이 스코프에 접근할 수 있게 하는 기능
```javascript
function foo(a){
  var a = 2;
  function bar() {
    console.log(a);
  }
  bar();
}
foo();
```
함수 bar()는 foo() 스코프에 대한 클로저를 가진다..(,ㅡㅡ 먼말이지?)
```javascript
function foo(a){
  var a = 2;
  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); //bar()가 외부에서 실행이 됬음
```
## 5.3. 이제 나는 볼 수 있다.
```javascript
function wait(message){
  setTimeout(function timer(){
    console.log(message);
  },1000);
}
wait("hello");
```
## 5.4 반복문과 클로저
```javascript
for(var i=1;i<=5;i++){
  setTimeout(function timer(){
    console.log(i);
  },i*1000);
} // 돌려보자

```
## 5.5. 모듈
### 5.5.1 현재의 모듈
    






