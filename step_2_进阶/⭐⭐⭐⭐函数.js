// 写一个函数 sum，它有这样的功能：
// sum(1)(2) == 3; // 1 + 2
// sum(1)(2)(3) == 6; // 1 + 2 + 3
// sum(5)(-1)(2) == 6
// sum(6)(-1)(-2)(-3) == 0
// sum(0)(1)(2)(3)(4)(5) == 15

// sum 接受一个参数 a，返回一个闭包函数 next
// next 接受一个参数 b，然后递归调用 sum(a+b)返回新的函数
// 当使用多个 next 时，每个函数都把数据存储在自己的闭包中，并返回一个新的函数
// 这些嵌套的函数可以通过 valueOf 返回它们所有参数的总和
function sum(a) {
  const next = (b) => sum(a+b);
  next.valueOf = () => a;
  return next;
}
// let next = function(b) {
//   // tmp = a + b
//   return function sum(tmp) {
//     const next = (b) => sum(b+tmp);
//     next.valueOf = () => tmp;
//     return next;
//   }
// }
console.log(sum(2)(3)(4).valueOf());