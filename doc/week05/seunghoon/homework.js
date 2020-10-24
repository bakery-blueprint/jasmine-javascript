//1. setTimeout 호출 후 "전역"으로 출력되는 이유를 적고, 2를 출력 하는 2가지 방법을 작성하시오
function foo() {
    console.log(this.a);
}
var obj = {
    a : 2,
    foo : foo
};

var a = "전역";
setTimeout(obj.foo, 100);   // 전역
//이유 : setTimeout 첫번째 매개변수의 호출부 obj.foo의 경우에는 obj 컨텍스트로 foo를 참조하므로 결국 setTimeout(foo,100)과 같게 되고, 암시적으로 레퍼런스가 할당이 되어서 전역으로 출력이됨

//2,우선순위 비교하기에서 하드바인딩이랑 new 관련해서 헷갈렸던거 알아보기
//bind() 함수는 컨택스트가 바인딩된 새로운 함수를 반환
/*
hello.bind(obj1)를 통해서 하드바인딩을 하고, helloFn 함수를 만들었음(helloFn('chris')를 실행하면 하드 바인딩된 obj1객체가 this가됨
obj1으로 하드바인딩된 helloFn() 함수를 new 키워드를 이용해 호출하면새로운 객체를 반환하는데 이 객체가 컨택스트로 바인딩된다.
*/
function hello(name) {
    this.name = name
  }
  
var obj1 = {}

var helloFn = hello.bind(obj1)
helloFn("chris")
console.log(obj1.name) // chris

var obj2 = new helloFn("alice")
console.log(obj1.name) // chris
console.log(obj2.name) // alice
  
//참고 https://jeonghwan-kim.github.io/2017/10/22/js-context-binding.html