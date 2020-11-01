//과제 1. deep freeze 하는 메소드를 작성하시오 (window 객체일 경우에는 freeze 를 패스하는 하는 로직도 추가하시오)
```
function deepFreeze(object) {
   let propNames = Object.getOwnPropertyNames(object);
   for (let name of propNames) {
      let value = object[name];
      object[name] = value && typeof value === "object" ?  
                           deepFreeze(value) : value;
   }
   return Object.freeze(object);
}

var info = {
    name : "seunghoon",
    age : 29
}
```

//과제 2 객체를 리터럴 형식으로 하나 선언하고 프로퍼티를 선언하세요 객체안에 있는 모든 프로퍼티를 표현하는 getter 를 선언하세요
```
var person = {
    firstName: "SeungHoon",
    lastName: "Ji",
    get fullName() {
      return this.firstName + " " + this.lastName;
    },
    set fullName(value) {
      var parts = value.split(" ");
      this.firstName = parts[0];
      this.lastName = parts[1];
    },
    get allProperties() {
        for (var key of Object.getOwnPropertyNames(this)) {
            if (key != 'allProperties') {
                console.log(this[key]);
            }
        }
    },
  };

person.allProperties
```
