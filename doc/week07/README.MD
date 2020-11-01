# 5.프로토타입

## 5.1. [[Prototype]]

- Prototype : 원형. 같거나 비슷한 여러 개가 만들어져 나온 본바탕.
              Ex) the prototype of the modern bicycle
              
- 명세에 따르면 자바스크립트 객체는 [[Prototype]]이라는 내부 프로퍼티가 있고 다른 객체를 참조하는 단순 레퍼런스로 사용한다.

```javascript
var myObject = {
      a:2
};
myObject.a; //2
myObject; // 직접 해서 보기.
```
- myObject에 a란 프로퍼티가 없으면 다음 관심사는 이 객체의 [[Prototype]] Link이다.
- [[Prototype]] 링크를 따라가면서 수색 작전을 벌인다.

```javascript
var anotherObject = {
      a:2
};

var myObject = Object.create(anotherObject);
myObject.a;
anotherObject; // 직접 해서 보기.
myObject; // 직접 해서 보기. 
```


### 5.1.1 Object.prototype

- [[Prototype]] 연쇄가 끝나는 지점은 정확히 어디인가? 
  일반 [[Protorype]] 연쇄는 결국 내장 프로토타입 Object.prototype에서 끝난다.
- JAVA의 최상위 객체 java.lang.Object
  Javascript는 Object.protorype.

```javascript
Object.prototype;

Result : 
constructor: ƒ Object()
hasOwnProperty: ƒ hasOwnProperty()
isPrototypeOf: ƒ isPrototypeOf()
propertyIsEnumerable: ƒ propertyIsEnumerable()
toLocaleString: ƒ toLocaleString()
toString: ƒ toString()
valueOf: ƒ valueOf()
__defineGetter__: ƒ __defineGetter__()
__defineSetter__: ƒ __defineSetter__()
__lookupGetter__: ƒ __lookupGetter__()
__lookupSetter__: ƒ __lookupSetter__()
get __proto__: ƒ __proto__()
set __proto__: ƒ __proto__()
```


### 5.1.2. 프로퍼티 세팅과 가려짐.

- 하나의 프로퍼티명이 한 객체를 기점으로 [[Prototype]] 연쇄의 상위 수준 두 곳에서 동시에 발견될 때
  이를 '가려짐(Shadowing)'이라 한다.

> Ex. myObject => anotherObject => Object
> 1. foo라는 이름의 프로퍼티가 [[Prototype]] 연쇄 상위 수준에 존재하는데, 읽기 전용이 아닐 경우 myObject의 직속 프로퍼티 foo가 추가되어
>    'Shadowed Property'가 된다.
> 2. foo라는 이름의 프로퍼티가 [[Prototype]] 연쇄 상위 수준에 존재하는데, 읽기 전용이면 가려짐으로 myObject에 foo가 추가되지 않는다.
> 3. [[Prototype]] 연쇄 상위 단계에서 발견된 foo가 세터일 경우 세터가 호출되며, 가려짐이 일어나지 않는다.

```javascript
var anotherObject = {
    a: 2
};

var myObject = Object.create(anotherObject);
anotherObject.a;
myObject.a;

anotherObject.hasOwnProperty("a"); //true
myObject.hasOwnProperty("a");      //false

myObject.a++;
myObject.a; //3
myObject.hasOwnProperty("a");      //true
```


## 5.2. 클래스

- [[Prototype]]이 '아닌 것'은?
- 자바스크립트는 클래스 지향 언어에서 제공하는 클래스라는 추상화된 패턴이나 설계가 없다.
- Only 객체(Object)만 있을 뿐이다.
- 자바스크립트에서 객체는 전부 function이다.

### 5.2.1. 클래스 함수

- Foo.prototype; 이 객체를 Foo의 프로토타입이라고 한다.
- constructor는 Foo function을 가르키고,
  proto는 상위 링크된 prototype 객체로 링크된다.
  
```javascript
function Foo() {
   //...
}
Foo.prototype; //{ }

# Result
{constructor: ƒ}
  constructor: ƒ Foo()
  __proto__: Object
```

- new Foo()로써 만들어진 모든 객체는 결국 'Foo.protorype' 객체와 [[Prototype]] 링크로 연결된다.

```javascript
function Foo() {
   //...
}
var a = new Foo();
Object.getPrototypeOf(a) === Foo.prototype; // true
```

> 클래스 Vs. 프로토타입
> 클래스 : 붕어빵 틀에서 붕어빵을 구워내듯 한 클래스를 다중 복사함. '클래스 작동 계획을 실제 객체로 복사'
> 프로토타입 : 복사 과정이 없고 클래스에서 여러 인스턴스를 생성할 수도 없다.
>           [[Prototype]]으로 연결된 객체를 다수 생성하는 건 가능하지만 기본적으로 어떠한 복사가 없다.
>           따라서, 자바스크립트 객체는 서로 완전히 떨어져 분리된 것이 아니라 끈끈하게 연결된다.


### 5.2.2. 생성자

- p.123 그림.
- Foo.prototype 객체에는 기본적으로 .constructor가 세팅됨.
- constructor는 객체 생성과 관련된 함수(Foo)를 다시 참조하기 위한 레퍼런스
- a.constuctor 프로퍼티도 Foo에 대응함.
  하지만, 실제도 .constructor가 존재하지 않음.
  
  
```javascript
function Foo() {
  //....
}
Foo.prototype.constructor === Foo; //true

var a = new Foo();
a.constructor === Foo; //true
```

> 생성자냐 호출이냐?
> Foo는 생성자가 아닌 Just 함수이다. 하지만, new를 붙여 호출하는 순간 '생성자 호출'을 한다.
> new 키워드는 일반 함수 호출을 도중에 가로채어 원래 수행할 작업 외에 객체 생성이라는 잔업을 더 부과하는 지시자다.
> 함수는 결코 생성자가 아니지만 new를 사용하여 호출할 때에만 '생성자 호출'이다. 
>
>```javascript
>function NothingSpecial() {
>  console.log("웃지마!");
>}
>var a = new NothingSpecial();
>a;
>```


### 5.2.3. 체계

- Foo.prototype 객체의 프로퍼티/함수가 a,b 생성 시 각각의 객체로 복사될 거라 짐작하기 쉽지만,
  절대로 아니다!
- a,b는 생성 직후 각자의 내부 [[prototype]]이 Foo.prototype에 링크된다. 
  myName은 a,b에서 찾을 수 없으므로 위임을 통해 Foo.prototype에서 찾는다.

```javascript
function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function() {
  return this.name;
};

var a = new Foo("a");
var b = new Foo("b");

a.myName(); //a
b.myName(); //b
```

> 돌아온 '생성자'
> constructor : 제작자.
> a.constructor는 Foo.prototype에 위임된 레퍼런스로서 Foo를 가르킨다.
> 하지만, Foo에 의해 생성된 객체 a가 .constructor 프로퍼티를 통해 Foo에 접근할 수 있는 것은 바람직하지 않다.
> Foo()가 생성의 주체라고 여기지만 '생성자'가 '~에 의해 생성됨'이란 뜻이라고 착각하는 순간 와르르 무너진다.
> .constuctor는 불변 프로퍼티가 아니며, 변경할 수 있다.
>
>```javascript
>function Foo() {};
>Foo.protorype = {};
>
>var a1 = new Foo();
>a1.constructor === Foo;    //false
>a1.constructor === Object; //true
>
> Object.defineProperty(Foo.prototype, "constructor", {
>         //.......
>});
>```



## 5.3. 프로토타입 상속

- p129. 그림 참조
- p130. 그림 참조
- Foo - Foo.prototype / Bar - Bar.prototype / Bar.prototype - Foo.prototype
- Object.create MDN 명세.
  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create

```javascript
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

//Bar.prototype을 Foo.prototype에 연결한다.
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.myLabel = function() {
  return this.label;
};

var a = new Bar("a","obj a");
a.myName();
a.myLabel();
```

> prototype 연결 잘못된 예제.
>```javascript
>Bar.prototype = Foo.prototype;
>Bar.prototype = new Foo();
>```
> 1. Bar.prototype = Foo.prototype 은 Bar, Foo를 나눌 필요가 없는 방법이다.
> 2. Bar.prototype이 Foo의 .construct와 Foo.prototype의 proto link를 가지게 되어 의미가 없다.
> Bar.prototype을 유지한 채, proto link만 Object가 아닌 Foo.prototype으로 연결하여 사용해야한다.
>
> ES6이전 Vs. ES6이후
>```javascript
>//ES6 이전
>Bar.prototype = Object.create(Foo.prototype);
>//ES6 이후
>Object.setPrototypeOf(Bar.prototype, Foo.prototype);
>```

### 5.3.1. 클래스 관계 조사

- Java는 리플렉션(Reflection)
- Javascript에서 객체의 '계통'(위임 링크)은 어떻게 확인할 수 있을까?
- 위임 링크 : Bar.prototype = Object.create(......);

```javascript
Foo.prototype.isPrototypeOf(a);

//c의 [[Prototype]] 연쇄 어딘가에 b가 존재하는가?
b.isPrototypeOf(c);

Object.getPrototypeOf(a);
Object.getPrototypeOf(a) === Foo.prototype;

//Dunder Proto.
//a.__proto__는 마치 Object.getPrototypeOf(a)와 같은 방식으로 호출됨.
a.__proto__ === Foo.prototype;
```


## 5.4. 객체 링크

- [[Prototype]] 체계는 다른 객체를 참조하는 어떤 객체에 존재하는 내부 링크.
- 프로토타입 연쇄(Prototype Chain)이라 한다.

### 5.4.1. 링크 생성

- [[Prototype]] 체계의 핵심은? 위임이다.
- Object.create() 영웅이다.
  클래스나 생성자 호출, .prototype이나 .constructor 레퍼런스 등 헷갈리지 않음.
  [[Prototype]] 체계의 진정한 힘(위임).

```javascript
var foo = {
      something: function() {
            console.log("aaaa");
      }
};

var bar = Object.create(foo);
bar.something();
```
> Object.create(null)은 [[Prototype]] 링크가 빈 객체를 생성하므로 위임할 곳이 없다.
> 일차원적인 데이터 저장소로 제격이고, 보통 '딕셔너리(Dictionary)'라고 한다.

> Object.create() 폴리필
> Object.create()의 두 번째 인자는 새로 만든 객체에 추가할 프로퍼티로서 기재하여 사용할 수 있다.
>
>```javascript
>var o;
>
>// 프로토타입이 null인 객체 생성
>o = Object.create(null);
>
>
>o = {};
>// 위는 아래와 같습니다:
>o = Object.create(Object.prototype);
>
>
>// 샘플 속성 두개를 갖는 객체를 만드는 예.
>// (두 번째 매개변수는 키를 *속성 설명자*에 맵핑함을 주의하세요.)
>o = Object.create(Object.prototype, {
>  // foo는 정규 '값 속성'
>  foo: { writable: true, configurable: true, value: 'hello' },
>  // bar는 접근자(accessor, getter-및-setter) 속성
>  bar: {
>    configurable: false,
>    get: function() { return 10; },
>    set: function(value) { console.log('Setting `o.bar` to', value); }
>/* ES5 접근자로 코드는 이렇게 할 수 있습니다
>    get function() { return 10; },
>    set function(value) { console.log('setting `o.bar` to', value); } */
>  }
>});
>```


### 5.4.2. 링크는 대비책?

- 객체 간 연결 시스템을 프로퍼티/메서드를 찾지 못할 경우를 위한 대비책 x.
- [[Prototype]]으로 에러 없이 실행되지만 유지보수가 쉽지 않다.

```javascript
var anotherObject = {
    cool: function() {
        console.log("Cool");
    }
};

var myObject = Object.create(anotherObject);
myObject.cool();
```

- myObject.doCool() 메서드는 myOjbect에 실제로 존재하므로 더욱 명시적인 API.
- 이렇게 활용하는게 더 좋다는게 저자의 생각.

```javascript
var anotherObject = {
    cool: function() {
        console.log("Cool");
    }
};

var myObject = Object.create(anotherObject);
myObject.doCool = function() {
    this.cool(); //내부 위임이다.
};

myObject.cool();
```
