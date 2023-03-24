'use strict';
// 处理函数参数列表
// function max() {
//   let max = Number.NEGATIVE_INFINITY;
//   for (let i = 0; i < arguments.length; i++) {
//     if (arguments[i] > max) {
//       max = arguments[i];
//     }
//   }
//   return max;
// }

// let counter = () => {
//   let count = 0;
//   return {
//     get count() {
//       return count++;
//     },
//     set count(n) {
//       if(n > count) {
//         count = n;
//       }else throw new Error('count不能小于' + count);
//     }
//   };
// };

// let fun = () => {
//   let arr = [];
//   for(var i = 0; i < 10; i++)
//     arr[i] = function() { return i; };
//   return arr;
// }

// let f = fun();
// console.log(f[5]());

// let array = (a,n) => Array.prototype.slice.call(a, n || 0);

// let partialLeft = (f) => {
//   let args = arguments;
//   return () => {
//     let a = array(args, 1);
//     a = a.concat(array(arguments));
//     return f.apply(this, a);
//   }
// }


// 缓存
// function memorize(f) {
//   let cache = {};
//   return function() {
//     let key = arguments.length + Array.prototype.join.call(arguments, ",");
//     if (key in cache) return cache[key];
//     else return cache[key] = f.apply(this, arguments);
//   };
// };

// function gcd(a, b) {
//   let t;
//   if (a < b) (t = b), (b = a), (a = t);
//   while (b > 0) (t = b), (b = a % b), (a = t);
//   return a;
// };

// let gcd_memorize = memorize(gcd);
// console.log(gcd_memorize(85, 187));


