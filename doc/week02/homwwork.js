// 1. String Constructor
let strObj = new String("Lim");
console.log(strObj);
strObj = new String(1);
console.log(strObj);
strObj = new String(undefined);
console.log(strObj);

var x = String("Lim");
console.log(typeof x, x);

const str = "Lim";
const strObj = new String("Lim");

console.log(str == strObj); // true
console.log(str === strObj); // false

console.log(typeof str); // string
console.log(typeof strObj); // object

// 2. String Property
const str1 = "Hello World";
console.log(str1.length); // 11

const str2 = "안뇽!";
console.log(str2.length); // 3

// 3. String Method
// 3.1 String.prototype.charAt(pos: number): string

const str = "Hello";
console.log(str.charAt(2)); // l
console.log(str.charAt(5)); // ''

for (let i = 0; i < str.length; i++) {
  console.log(str[i]); // str['0']
}

// 3.2 String.prototype.concat(…strings: string[]): string
console.log("Hello ".concat("Lim")); // Hello Lim

// 3.3 String.prototype.indexOf(searchString: string, fromIndex=0): number
const str = "Hello World";

console.log(str.indexOf("or")); // 7

// 동일한 내용
if (str.indexOf("Hello") !== -1) {
  // 틸트 연산자 ???!!??
}
// ES6: String.prototype.includes
if (str.includes("Hello")) {
}

// 3.4 String.prototype.lastIndexOf(searchString: string, fromIndex=this.length-1): number

const str = "Hello World";
console.log(str.lastIndexOf("World")); // 6

// 3.5 String.prototype.replace(searchValue: string | RegExp, replaceValue: string | replacer: (substring: string, …args: any[]) => string): string): string
const str = "Hello world";
console.log(str.replace("world", "Lim")); // Hello Lim

// 3.6 String.prototype.split(separator: string | RegExp, limit?: number): string[]
const str = "How are you doing?";
console.log(str.split(" ")); // [ 'How', 'are', 'you', 'doing?' ]

// 3.7 String.prototype.substring(start: number, end=this.length): string
console.log(str.substring(4, 1)); // ell
console.log(str.substring(-2)); // Hello World

// 3.8 String.prototype.slice(start?: number, end?: number): string
const str = "hello world";
console.log(str.substring(-5)); // 'hello world'
console.log(str.substring(2)); // llo world
console.log(str.slice(2)); // llo world

// 3.9 String.prototype.toLowerCase(): string
console.log("Hello World!".toLowerCase()); // hello world!

// 3.10 String.prototype.toUpperCase(): string
console.log("Hello World!".toUpperCase()); // HELLO WORLD!

// 3.11 String.prototype.trim(): string
const str = " foo ";
console.log(str.trim()); // "foo"
console.log(str.trimStart()); // "foo "
console.log(str.trimEnd()); // " foo"

// 3.12 String.prototype.repeat(count: number): string
console.log("abc".repeat(0)); // ''
console.log("abc".repeat(1)); // 'abc'
console.log("abc".repeat(2)); // 'abcabc'
console.log("abc".repeat(2.5)); // 'abcabc' (2.5 → 2)

// 3.13 String​.prototype​.includes(searchString: string, position?: number): boolean
const str = "hello world";
console.log(str.includes("hello")); // true
console.log(str.indexOf("hello")); // 0
