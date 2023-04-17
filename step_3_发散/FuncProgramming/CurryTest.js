import { curry, partial } from "./CurryPartial.js";

// 匹配数组中带有数字的字符串
let match = curry(function (expr, str) {
  return str.match(expr);
});
let hasNumber = match(/[0-9]+/);
let filter = curry(function (f, arr) {
  return arr.filter(f);
});
let filterNumbersInArray = filter(hasNumber);
// console.log(filterNumbersInArray(["123", "ssss"]));

// 对数组所有元素开平方
let map = curry((fun, arr) => {
  return arr.map(fun);
});
let squareAll = map((x) => x * x);
// console.log(squareAll([2, 3, 6, 8]));

// 创建一个延时 1 秒的函数，将输入其中的函数延时 1 秒执行
let delayTenMs = partial(setTimeout, undefined, 1000);
// delayTenMs(() => console.log("Hello"));
// delayTenMs(() => console.log("Hello"));

