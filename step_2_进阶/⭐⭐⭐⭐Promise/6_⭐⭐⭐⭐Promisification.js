// Promisification
// 它指将一个接受回调的函数转换为一个返回 promise 的函数

// 例子
// 待转换
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () =>
    callback(null, new Error(`Script load error for ${src}`));
}
// 转换后的返回 Promise 的函数
let loadScriptPromise = (src) => {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};
// 用法
// loadScriptPromise().then();

// 当我们需要 promise 化很多函数时，使用一个辅助函数会很有意义
// 使用 manyArgs 来控制回调是但参数还是多参数
function promisify(f, manyArgs = false) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) reject(err);
        else resolve(manyArgs ? results : results[0]);
      }
      // 将回调放到参数最后面
      args.push(callback);
      f.call(this, ...args);
    });
  };
}
// 用法
// let loadScriptPromise_ = promisify(loadScript);
// loadScriptPromise_().then();
