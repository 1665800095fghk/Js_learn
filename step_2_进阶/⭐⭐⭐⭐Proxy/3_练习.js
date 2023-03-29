// 读取不存在的属性时出错
// 通常，尝试读取不存在的属性会返回 undefined。
// 创建一个代理，在尝试读取不存在的属性时，该代理抛出一个错误。
let user = {
  name: "John",
};

function wrap(target) {
  return new Proxy(target, {
    /* 你的代码 */
    get(target, prop, receiver) {
      if(prop in target) {
        return Reflect.get(target, porp, receiver);
      } else {
        throw new Error("prop is undefined")
      }
    }
  });
}

// user = wrap(user);
// console.log(user.name); // John
// console.log(user.age); // ReferenceError: Property doesn't exist: "age"


// 访问 array[-1]
// 在某些编程语言中，我们可以使用从尾端算起的负值索引访问数组元素。
// 换句话说，array[-N] 与 array[array.length - N] 相同。
let array = [1, 2, 3];

array = new Proxy(array, {
  /* 你的代码 */
  get(target, prop, receiver) {
    if (prop < 0) {
      // prop 是一个字符串，先用 + 转换为数字
      prop = +prop + target.length;
    }
    return Reflect.get(target, prop, receiver);
  }
});
// console.log( array[-1] ); // 3
// console.log( array[-2] ); // 2


// 可观察的（Observable）
// 创建一个函数 makeObservable(target)，该函数通过返回一个代理“使得对象可观察”。
let handlers = Symbol('handlers');

function makeObservable(target) {
  /* 你的代码 */
  // 1. 初始化 handler 存储
  target[handlers] = [];

  // 将 handler 函数存储到数组中，以便于之后调用
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. 创建一个 proxy 以处理更改
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 将操作转发给对象
      if (success) { // 如果在设置属性时没有出现 error
        // 调用所有 handler
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}
let user_ = {};
user_ = makeObservable(user);
user_.observe((key, value) => {
  console.log(`SET ${key}=${value}`);
});
user_.name = "John";