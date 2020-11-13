// # 과제 1. foo()의 호출부를 바꿔서 함수 호출 순서를 바꿔라 2가지 해보기 (단, foo()와 bar()의 호출은 바꾸면안됨)

var a = 20;
function foo() {
    //A
    setTimeout(function () {
        a = a + 1;
        console.log('foo ' + a);
    }, 0);
}
function bar() {
    a = a * 2;
    console.log('bar ' + a);
}
foo();
bar();
