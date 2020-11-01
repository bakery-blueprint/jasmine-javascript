# 객체

## 1. 선언 형식

-   리터럴 형식

```javascript
var myObj = {
    key: value,
};
```

-   생성자 형식

```javascript
var myObj = new Object();
myObj.key = value;
```

-   차이점 : 리터럴 형식은 프로퍼티를 한번에 추가 가능, 생성자 형식은 한 번에 한 프로터피만 추가 가능

## 2. 타입

주요 타입은 아래와 같다.

-   null
-   undefined
-   boolean
-   number
-   string
-   object
-   symbol

> '단순 원시 타입(string, number, boolean, null, undefined)'은 객체가 아니다! null 타입은 단순한 언어 자체의 버그(typeof null) 에서 비롯된 오해

'복합 원시 타입'

-   객체 하위 타입
-   한개 이상의 원시 값이나 복합 객체를 저장할 수 있음
-   자바스크립트 함수는 기본적으로 객체 -> 인자로 전달 가능

### 2.1. 내장 객체

내장 객체라 부르는 객체 하위 타입도 있음

-   String
-   Number
-   Boolean
-   Object
-   Function
-   Array
-   Date
-   RegExp
-   Error

> 단순 생성자로 사용되어 주어진 하위 타입의 객체를 생성하는 내장 함수일 뿐이다.

```javascript
var strPrimitive = '나는 문자열~';
typeof strPrimitive; //  string
strPrimitive instanceof String; // false

var strObject = new String('나는 문자열~');
typeof strObject; //  object
strObject instanceof String; // true

Object.prototype.toString.call(strObject); // [object String]
```

-   문자 개수를 세는 등 정의된 행동을 할 때엔 String 객체가 필요하다.
-   다행이도 자바스크립트 엔진은 상황에 맞게 문자열 원시 값을 String 객체로 자동 강제 변환 한다.
-   Date 값은 리터럴로 표시할 수 없어서 반드시 생성자 형식으로 생성해야 한다.
-   Objects, Arrays, Functions, RegExps 는 선언 형식과 무관하게 모두 객체다.

## 3. 내용

```javascript
var myObject = {
    a: 2,
};

myObject.a;
myObject['a'];
```

-   myObject 객체에서 a 위치의 값에 접근하려면 '.' 연산자 또는 '[]' 연산자를 사용한다.
-   일반적으로 '.' 구문을 '프로퍼티 접근', '[]' 구문을 '키 접근' 이라고 한다.
-   키 접근 구문을 사용하면 문자열을 프로그램으로 조합하여 프로퍼티에 접근 가능하다.

### 3.1. 프로퍼티 메소드

-   프로퍼티 접근을 통해 함수를 가져 왔다고 해도 이것을 '메소드' 라고 부르기에는 의미를 확대 해석한것이다.

```javascript
function foo() {
    console.log('foo');
}

var someFoo = foo; // 'foo' 에 대한 변수 레퍼런스
var myObj = {
    someFoo: foo,
};
foo; // function(){..}
someFoo; //function(){..}
myObj.someFoo; //function(){..}
```

-   모두 동일한 함수를 가리키는 개별 레퍼런스 일 뿐, 객체가 소유한 함수는 아님
-   사실 '프로퍼티 접근' 이냐 '메소드 접근' 이냐는 그렇게 중요한건 아니다.

### 3.2. 배열

-   숫자 인덱싱과 같은 양수로 표기된 위치에 값을 저장한다.
-   배열 자체도 객체여서 배열에 프로퍼티를 추가하는 것도 가능하다(배열 길이는 변함 없다).
-   키/값 저장소는 객체, 숫자 인덱스를 가진 저장소는 배열을 쓰자

### 3.3. 객체 복사

```javascript
function anotherFunction() {
    /**/
}

var anotherObject = {
    c: true,
};

var anotherArray = [];

var myObject = {
    a: 2,
    b: anotherObject,
    c: anotherArray,
    d: anotherFunction,
};

anotherArray.push(anotherObject, myObject);
```

-   위 예제에서 b,c,d 프로퍼티는 원 객체의 레퍼런스만 가지고 있음
-   만약 위 예제가 깊은 복사라도 환형 참조 형태가 나타남
-   JSON 을 통한 직렬화 후 다시 객체로 만드는 복사 대안이 있음
    -   느림
    -   JSON.stringify 메소드가 function을 undefined로 처리
-   Object.assign() 메서드를 제공해서 얕은 복사를 제공함
-   깊은 복사 직접구현 (https://junwoo45.github.io/2019-09-23-deep_clone/)

```javascript
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const result = Array.isArray(obj) ? [] : {};

    for (let key of Object.keys(obj)) {
        result[key] = deepClone(obj[key]);
    }

    return result;
}

const original = {
    a: 1,
    b: {
        c: 2,
    },
    d: () => {
        console.log('hi');
    },
};

const copied = deepClone(original);

original.a = 1000;
original.b.c = 2000;
original.d = () => {
    console.log('bye');
};

console.log(copied.a); // 1
console.log(copied.b.c); // 2
console.log(copied.d()); // 'hi'
```

### 3.4. 프로퍼티 서술자

-   조회를 해보면 writable, enumerable, configurable 세가지 특성이 있음

#### 3.4.1. 쓰기 가능 (writable)

```javascript
// "use strict"; 에서는 에러 발생
var myObject2 = {};

Object.defineProperty(myObject2, 'a', {
    value: 3,
    writable: false,
    configurable: true,
    enumerable: true,
});
myObject2.a = 4;
myObject2.a; //  3
```

#### 3.4.2. 설정 가능 (configurable)

-   configurable 속성을 false
-   한번 설정하면 Object.defineProperty 메소드를 통한 변경시 에러가 발생한다.
-   writable 까지 false 로 설정할 경우 영영 변경할 수 없다.

#### 3.4.3. 열거 가능 (enumerable)

-   enumerable : true

```javascript
var myObject = {
    a: 1,
    b: 2,
};

for (var o in myObject) {
    console.log(o + ' : ' + myObject[o]);
}
// a : 1
// b : 2
```

-   enumerable : false

```javascript
Object.defineProperty(myObject, 'b', {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: false,
});
for (var o in myObject) {
    console.log(o + ' : ' + myObject[o]);
}
// a : 1
```

### 3.5 불변성

-   얕은 불변성을 지원하는 방법을 제공
-   다른 객체를 가르키는 레퍼런스가 있을 때 해당 객체의 내용까지 불변으로 만들지는 못함

#### 3.5.1. 객체 상수

```javascript
var myObject = {
    a: 1,
    b: 2,
};

Object.defineProperty(myObject, 'MY_NAME', {
    value: 'LIM',
    writable: false,
    configurable: false,
});
// {a: 1, b: 2, MY_NAME: "LIM"}

Object.getOwnPropertyDescriptor(myObject, 'MY_NAME');
// {value: "LIM", writable: false, enumerable: false, configurable: false}
```

-   위 예제에서 왜 enumerable 기본값이 false?? -> [설명]([https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty, 'MDN 링크')

#### 3.5.2. 확장 금지

-   객체에 더는 프로퍼티를 추가할 수 없게함 -> 확장 불가

```javascript
var myObj = {
    a: 2,
};
// a : {value: 2, writable: true, enumerable: true, configurable: true}

Object.preventExtensions(myObj);
// a: {value: 2, writable: true, enumerable: true, configurable: true}

myObj.a = 4;
// {a: 4}

myObj.d = 4;
myObj.d; // undefined, 엄격모드에서는 에러
```

-   추가는 가능

#### 3.5.3. 봉인

-   변경과 확장이 불가능

```javascript
var myObj = {
    a: 2,
};

Object.getOwnPropertyDescriptor(myObj, 'a');
// {value: 2, writable: true, enumerable: true, configurable: true}

Object.preventExtensions(myObj);
Object.getOwnPropertyDescriptor(myObj, 'a');
// {value: 2, writable: true, enumerable: true, configurable: true}

myObj.b = 4;
myObj.b; // undefined

Object.defineProperty(myObj, 'a', {
    value: 4,
    writable: true,
    configurable: false,
    enumerable: true,
});

Object.defineProperty(myObj, 'a', {
    value: 4,
    writable: true,
    configurable: true,
    enumerable: true,
}); //  TypeError : Cannot redefine property: a

myObj.a = 6;
myObj.a; // 6
```

#### 3.5.4. 동결

-   봉인 + writable:false 로 변경
-   직속 프로퍼티는 전부 동결
-   참조하는 레퍼런스에 해당하는 객체 값은 변경 안함

```javascript
var anotherObj = {
    a: 1,
};

var anotherArray = [1];

var myObj = {
    obj: anotherObj, // 참조 레퍼런스
    arr: anotherArray, // 참조 레퍼런스
    val: 4,
    o: {
        b: 5,
    },
};
Object.getOwnPropertyDescriptors(myObj);
/*
arr: {value: Array(1), writable: true, enumerable: true, configurable: true}
o: {value: {…}, writable: true, enumerable: true, configurable: true}
obj: {value: {…}, writable: true, enumerable: true, configurable: true}
val: {value: 4, writable: true, enumerable: true, configurable: true}
 */

Object.freeze(myObj);

/*
arr: {value: Array(1), writable: false, enumerable: true, configurable: false}
o: {value: {…}, writable: false, enumerable: true, configurable: false}
obj: {value: {…}, writable: false, enumerable: true, configurable: false}
val: {value: 4, writable: false, enumerable: true, configurable: false}
*/

Object.getOwnPropertyDescriptors(anotherObj);
// {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptors(anotherArray);
// 0: {value: 1, writable: true, enumerable: true, configurable: true}
```

> # 과제 1. deep freeze 하는 메소드를 작성하시오 (window 객체일 경우에는 freeze 를 패스하는 하는 로직도 추가하시오)

```javascript
function deepFreeze(targetObj) {
    
    for (var key in targetObj) {
        for (var key in targetObj) {
            targetObj[key] =
                targetObj[key] &&
                typeof targetObj[key] === 'object' &&
                !Object.isFrozen(targetObj[key]) &&
                window != targetObj[key]
                    ? deepFreeze(targetObj[key])
                    : targetObj[key];
        }

    return Object.freeze(targetObj);
}
```

### 3.6. [[Get]]

-   실제 프로퍼티에 접근할때 [[Get]] 연산을 통해 접근
-   프로퍼티 값을 찾을 수 없다면 undefined를 반환

### 3.7. [[Put]]

-   값을 할당하는 연산
-   프로퍼티가 접근 서술자인지, writable:false 인 데이터 서술자인가?
-   데이터 값 셋팅

### 3.8 게터와 세터

-   [[Put]] 연산과 [[Get]] 연산은 프로퍼티에 값을 세팅하거나 조회하는 역할을 담당
-   프로퍼티 수준에서 기본 게터/세터를 오버라이드 할 수 있음
-   가능하다면 게터와 세터 둘다 동시 선언 해주자

```javascript
var person = {
    firstName: 'jaehyun',
    lastName: 'lim',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    set fullName(value) {
        var parts = value.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
    },
};

console.log(person.fullName);
// "jaehyun lim"
person;
// {firstName: "jaehyun", lastName: "lim"}

person.fullName = 'demo lim';
console.log(person.fullName);
// "demo lim"
person;
// {firstName: "demo", lastName: "lim"}
```

### 3.9. 존재 확인

-   객체에 어떤 프로퍼티가 존재하는지 확인하는 방법

```javascript
var myObj = {
    a: 2,
};

'a' in myObj; // true
'b' in myObj; // false

myObj.hasOwnProperty('a'); // true
myObj.hasOwnProperty('b'); // false
```

### 3.10. 열거

-   프로퍼티 서술자 속성 중 하나인 enumerable로 설정
-   프로퍼티로 그 값에 접근할 수 있찌만 foo...in 루프에서는 안보임

## 4. 순회

-   for...in 루프는 열겨 가능한 객체 프로퍼티를 차례로 순회한다.
-   그러나 for 문과 for...in 구문은 인덱스를 통한 간접 접근이지 값 자체를 순회하는건 아니다.
-   값 자체를 순회하기 위해서는 순회하려는 대상안에 @@iterator 라는 기본 내부 함수가 존재해야 한다.
-   일반 객체에는 @@iterator 라는 기본 내부 함수가 존재하지 않는다.
-   이것을 직접 정의 할 수 있다.

> # 과제 2.
>
> 1. 객체를 리터럴 형식으로 하나 선언하고 프로퍼티를 선언하세요
> 2. 객체안에 있는 모든 프로퍼티를 표현하는 getter 를 선언하세요
>
> ```javascript
> // ex
> var person = {
>     firstName: 'jaehyun',
>     lastName: 'lim',
>     get fullName() {
>         return this.firstName + ' ' + this.lastName;
>     },
>     set fullName(value) {
>         var parts = value.split(' ');
>         this.firstName = parts[0];
>         this.lastName = parts[1];
>     },
>     get allProperties() {
>         /* 작성 하시오*/
>     },
> };
> // 출력 :
> // jaehyun
> // lim
> // jaehyun lim
> ```

```javascript

...
get allProperties() {
  for(var key in this){
    console.log(this[key])
    }
}
...

Object.defineProperty(person, 'allProperties', {
    enumerable: false,
});

```

# 클래스와 객체의 혼합

## 1. 클래스 이론

-   데이터 - 행위를 잘 묶어 캡슐화 한 설계를 자료 구조라고 한다.
-   클래스는 특정 자료구조를 분류 하는 용도로 쓴다.
-   상위 개념에 기반정의를 상속 받을 수 있다.
-   부모 클래스의 정의를 구체화하고 재정의 하는것을 다형성이라고 한다.
-   자바스크립트에서는 부모의 클래스를 오버라이드하는 과정중 예기치 않은 결과를 초래하기도 한다.

### 1.1. 클래스 디자인 패턴

-   다른 디자인 패턴들처럼 클래스 역시 하나의 '패턴'이 아닐까?
-   클래스는 당연히 디자인 패턴을 구현할때 사용되는 체계일까?
-   절차형 프로그래밍에서는 체계적인 코드로 정리하는데 클래스를 사용하고 있다.
-   함수형 프로그래밍 에서 클래스는 단지 많이 쓰는 디자인 패턴중 하나일 뿐이다.

### 1.2. 자바스크립트 클래스

-   자바스크립트에서는 클래스가 있는것일까? -> NO
-   외관상으로는 클래스 처럼 생긴 구문을 제공하고 있다.

## 2. 클래스 체계

### 2.1. 건축

-   청사진 -> 클래스
-   실제 건축물 -> 객체

### 2.2. 생성자

-   보통 생성자라는 특별한 메소드로 인스턴스를 생성함

## 3. 클래스 상속

-   부모 클래스를 상속받아 동작을 수행할 수도 있지만, 전혀 새로운 방식으로 오버라이드 할 수 있다.

### 3.1. 다형성

-   상속받은 원본 메소드를 참조
-   이런 경우를 '상대적' 다형성이라고 함
-   한 메서드가 상속 체계에서 다른 메서드를 참조할 수 있게 해주는데, 메소드 선택에 대해 자신일 수도 있고 상위 수준의 메소드 일 수도 있따.
-   인스턴스가 어떤 클래스를 참조하느냐에 따라서 상대적 다형석이 작용한다.
-   자식 클래스가 부모 클래스에게 연결된건 아니다, 그저 필요한 내용을 복사해온 것이다.

### 3.2. 다중 상속

-   다이아몬드 문제, 마름모 문제로 불리는 다중상속 문제가 있다.
-   부모가 동일한 행동을 정의 했을때, 자식에서는 어떤 행동을 참조할까?

### 4. 믹스인

-   자바스크립트는 상속 또는 인스턴스화를 통한 복사 작업이 일어나지 않는다.
-   믹스인은 누락된 클래스 복사 기능을 흉내 낸 것으로 명시적 / 암시적 믹스인이 있다.

#### 4.1. 명시적 믹스인

-   Source 에서 Target 으로 명시적으로 특정 작동을 복사하는 행위
-   함수의 사본 레퍼런스만 복사한다.

-   자바스크립트는 상대적 다형성을 제공하지 않음

```javascript
...
Vechicle.drive.call(this);
// drive 호출을 위해 Vechicle을 명시
```

-   하지만 위 코드로 호출을 하면 this는 Vechicle 객체와 바인딩일 일어남 -> 그래서 명시적으로 this를 붙여서 실행

-   복사하는 방법중 빈 객체를 만들고 source 를 복사후 필요한 특정한 내용만 복사 가능함
-   방법이야 어떻든 객체에 객체를 섞어 넣는 과정을 믹스인이라 부른다.
-   물론 관리가 어렵기 때문에 쓰지말자

#### 4.1. 암시적 믹스인

-   객체 복사 과정을 통한 기능 가지고 오기가 아니라 호출시 해당 기능을 가지고 있는 객체를 호출해서 컨텍스트만 this로 설정함
