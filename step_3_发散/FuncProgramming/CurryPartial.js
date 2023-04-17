// 柯里化
const curry = (fun) => {
  if (typeof fun !== "function") throw new Error("No Function");
  return function curriedFun(...args) {
    // args 为当前参数，当参数达到 fun 需要的参数数量，便会执行 fun
    if (args.length < fun.length) {
      return function () {
        // arguments为除了第一个柯里化参数外的其他参数
        return curriedFun.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fun.apply(null, args);
  };
};

// 偏函数
const partial = (fun, ...partialArgs) => {
  // 执行 partial 时记住参数，如 [undefined, 10]
  let args = partialArgs;
  return (...fullArgs) => {
    let arg = 0;
    for (let i = 0; i < args.length && arg < fullArgs.length; i++) {
      if(args[i] === undefined) {
        // 将原本 undefined 的参数按顺序变为 fullArgs 中的参数
        args[i] = fullArgs[arg++];
      }
    }
    return fun.apply(null, args);
  };
};

export { curry, partial };
