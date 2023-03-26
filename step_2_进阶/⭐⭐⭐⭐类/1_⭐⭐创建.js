// Class

// 用类写出来
class User_1 {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}
// 用原型写出来
function User_2(name) {
  this.name = name;
}
User_2.prototype.sayHi = function () {
  console.log(this.name);
};

// let user = new User("Ly");
// user.sayHi();

// 二者的区别
// 1. class 内部拥有 [[IsClassConstructor]]
// 2. Class 的 prototype 中所有方法的 enumerable 为 false
// 3. Class 总是使用严格模式

// 类表达式
let User_3 = class {
  sayHi() {
    console.log("Hello");
  }
};

// 按需动态创建类
function makeClass(phrase) {
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}
// let User_4 = makeClass('Wc');
// new User_4().sayHi();

// getters setters
class User_5 {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    if (name.length < 4) {
      console.log("Name is too short");
      return;
    }
    this._name = name;
  }
}
// let user = new User_5("John");
// console.log(user.name);
// user.name = "Mack";
// console.log(user.name);
// user.name = "ccc";

// 计算属性名称
class User_6 {
  ["say" + "Hi"]() {
    console.log("Hello");
  }
}
// new User_6().sayHi();

// 字段
class User_7 {
  name = "John";

  sayHi() {
    console.log(this.name);
  }
}
// new User_7().sayHi();

// 使用字段制作绑定方法
class Button_1 {
  constructor(value) {
    this.value = value;
  }
  click() {
    console.log(this.value);
  }
}
class Button_2 {
  constructor(value) {
    this.value = value;
  }
  click = () => {
    console.log(this.value);
  };
}
// undefined, 因为 this 丢失
setTimeout(new Button_1(12).click, 1000);
setTimeout(() => new Button_1(12).click(), 1000);
// 12
setTimeout(new Button_2(12).click, 1000);
