// Promise
let promise = new Promise(function (reslve, reject) {
  // executor
});
// 当对象被创建会执行 executor ，如果成功执行，调用 reslve，如果出现 err，调用 reject

// 例
let promise_1 = new Promise(function (reslve, reject) {
  // 当 promise_1 构建完成时，自动执行这个函数

  // 1 秒后发出工作已经完成的信号，并带有 done
  setTimeout(() => reslve("done"), 1000);
});

// then
promise_1.then(
  (result) => {
    // 处理成功的结果
  },
  (error) => {
    // 处理错误
  }
);
// 如果只对处理成功的结果感兴趣
promise_1.then((result) => {
  // 处理成功的结果
});
// catch
promise_1.catch((error) => {
  // 处理错误
});
// finally
promise_1
  .then((result) => {
    // 处理成功
  })
  .finally(() => {
    // 无论成功与否都执行
  });


// 使用 Promise 加载脚本
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
  
    document.haed.appendChild(script);
  });
}
// 用法
// let promise_2 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
// promise_2.then(
//   script => {
//     console.log(`${script.src} is loaded!`);
//   },
//   error => {
//     console.log(`Error: ${error.message}`);
//   }
// );
// promise_2.then(script => console.log("Anothor handler..."));