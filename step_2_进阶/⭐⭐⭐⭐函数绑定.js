let user = {
  name: "John",
};
function func() {
  console.log(this.name);
}
// this = user
// let funcUser = func.bind(user);
// funcUser();

let user_2 = {
  name: "John",

  sayHi() {
    console.log(`Hello ${this.name}`);
  },
};
// let sayHi = user_2.sayHi.bind(user);
// sayHi();

// 部分函数
function mul(a, b) {
  return a * b;
}
// let double = mul.bind(null,2);
// console.log(double(3));

function partial(func, ...argsBound) {
  return function (...args) {
    return func.call(this, ...argsBound, ...args);
  };
}
let user_3 = {
  firstName: "John",
  say(time, phrase) {
    console.log(`[${time}] ${this.firstName}: ${phrase}!`);
  },
};

user_3.sayNow = partial(
  user_3.say,
  new Date().getHours() +
    ":" +
    new Date().getMinutes() +
    ":" +
    new Date().getSeconds()
);
// setInterval(() => user_3.sayNow("Hello"), 1000);