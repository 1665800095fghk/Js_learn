// 微任务(Microtask)

// 即使一个 promise 被立即 resolve
// then和catch和finally下面的代码都会在这些处理之前执行
// 例子
// Promise.resolve().then(() => console.log("done"));
// console.log("code");


// 微任务队列
// 当一个 promise 就绪时，它的 then catch finally 就被放入队列中
// 但它们不会立即执行，而是等 Js 引擎执行完当前代码，它会从队列中获取任务执行

// 下面例子中的 event.reason 会先于 err，因为 catch 会先加入队列
// let promise = Promise.reject(new Error("Promise Failed"));
// setTimeout(() => promise.catch(() => console.log("err")), 1000);
// window.addEventListener("unhandledrejection", event => console.log(event.reason));