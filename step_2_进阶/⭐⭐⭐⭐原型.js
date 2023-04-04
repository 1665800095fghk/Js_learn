let animal = {
  easts: true,
};
let rabbit = {
  jumps: true,
};
// 将 rabbit 的原型设置为 animal
rabbit.__proto__ = animal;
// console.log(rabbit.easts);

// 向 Function 的原型添加函数
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};
console.log.defer(1000)("ssss");