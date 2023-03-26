// 深入探究
// 通常认为 super 是通过 this.__proto__.methdo 来调用父类的方法
// 但是，这样是行不通的
let animal = {
  name: "Animal",
  eat() {
    console.log(`${this.name} eats.`);
  }
};
let rabbit = {
  __proto__: animal,
  name: "rabbit",
  eat() {
    this.__proto__.eat.call(this);
  }
};
let longEar = {
  __proto__: rabbit,
  eat() {
    this.__proto__.eat.call(this);
  }
}
// 用 longEar 作为 this 调用 rabbit 的 eat，
// 那么 rabbit 的 eat 中的 this 也为 longEar
// 所以产生了循环，不会在原型链上寻找
// 所以下面的调用抛出了异常
// longEar.eat(); 

// 为了提供解决方案，Js 为函数提供了一个特殊的内部属性 [[HomeObject]]
let animal_ = {
  name: "Animal",
  eat() { // animal.eat.[[HomeObject]] == animal
    console.log(`${this.name} eats.`);
  }
};
let rabbit_ = {
  __proto__: animal_,
  name: "rabbit",
  eat() { // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};
let longEar_ = {
  __proto__: rabbit_,
  name: "LongEar",
  eat() { // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
}
// longEar_.eat();

