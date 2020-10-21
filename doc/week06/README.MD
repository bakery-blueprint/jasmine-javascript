# 객체

## 1. 선언 형식

- 리터럴 형식

```javascript
var myObj = {
  key: value,
};
```

- 생성자 형식

```javascript
var myObj = new Object();
myObj.key = value;
```

- 차이점 : 리터럴 형식은 프로퍼티를 한번에 추가 가능, 생성자 형식은 한 번에 한 프로터피만 추가 가능

## 2. 타입

주요 타입은 아래와 같다.

- null
- undefined
- boolean
- number
- string
- object
- symbol

> '단순 원시 타입(string, number, boolean, null, undefined)'은 객체가 아니다! null 타입은 단순한 언어 자체의 버그(typeof null) 에서 비롯된 오해

'복합 원시 타입'

- 객체 하위 타입
- 한개 이상의 원시 값이나 복합 객체를 저장할 수 있음
- 자바스크립트 함수는 기본적으로 객체 -> 인자로 전달 가능

### 2.1. 내장 객체

내장 객체라 부르는 객체 하위 타입도 있음

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

> 단순 생성자로 사용되어 주어진 하위 타입의 객체를 생성하는 내장 함수일 뿐이다.

```javascript
var strPrimitive = "나는 문자열~";
typeof strPrimitive; //  string
strPrimitive instanceof String; // false

var strObject = new String("나는 문자열~");
typeof strObject; //  object
strObject instanceof String; // true

Object.prototype.toString.call(strObject); // [object String]
```

- 문자 개수를 세는 등 정의된 행동을 할 때엔 String 객체가 필요하다.
- 다행이도 자바스크립트 엔진은 상황에 맞게 문자열 원시 값을 String 객체로 자동 강제 변환 한다.
- Date 값은 리터럴로 표시할 수 없어서 반드시 생성자 형식으로 생성해야 한다.
- Objects, Arrays, Functions, RegExps 는 선언 형식과 무관하게 모두 객체다.

## 3. 내용

```javascript
var myObject = {
  a: 2,
};

myObject.a;
myObject["a"];
```

- myObject 객체에서 a 위치의 값에 접근하려면 '.' 연산자 또는 '[]' 연산자를 사용한다.
- 일반적으로 '.' 구문을 '프로퍼티 접근', '[]' 구문을 '키 접근' 이라고 한다.
- 키 접근 구문을 사용하면 문자열을 프로그램으로 조합하여 프로퍼티에 접근 가능하다.

### 3.1. 프로퍼티 메소드

- 프로퍼티 접근을 통해 함수를 가져 왔다고 해도 이것을 '메소드' 라고 부르기에는 의미를 확대 해석한것이다.

```javascript
function foo() {
  console.log("foo");
}

var someFoo = foo; // 'foo' 에 대한 변수 레퍼런스
var myObj = {
  someFoo: foo,
};
foo; // function(){..}
someFoo; //function(){..}
myObj.someFoo; //function(){..}
```

- 모두 동일한 함수를 가리키는 개별 레퍼런스 일 뿐, 객체가 소유한 함수는 아님
- 사실 '프로퍼티 접근' 이냐 '메소드 접근' 이냐는 그렇게 중요한건 아니다.

### 3.2. 배열

- 숫자 인덱싱과 같은 양수로 표기된 위치에 값을 저장한다.
- 배열 자체도 객체여서 배열에 프로퍼티를 추가하는 것도 가능하다(배열 길이는 변함 없다).
- 키/값 저장소는 객체, 숫자 인덱스를 가진 저장소는 배열을 쓰자
