# 1
//deep freeze
function deepFreeze(obj) {
 
  // retrieve property names defined on the obj
  var propNames = Object.getOwnPropertyNames(obj);
 
  // freeze the property prior to freeze its own
  propNames.forEach(function(name) {
    var prop = obj[name];
    
    // If the prop is a target, freeze it
    if (window object?) {}
    else if(typeof prop === 'object' && prop !== null) {
        deepFreeze(prop);
    }
      
  });
 
  // freeze itself (no-op if already frozen)
  return Object.freeze(obj);
}





# 2
//객체를 리터럴 형식으로 하나 선언하고 프로퍼티를 선언하세요
//객체안에 있는 모든 프로퍼티를 표현하는 getter 를 선언하세요

//왜 무한루프일까?

// ex
var person = {
  firstName: "jaehyun",
  lastName: "lim",
  get fullName() {
    return this.firstName + " " + this.lastName;
  },
  set fullName(value) {
    var parts = value.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
  get allProperties() {
    for (const property in person) {
        console.log(object[property]);
    }
  },
};
// 출력 :
// jaehyun
// lim
// jaehyun lim