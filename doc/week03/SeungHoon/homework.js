//1. eval 

eval를 피해야 하는 이유
1. 디버깅
 - eval() 함수 안에 어떤 부분이 잘못되었는지 디버깅 불가
2. 성능
예전 버전의 브라우저에서는 eval()은 중복 Interpretation 패널티를 가졌다. 즉 코드가 한번 interpret 되고, eval() 이 한번더 interpret 가 된다는 말이다. 
eval()이 한번더 interpret될때는 자바스크립트 컴파일링 엔진 없이 되기 때문에 브라우저에서 10배 정도 느려진다 
최근의 자바스크립트 컴파일 엔진에서도 eval()은 여전히 문제를 내포 하고있다. 
대부분의 엔진들은 2가지 방법으로 코드를 실행 하는데. "Fast path ", Slow path " 로 돈다. 
fast path코드는 안정적이고 예측 가능한 코드들이고 빠르게 실행을 위해 컴파일 된다. 하지만 slow path의 경우 예측 하기 힘들기 때문에 컴파일 하기 어렵기 때문에 여전히 interpreter에 의해 실행 된다.
즉 eval()부분은 최근의 빠른  자바스크립트 엔진을 사용 하지 못하고 예전 브라우저 속도로 실행 된다
// 잘못된 예제
function isChecked( optionNumber ) {
    return eval ( "forms[0].option" + optionNumber + ".checked:" );
}
var result = isCheced( 1 );

// 대처한 코드 
function isChecked( optionNumber ) {
    return forms[0]["options" + optionNumber].checked;
}
var result = isChecked(1);


    


//2. asi에 대한 본인의 주장 및 뒷받침 의견 토론.

// 의견 : ASI에 의존하지말고 세미콜론을 쓰는 버릇을 들이자
//ASI는 에러 정정을 목적으로 만들어졌고, 아무리 적은 가능성이라도 오류가 날 가능성이 있다면,
//; 을 쓰는 것이 맞다고 생각한다.

// 코드1
var i = 0;
do {
    console.log(i);
} while(i===10) //
i;
// 코드 2
function foo(){
    if(true) return //
    console.log("foo");
}
//
//"ASI(Automatic Semicolon Insertion) is an error correction procedure.  
//If you start to code as if it were a universal significant-newline rule,  
//you will get into trouble." —Brendan Eich
