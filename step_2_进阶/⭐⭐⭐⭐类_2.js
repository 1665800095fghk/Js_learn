// 继承
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
}
class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
}

// 使用原型的继承
function Animal_2(name) {
  this.speed = 0;
  this.name = name;
}
Animal_2.prototype = {
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}`);
  },
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
}
function Rabbit_2(name) {
  Animal_2.call(this, name)
}
Rabbit_2.prototype = Animal_2.prototype;
Rabbit_2.prototype.hide = function() {
  console.log(`${this.name} hides!`);
}
// new Rabbit_2("r1").run(12);


// 在 extends 后面可以接的不止是类，可以是一个表达式
function f(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  }
}
class User extends f("Hello") {}
// new User().sayHi();


// 在子类中用 super 代指父类
class Animal_3 {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(`Hello ${this.name}`);
  }
}
class Rabbit_3 extends Animal_3 {
  constructor(name) {
    super(name);
  }
  sayHi() {
    super.sayHi.call(this);
    console.log("Rabbit sayHi");
  }
}
// new Rabbit_3("sss").sayHi();

let b = { a: 3 };
let { a } = b;
console.log(a);