# eval
* 보안 관련 내용은 너무 많아서 성능 관점에서 보기로함
```javascript
function getFunc(param){
    return new Function("return 2 * " + param);
}

function performanceBenchmark(){
    console.log('eval start ~');
    let startTime = new Date().getTime();
    console.log(startTime)
    for(let i = 0; i<10000; i++){
        eval("2 * " + i);
    }
    let endTime = new Date().getTime();
    console.log(endTime);
    console.log('eval total : ', (endTime - startTime))
    console.log('eval end ~');

    console.log('new Function start ~')
    startTime = new Date().getTime();
    console.log(startTime);
    for(let i = 0; i<10000; i++){
        getFunc(i)();
    }
    endTime = new Date().getTime();
    console.log(endTime);
    console.log('new Function total : ', (endTime - startTime))
    console.log('new Function end ~');
    
}
```
### 결과
![result](jasmine-demo-week03-homework-1.png)

### 이유
* js 엔진에서 구조를 최적화 할때 eval은 js 인터프린터를 사용해야함
* 인터프린터는 js 코드를 기계어로 변경
* eval 을 사용하면 브라우저는 이에 대응하기 위해 기계어를 재작성하는 작업이 일어남



# ASI

## 결론 (개인적인 생각)
* 써도 상관없다 .
* 다만 '[', '(', '`' 로 문장을 시작하는지 항상 주의
* 위 문제같은경우가 발생하는건 이미 '잘못된 코드' 이다.
* javaScript 같이 함수를 콜백으로 넘기는 코드 스타일에 경우 세미콜론 위치를 틀릴 수 있음
* 오히려 잘만 사용한다면 코드를 더 쉽고 깔끔하게 사용 가능