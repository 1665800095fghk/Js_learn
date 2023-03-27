// Promise API

// Promise.all
// 当我们需要并行执行多个 promise，并等待所有 promise 都就绪
// 如果其中有任何一个 promise 被 reject，Promise.all 会被立即 reject
// 完全忽视其他的 promise，它们的结果也被忽视
// iterable 为可迭代对象
// Promise.all(iterable);
// Promise.all([
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
// ]).then((res) => {
//   // res 数组中结果顺序与上面数组顺序对应
//   console.log(res);
// });

// 例如
// let urls = [
//   "https://api.github.com/users/iliakan",
//   "https://api.github.com/users/remy",
//   "https://api.github.com/users/jeresig",
// ];
// let request = urls.map((url) => fetch(url));
// Promise.all(request)
//   .then((responses) =>
//     responses.forEach(res => console.log(`${res.url}: ${res.status}`))
//   );

// Promise.allSettled
// 与 all 不同，all 中只要有一个为 reject，整个 all 都会 reject
// 当我们对所有数据感兴趣，即使其中有数据返回 reject，那就该使用 allSettled
// let urls = [
//   "https://api.github.com/users/iliakan",
//   "https://api.github.com/users/remy",
//   "https://no-such-url",
// ];
// Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
//   results.forEach((result, num) => {
//     if (result.status == "fulfilled") {
//       alert(`${urls[num]}: ${result.value.status}`);
//     }
//     if (result.status == "rejected") {
//       alert(`${urls[num]}: ${result.reason}`);
//     }
//   });
// });


// Promise.race
// 与 all 类似，但只等待第一个 sttled 的 promise (或err)
// Promise.race([
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1


// Promise.any
// 等待一个 fulfilled 的 prmoise
// Promise.any([
//   new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
//   new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).then(alert); // 1