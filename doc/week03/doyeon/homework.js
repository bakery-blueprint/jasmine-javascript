//1. eval 잘못된 예제 / 대처한 코드.


// eval()은 인자로 받은 코드를 caller의 권한으로 수행하는 위험한 함수입니다. 악의적인 영향을 받았을 수 있는 문자열을 eval()로 실행한다면, 
// 당신의 웹페이지나 확장 프로그램의 권한으로 사용자의 기기에서 악의적인 코드를 수행하는 결과를 초래할 수 있습니다. 
// 또한, 제3자 코드가 eval()이 호출된 위치의 스코프를 볼 수 있으며, 이를 이용해 비슷한 함수인 Function으로는 실현할 수 없는 공격이 가능합니다.
// 또한 최신 JS 엔진에서 여러 코드 구조를 최적화하는 것과 달리 eval()은 JS 인터프리터를 사용해야 하기 때문에 다른 대안들보다 느립니다.
// 추가로, 최신 JavaScript 인터프리터는 자바스크립트를 기계 코드로 변환합니다. 즉, 변수명의 개념이 완전히 없어집니다. 
//그러나 eval을 사용하면 브라우저는 기계 코드에 해당 변수가 있는지 확인하고 값을 대입하기 위해 길고 무거운 변수명 검색을 수행해야 합니다. 
//또한 eval()을 통해 자료형 변경 등 변수에 변화가 일어날 수 있으며, 브라우저는 이에 대응하기 위해 기계 코드를 재작성해야 합니다. 

// 잘못된 예제
function looseJsonParse(obj){
    return eval(obj);
}
console.log(looseJsonParse(
   "{a:(4-1), b:function(){}, c:new Date()}"
))

// 대처한 코드 
function looseJsonParse(obj){
    return Function('"use strict";return (' + obj + ')')();
}
console.log(looseJsonParse(
   "{a:(4-1), b:function(){}, c:new Date()}"
))


//2. asi에 대한 본인의 주장 및 뒷받침 의견 토론.

// 의견 : ASI에 의존하지 않아야한다. 
// 뒷받침 의견 출처 :  『읽기 좋은 자바스크립트 코딩 기법(Maintainable Javascript)』(니콜라스 자카스 지음, 김광호 옮김) https://bakyeono.net/post/2018-01-19-javascript-use-semicolon-or-not.html#asi%EB%A1%9C-%EC%9D%B8%ED%95%9C-%EB%AC%B8%EC%A0%9C
//ASI는 코드에서 세미콜론이 필요한 자리를 찾고 없으면 세미콜론을 넣어주는데. 대부분 정확하게 찾아 문제가 없습니다. 
//그러나 ASI가 세미콜론을 찾는 규칙은 기억하기 어려울 정도로 복잡하므로 명시적으로 세미콜론을 넣기를 권장합니다. 디음과 같은 상황을 고려해 봅시다.

// 원래 코드
`function getData() {
    return
        {
            title: 'Maintainable Javascript',
            author: 'Nicholas C. Zakas'
        }
}`

// 파서가 생각하는 코드
`function getData() {
    return;
        {
            title: 'Maintainable Javascript',
            author: 'Nicholas C. Zakas'
        };
}`
//이 예제에서 우리가 보기에 getData()는 데이터가 포함된 객체를 반환하는 힘수입니다. 
//하지만 ASI는 return 문 이후에 새로운 줄이 있으니 당연히 세미콜론을 삽입합니다. 
//따라서 getData 함수는 undefined를 반환합니다. 이 문장을 다음 예제처럼 return 문과 같은 줄에 중괄호를 표기하면 정상 값을 반환합니다.

//일반적으로 ASI가 수행되는 시나리오는 정해져 있습니다. 
//보통 두 가지 상황에서 ASI 에러가 발생하는데 ASI 동작 방식에 대한 이해 없이 코드를 작성하거나 ‘세미콜론이 없어도 ASI에서 알아서 넣어주겠지.’라는 안일한 생각으로 코드를 작성할 때입니다. 
//특히 경험이 부족한 개발자가 세미콜론을 빠뜨리는 실수를 자주 합니다.
//더글라스 크락포드의 자바스크립트를 위한 코드 컨벤션, jQuery 코어 스타일 가이드, 구글 자바스크립트 스타일 가이드, Dojo 스타일 가이드에서도 모두 세미콜론 사용을 권장합니다. 
//또 JSLint와 JSHint 모두 기본적으로 세미콜론이 없으면 경고 메시지를 출력합니다.