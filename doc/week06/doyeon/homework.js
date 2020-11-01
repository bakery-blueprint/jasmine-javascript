//과제 1. deep freeze 하는 메소드를 작성하시오 (window 객체일 경우에는 freeze 를 패스하는 하는 로직도 추가하시오)
function deepFreeze(obj) {

    if (window != obj) {
    
        const props = Object.getOwnPropertyNames(obj);

        props.forEach((name) => {
            const prop = obj[name];
            if(typeof prop === 'object' && prop !== null) {
                deepFreeze(prop);
            }
        });
        return Object.freeze(obj);
    }
}

var info = {
    name : "doyeon",
    age : 29
}


//과제 2 객체를 리터럴 형식으로 하나 선언하고 프로퍼티를 선언하세요 객체안에 있는 모든 프로퍼티를 표현하는 getter 를 선언하세요
var person = {
    firstName: "doyeon",
    lastName: "ryoo",
    get fullName() {
      return this.firstName + " " + this.lastName;
    },
    set fullName(value) {
      var parts = value.split(" ");
      this.firstName = parts[0];
      this.lastName = parts[1];
    },
    get allProperties() {
        for (var key of Object.keys(this)) {
            if (key != 'allProperties') {
                console.log(this[key]);
            }
        }
    },
  };