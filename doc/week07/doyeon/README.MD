```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    return this.name;
}
Person.prototype.getAge = function() {
    return this.age;
}

function Employee(name, age, position) {
    this.name = name;
    this.age = age;
    this.position = position;
}

Employee.prototype = new Person();
Employee.prototype.constructor = Employee;
Employee.prototype.getPosition = function() {
    return this.position;
}

//Object -> Person -> Employee 3번 상속
var doyeon = new Employee("doyeon", 29, "CEO");
console.dir(doyeon);
```
