# 과제 1 > 관계 그리기


# 과제 2 > 상속 3번
```javascript
function Animal () { 
  this.name = "" 
}
Animal.prototype.getName = function () { 
   console.log(this.name); 
} 
function Dog (name, kind) {
  this.name = name;
  this.kind = kind
 } 
Dog.prototype = new Animal(); 
var myDog = new Dog("닥스훈트","꽁치"); 
console.dir(myDog);
```