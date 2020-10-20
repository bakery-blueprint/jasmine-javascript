### 1.1 this를 사용하는 이유?
- 함수 사용시 객체별로 따로따로 함수를 사용할 필요 없이 this를 사용해서 재사용 할 수 있다.

 ```javascript
 function identify() {
     return this.name.toUpperCase();
 }
 function speak() {
     var greeting = "Hello I'm " + identify.call(this);
     console.log(greeting);
 }
 var me = {
     name : "Kyle"
 }
 var you = {
     name : "Reader"
 }

 identify.call(me); 
 identify.call(you);
 speak.call(me);
 speak.call(you);
 ```

 ### 1.2.1 this는 자기 자신이 아니다.
 ``` javascript
 function foo(num) {
     console.log("foo: " + num);
     this.count++;
 }

 foo.count = 0;
 for (var i = 0; i < 10; i++) {
     if (i > 5) {
         foo(i);
     }
 }
 console.log(foo.count);            //0 출력.
 ```

 ### 1.2.2 this는 자기 자신 함수의 스코프를 가리키는 것이 아니다.
 - this는 어떤 식으로도 함수의 렉시컬 스코프를 참조하지 않는다.
 - 스코프 객체는 자바스크립ㅌ트 구현체인 엔진의 내부 부품이기때문에 일반 자바스크립트 코드로는 접근하지 못함.

 ### 1.3 javascript에서 this란?
- Java에서의 this는 인스턴스 자신(self)을 가리키는 참조변수이다. this가 객체 자신에 대한 참조 값을 가지고 있다는 뜻
- javascript는 Java와 같이 this에 바인딩되는 객체는 한가지가 아니라 해당 함수 호출 방식에 따라 this에 바인딩되는 객체가 달라진다.

### 2.1 호출부
- this 바인딩의 개념을 이해하려면 먼저 호출부, 즉 함수 호출 코드부터 확인하고 'this가 가리키는 것'이 무엇인지 찾아봐야한다.

#### 2.1.1 기본바인딩
- 단독 함수 실행에 관한 규칙으로 나머지 규칙에 해당ㅎ지 않을 경우 적용되는 this의 기본규칙
``` javascript
function foo() {
    console.log(this.a);    //전역객체 a
}
var a = 2;  // 전역스코프에 변수 선언 시 변수명과 가은 이름의 전역객체 프로퍼티 생성(window.a)
foo();          
```
- foo() 호출 시 평범한 있는 그대로의 함수 래퍼런스로 호출-> 기본바인딩 적용
- "use strict"에서는 전역객체가 기본바인딩에서 제외

#### 2.2.2 암시적 바인딩
- 호출부에 콘텍스트 객체가 있는지, 객체의 소유/포함여부를 확인하는 것.
- 함수 레퍼런스에 대한 콘텍스트 객체가 존재할 때 암시적 바인딩 규칙에 따르면 콘텍스트 객체가 함수 호출 시 this에 바인딩 됨.
``` javascript
    functiom foo() {
        console.log(this);
    }

    var obj = {
        a : 3,
        foo: foo
    }

    obj.foo(); // 호출부에서는 obj 콘텍스트로 foo()를 참조하므로 obj 객체는 함수 호출 시점에 함수의 레퍼런스를 포함하거나 소유하고있다고 할수있음. foo 호출 시 obj가 this
```

- 암시적으로 바인딩 된 함수에서 바인딩이 소실되는 경우가 있음
```javascript
    function foo() {
        console.log(this.a);
    }

    var obj = {
        a : 2,
        foo : foo
    };

    var bar = obj.foo;      //obj의 foo를 참조하는 변수처럼 보이지만, foo를 직접 가리키는 또 다른 레퍼런스임.
    var a = "전역";
    bar();                  // 호출부에서 평범하게 호출하므로 "전역"으로 출력됨.
```
```javascript
    function foo() {
        console.log(this.a);
    }

    function doFoo(fn) {
        fn();
    }

    var obj = {
        a : 2,
        foo : foo
    };

    var a = "전역";
    doFoo(obj.foo);     //인자로 전달하는건 일종의 암시적인 할당으로 함수를 인자로 넘기면 암시적으로 래퍼런스가 할당되어서 "전역"으로 출력됨
```

#### 2.2.3 명시적 바인딩
- call(), apply() 를 통해 this를 지정한 객체로 직접 바인딩
- this에 바인딩할 객체를 첫번째 인자로 받아 함수 호출 시 이 객체를 this로 세팅.

```javascript
    function foo() {
        console.log(this.a);
    }

    var obj = {
        a : 2
    }

    foo.call(obj);          //foo.call에서 명시적으로 바인딩하여 함수를 호출하므로 this는 obj가 됨
```

- 명시적으로 바인딩 해도 this 바인딩이 도중에 소실되거나 프레임워크가 임의로 덮어버릴 수도 있다. -> 이럴땐 하드바인딩을 사용한다.

```javascript
    function foo() {
        console.log(this.a);
    }
    var obj = {
        a : 2
    }
    var bar = function() {
        foo.call(obj);          // 하드바인딩 : bar 함수 내부에서 foo.call(obj)로 foo를 호출하면서 obj를 this에 강제로 바인딩 하도록 하드 코딩
    }
    bar();                      //2
    setTimeout(bar, 100);       //2
    bar.call(window);           //2
```
- bar 함수 안에 foo.call로 하드바인딩 했기 때문에 뭘해도 obj로 바인딩 되어 2로 출력됨.

- 하드바인딩으로 함수를 감싸는 형태의 코드는 인자를 넘기고 반환 값을 돌려받는 창구가 필요할 때 주로 쓰임
- 재사용 가능한 헬퍼 함수도 반환 값을 돌려받는 창구가 필요할 때 쓰인다.
```javascript
    function foo(somthing) {
        console.log(this.a, something);
        return this.a + something;
    }

    function bind(fn, obj) {
        return function() {
            return fn.apply(obj, arguments);
        }
    }

    var obj = {
        a : 2
    }
    
    var bar = bind(foo, obj);
    var b = bar(3);             // 2 3
    console.log(b);             // 5
```
- ES5 내장 유틸리티 Function.prototype.bind()는 주어진 this 콘텍스트로 원본함수를 호출하도록 하드코딩된 새 함수를 반환
```javascript
    function foo(something) {
        console.log(this.a, something);
        return this.a + something;
    }

    var obj = {
        a : 2
    }
    var bar = foo.bind(obj);
    var b = bar(3);             // 2, 3
    console.log(b);             // 5
```

#### 2.2.4 new 바인딩
- 자바스크립트 생성자는 앞에 new 연산자가 있을 때 호출되는 일반 함수에 불과하다.
- 함수 앞에 new를 붙여서 생성자를 호출하면
1. 새 객체가 만들어진다.
2. 새로 생성된 객체의 [[prototype]]이 연결된다.
3. 새로 생성된 객체는 해당 함수 호출 시 this로 바인딩 된다.
4. 이 함수가 자신의 또 다른 객체를 반환하지 않는 한 new와 함께 호출된 함수는 자동으로 새로 생성된 객체를 반환

```javascript
    function foo(a) {
        this.a = a;
    }

    var bar = new foo(2);
    console.log(bar.a);
```
- 앞에 new를 붙여서 foo()를 호출했고, 새로 생성된 객체는 foo 호출시 this에 바인딩 된다.

### 2.3 우선순위

1. new로 함수를 호출? -> 맞으면 새로 생성한 객체가 this
```javascript
    var bar = new foo();
```
2. call과 apply로 함수를 호출, 이를테면 bind 하드바인딩 내부애 숨겨진 형태로 호출했는가? -> 맞으면 명시적으로 지정된 객체가 this
```javascript
    var bar = foo.call(obj2);
```
3. 함수를 콘텍스트(암시적 바인딩), 즉 객체를 소유 또는 포함하는 형태로 호출했는가? -> 맞으면 이 콘텍스트 객체가 this
```javascript
    var bar = obj.foo();
```
4. 그 외의 경우에 this는 기본값(엄격모드는 undefined, 비엄격 모드는 전역객체)로 세팅됨 -> 기본바인딩
```javascript
    var bar = foo();
```

### 2.4 바인딩 예외
- 특정 바인딩을 적용했는데 기본 바인딩이 적용되는 사례

#### 2.4.1 this 무시 
- call, apply, bind 메서드에 첫번째 인자로 null 또는 undefined를 넘기면 this바인딩이 무시되고 기본 바인딩 규칙이 적용됨
- apply(), bind()같은 경우는 함수 호출 시 다수의 인자를 배열 값으로 보내는 용도로 쓰이며, 이때 this 바인딩이 어떻게 되던 상관 없을 때 null, undefined를 보냄
- 다양한 버그가 생길 수 있으니 사용하지 말것.
```javascript
    function foo(a, b) {
        console.log("a:" + a + ", b:" + b);
    }
    // 인자들을 배열 형태로 펼침
    foo.apply(null, [2, 3]);    // a:2, b:3
    
    // bind()로 커링
    var bar = foo.bind(null, 2);
    bar(3); // a:2, b:3
```

- this 바인딩을 신경쓰지 않고 싶을 때마다 DMZ 객체(내용이 하나도 없으면서 전혀 위임되지 않은)를 전달하면, 받는 쪽에서 this를 어찌 사용하든지 대상은 빈 객체로 한정되므로 최소한 전역객체를 건드리는 부작용은 방지할 수 있음.
```javascript
    function foo(a, b) {
        console.log("a:" + a + ", b:" + b);
    }
    
    // DMZ 객체 생성
    var ∅ = Object.create(null);    // {}와 비슷하나 Object.prototype 으로 위임하지 않으므로 더 텅빈 객체임

    //인자들을 배열 형태로 쭉 펼침
    foo.apply(∅, [2,3]);
```

#### 2.4.2 간접 레퍼런스
```javascript
    function foo() {
        console.log(this.a);
    }

    var a = 2;
    var o = {a : 3, foo : foo};
    var p = {a : 4};

    o.foo();    //3
    (p.foo = o.foo)(); //2 
```
-  (p.foo = o.foo)의 결과값은 원함수 객체의 레퍼런스로 foo()가 되며 기본바인딩 규칙(엄격모드는 undefined, 비엄격 모드는 전역객체)이 적용된다.

#### 2.4.3 소프트 바인딩
- 암시적/명시적 바인딩 기법을 통해 임의로 this 바인딩을 하는 동시에 전역 객체나 undefined가 아닌 다른 기본 바인딩 값을 세팅
```javascript
    if (!Function.prototype.softBind) {
        Function.prototype.softBind = function(obj) {
            var fn = this;
            var curried = [].slice.call(argument, 1);
            var bound = function() {
                return fn.apply((!this || this === (window || global)) ? obj : this     // 호출 시점에 this를 체크하는 부분에서 주어진 함수를 래핑하여 전역객체나 undefnied일 경우엔 미리 준비한 대체 기본 객체로 세팅
                    curried.concat.apply(curried, arguments)
                );
            }
            bound.prototype = Object.create(fn.prototype);
            return bound;
        }
    }
```

```javascript
    function foo() {
        console.log("name:" + this.name);
    }

    var obj = {name : "obj"},
        obj2 = {name : "obj2"},
        obj3 = {name : "obj3"};

    var fooOBJ = foo.softBind(obj);
    fooOBJ();   //name : obj

    // obj2, obj3로 수동 바인딩,
    obj2.foo = foo.softBind(obj);
    obj2.foo();     // name : obj2

    fooOBJ.call(obj3);  // name : obj3

    setTimeout(obj2.foo, 10);   //name : obj -> 소프트 바인딩 적용(setTimeout에서 기본바인딩이 됨)
```

### 2.5 어휘적 this
- 화살표 함수는 function 키워드 대신 뚱뚱한 화살표 연산자로 불리는 =>를 써서 표현하며, 4가지 표준규칙 대신 에두른 스코프를 보고 this를 알아서 바인딩
```javascript
    function foo() {
        return (a) => {
            console.log(this.a);  // this는 어휘적으로 'foo()'에 상속됨
        }
    }
    var obj1 = {
        a : 2
    }

    var obj2 = {
        a : 3
    }

    var bar = foo.call(obj1);
    bar.call(obj2);      //2
```
- foo() 내부에 생성된 화살표 함수는 foo() 호출 당시 this를 무조건 어휘적으로 포착, foo()는 obj1에 this가 바인딩 되므로 bar의 this 역시 obj1으로 바인딩 됨.
- 화살표 함수의 어휘적 바인딩은 절대로 오버라이드 할 수 없음.

- 화살표 함수는 이벤트 처리기나 타이머 등 콜백에 많이 쓰임
```javascript
 function foo() {
  setTimeout(() => {
   console.log(this.a);
  }, 100);
  var obj = {
    a : 2
  };
  
  foo.call(obj);     // 2
```
- 화살표 함수는 this를 확실히 보장하는 수단으로 bind()를 대체할 수 있고 겉보기에도 끌리는 구석이 있지만, 결과적으로 더 잘 알려진 렉시컬 스코프를 쓰겠다고 기존의 this 체계를 포기하는 형국이라는 점을 간과하면 안됨.

```javascript
 // 화살표 함수 전에 콜백에서 this를 쓰던 방식
 function foo() {
  var self = this;
  setTimeout(function() {
   console.log(self.a);
  }, 100);
  var obj = {
    a : 2
  };
  
  foo.call(obj);     // 2
```

-self = this나 화살표 함수 모두 bind()대신 사용 가능한 해결책이지만 this를 제대로 이해하고 수용하기 보단 골치아픈 this 에서 도망치려는 꼼수라고 할 수 있음.
- 1. 오직 렉시컬 스코프만 사용하고 가식적인 this 스타일의 코드는 접어둔다.
- 2. 필요하면 bind()까지 포함하여 완전한 this 스타일의 코드를 구사하되 self = this나 화살표 함수같은 소위 어휘적 this 꼼수는 삼가하도로가자.
