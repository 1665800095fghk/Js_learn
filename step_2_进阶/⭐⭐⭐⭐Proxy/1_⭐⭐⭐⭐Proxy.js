// Proxy 对象包装另一个对象并拦截操作
// 可选地自行处理它们
/**
 * target 需要包装的对象
 * handler 代理配置，即拦截操作的方法
 */
// let proxy = new Proxy(target, handler);

let target = {};
let proxy = new Proxy(target, {});
proxy.test = 5;
// 因为没有设置拦截方法，对 proxy 属性的设置直接传入了 target
// console.log(target.test); // 5
// console.log(proxy.test); // 5

// 代理陷阱通过调用内部方法进行拦截
// get 阅读属性
// set 写入属性
// has in 操作
// deleteProperty delete 操作
// 	apply 函数调用
// construct new
// ownKeys for..in,Object.keys...
// 其余请参见文档
// https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots


// Get Set
let dictionary = {
  Hello: "Hola",
  Bye: "Adios",
};
dictionary = new Proxy(dictionary, {
  get(target, phrase) {
    if (phrase in dictionary) {
      return dictionary[phrase];
    }
    return phrase;
  },
});
let number = [];
number = new Proxy(number, {
  set(target, prop, val) {
    if (typeof val === "number") {
      target[prop] = val;
      return true;
    }
    return false;
  },
});

// ownKeys
// Object.keys for..in循环和大多数其他
// 迭代读写属性的方法用 [[OwnPropertyKeys]] 内部方法来获取属性列表

// 例子：迭代对象
let user = {
  name: "John",
  age: 30,
  _password: "***",
  sayHi() {
    console.log("Hello");
  }
};
user = new Proxy(user, {
  ownKeys(target) {
    // 忽略以 _ 开头的属性
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});
// for (let key in user) {
//   console.log(key);
// }


let user_ = {};
user_ = new Proxy(user_, {
  // 一旦获取属性就会被调用
  ownKeys(target) {
    return ['a','b','c'];
  },
  // 被每个属性调用
  getOwnPropertyDescriptor(target, prop) {
    return {
      // 可在循环中被列出
      enumerable: true,
      // 可被删除和修改
      configurable: true
      // .... 
    }
  }
});
// console.log(Object.keys(user_));


// deleteProperty
let user_1 = {
  name: 'John',
  _password: '*****'
}
user_1 = new Proxy(user_1, {
  set(target, prop, val) {
    if(prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
  get(target, prop) {
    if(prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let val = target[prop];
    return (typeof val === 'function') ? val.bind(target) : val;
  },
  deleteProperty(target, prop) {
    if(prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});
// try {
//   console.log(user_1._password); // Error: Access denied
// } catch(e) { console.log(e.message); }
// try {
//   user_1._password = "test"; // Error: Access denied
// } catch(e) { console.log(e.message); }
// try {
//   delete user_1._password; // Error: Access denied
// } catch(e) { console.log(e.message); }
// for(let key in user_1) console.log(key); // name


let range = {
  from: 1,
  to: 5
};
range = new Proxy(range, {
  has(target, prop) {
    return prop >= range.from && prop <= range.to;
  }
});
// console.log(5 in range);
// console.log(2 in range);
// console.log(6 in range);


// 包装函数 apply
// 回顾
function sayHi(user) {
  console.log(`Hello, ${user}!`);
}
function delay(f, ms) {
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
}
// console.log(sayHi.length); // 1 函数声明的参数个数
// sayHi = delay(sayHi, 3000);
// console.log(sayHi.length); // 0 在包装器中，参数为0
// 使用 Proxy
function delay_(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}
// sayHi = delay_(sayHi, 3000);
// console.log(sayHi.length); // 1 由 proxy 转发来
// sayHi("John");