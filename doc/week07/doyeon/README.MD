과제 1번 : 관계를 표현하라
![image](https://user-images.githubusercontent.com/38370976/98630069-a4dfe780-235d-11eb-9b6c-ce41667300c0.png)


과제 2번: 3번 상속
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
![image](https://user-images.githubusercontent.com/38370976/98630125-c345e300-235d-11eb-82f0-33c1602dce67.png)

