// 传入一个值，返回一个函数，这个函数接受一个函数作为参数
// 将传入的值传入这个函数，然后输出这个值
const tap = value => fun => {
  typeof (fn) === 'function' && fun(value);
  console.log(value);
}

// 将任意一个函数转换为一个只接受一个参数的函数
const unary = fun => {
  fn.length === 1
    ? fun
    : arg => fun(arg);
}

// 将任意一个函数转换为一个只能执行一次的函数
const once = fun => {
  let done = false;

  return function (...args) {
    return done
      ? undefined
      : (done = true, fun.apply(this, args));
  }
}

// 传入一个函数，返回的函数会拥有一个缓存，当传入相同的参数时，会直接返回缓存的结果
const memoized = fun => {
  const lookupTable = {};
  return arg => lookupTable[arg] || (lookupTable[arg] = fun(arg));
}

// 合并 n 个对象
const objectAssign = (...sources) => {
  let to = {};
  for(let from of sources) {
    for(let key in from) {
      to[key] = from[key];
    }
  }
  return to;
}