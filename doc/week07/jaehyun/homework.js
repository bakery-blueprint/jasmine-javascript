function Foo(name){
    this.name = name;
}

Foo.prototype.getName = function() {
    return this.name;
}

function Bar(name, age){
   Foo.call(this, name);
   this.age = age
}

Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.constructor = Bar;
Bar.prototype.getAge = function() {
    return this.age;
}

function Fnc(sex){
    this.sex = sex;
}

Fnc.prototype = new Bar("lim", 34);
Fnc.prototype.constructor = Fnc;
Fnc.prototype.getSex = function(){
    return this.sex;
}

var fnc = new Fnc("남");

console.log(fnc.getName());
console.log(fnc.getAge());
console.log(fnc.getSex());




