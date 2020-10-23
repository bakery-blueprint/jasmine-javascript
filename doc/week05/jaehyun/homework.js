// 1. 아래 실행 결과에서 전역이 나오는 이유와 2를 출력하도록 설정
//   function foo() {
//         console.log(this.a);
//     }
//     var obj = {
//         a : 2,
//         foo : foo
//     };

//     var a = "전역";
//     setTimeout(obj.foo, 100);   // 전역

// 이유
// 실제 setTimeout 에 전달되는 콜백은 foo의 레퍼런스이기 떄문에 setTimeout(foo, 100); 와 동일한 결과를 출력하게 됨. 그래서 결국 this는 전역객체(window)로 바인딩
// 2를 출력하도록 설정하는 방법
setTimeout(foo.bind(obj), 100);
setTimeout(
  (() => {
    return foo.bind(obj);
  })(),
  100
);

// 으흠 잘 모르겠구만...

// 2.new 관련해서 이상했던 부분 알아보기
/* 책 2.3.1  this 확정 규칙을 보면
 new > 명시적 > 암시적 > 기본  순으로 this 바인딩이라고 설명하고 있음
 하드 바인딩을 통해 this가 설정된 function 을 new 연산자로 객체 생성을 한다면 해당 function 객체에 this는 새로 생성되는 객체로 설정이 된다.
 이러한 이유로 new 가 가장 우선순위가 높고 명시, 암시, 기본 순으로 this가 바인딩 된다.
*/
