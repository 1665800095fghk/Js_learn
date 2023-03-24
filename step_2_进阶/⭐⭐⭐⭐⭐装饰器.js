function fib(number) {
  let i = 0,
    j = 1;
  for (let t = 1; t <= number; t++) {
    i = i + j;
    [i, j] = [j, i];
  }
  return i;
}


// 缓存装饰器
// 这是一个缓存装饰器，会让传入的函数拥有一个缓存
// 如果当前参数之前以及传入过，那么直接返回缓存中的结果
function cacheDecorator(f) {
  function wrapper() {
    let key = args.join(", ");
    if (wrapper.cache[key]) return cache[x];
    return (wrapper.cache[key] = f.apply(this, arguments));
  }
  wrapper.cache = {};
  return wrapper;
}
// let fib_cache = cacheDecorator(fib);
// for(let i = 1; i <= 10; i++){
//   console.log(fib_cache(i));
//   console.log(fib_cache.cache);
// }

// 间谍装饰器
// 创建一个装饰器 spy，它应该返回一个包装器
// 该包装器将所有对函数的调用保存在其 calls 属性中。
// 每个调用都保存为一个参数数组。
function spy(f) {
  function wrapper() {
    wrapper.calls.push({
      date: new Date(),
      arg: arguments,
    });
    return f.apply(this, arguments);
  }
  wrapper.calls = [];
  return wrapper;
}
// let fib_spy = spy(fib);
// for(let i = 1; i <= 10; i++) {
//   console.log(fib_spy(i));
//   console.log(fib_spy.calls);
// }

// 延时装饰器
// 创建一个装饰器 delay(f, ms)，该装饰器将 f 的每次调用延时 ms 毫秒。
function delay(f, ms) {
  return function () {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}
// let log_delay = delay(console.log, 1000);
// log_delay("sss")

// 防抖装饰器
// debounce(f, ms) 装饰器的结果是一个包装器
// 该包装器将暂停对 f 的调用
// 直到经过 ms 毫秒的非活动状态（没有函数调用，“冷却期”）
// 然后使用最新的参数调用 f 一次。
// 防抖的作用是当事件被频繁触发时，只执行最后一次触发的事件
function debounce(f, ms) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => f.apply(this, arguments), ms);
  };
}
// let log_debounce = debounce(console.log, 1000);
// for (let i = 0; i < 10; i++) {
//   log_debounce(i);
// }

// 节流装饰器
// 创建一个 "节流" 装饰器 throttle(f, ms) —— 返回一个包装器。
// 当被多次调用时，它会在每 ms 毫秒最多将调用传递给 f 一次。
// 节流的作用是限制函数的执行频率，防止短时间大量调用导致页面性能下降
function throttle(f, ms) {
  let isThrottled = false, savedArgs, savedThis;
  return function wrapper() {
    // 判断是否为节流状态
    if(isThrottled) {
      // 如果处于被限制的状态，则存储当前参数
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    // 如果不被限制则执行函数，并且设定为限定状态
    isThrottled = true;
    f.apply(this, arguments);
    // 在规定时间后解除限制状态并使用缓存的上下文执行
    setTimeout(() => {
      isThrottled = false;
      if(savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
}
// let log_throttle = throttle(console.log, 1000);
// for(let i = 0; i < 100; i++) {
//   log_throttle(i);
// }


