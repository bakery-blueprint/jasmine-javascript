//과제 1. 
// 119p onlyOne(undefined, null, false, +0, -0, NaN, "", []) 
// -> true 가 나오도록 수정하라 (Number 사용 금지, return 문 변경 금지)
function onlyOne() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        if (!!arguments[i]) {
            sum += !!arguments[i];
        }

    }
    return sum == 1;
}
onlyOne(undefined, null, false, +0, -0, NaN, "", []); // true


// 과제2
var obj = Object(true);
if (true == obj) {
    console.log("1"); // true~~~
}