// Reflect 是一个内建对象，可简化 proxy 的创建
// let user = {};
// Reflect.set(user,'name','John');
// console.log(user.name); // John

// 实例
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};
let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    // 被继承后传出的还是 user 的参数
    // return Guest
    // return target[prop]; // target = user

    // return admin
    // return Reflect.get(target, prop, receiver);
    return Reflect.get(...arguments); // 缩写
  }
});
let admin = {
  __proto__: userProxy,
  _name: "admin"
}
// console.log(admin.name);


// 内部插槽
// 在 Js 内建对象中，有许多内部插槽
// 例如 Map 中把 item 存在 [[MapData]] 中
// let map = new Map();
// let proxy = new Proxy(map, {});
// proxy.set('test', 1); // Error

let map = new Map();
let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let val = Reflect.get(...arguments);
    // 获取 Map 本身的函数，来访问 [[MapData]]
    return typeof val === 'function' ? val.bind(target) : val;
  }
});
// proxy.set('test', 1);
// console.log(proxy.get('test')); // 1


// 私有字段
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}
// let user_ = new User();
// user_ = new Proxy(user_, {});
// console.log(user_.getName()); // Error

// 因为私有变量是用内部插槽实现的，使用 [[Get]] [[Set]] 无法访问
// let user_ = new User();
// user_ = new Proxy(user_, {
//   get(target, prop, receiver) {
//     let val = Reflect.get(...arguments);
//     return typeof val === 'function' ? val.bind(target) : val;
//   }
// });
// console.log(user_.getName());


// 可撤销 Proxy
let obj = {
  data: "Valuable data"
};
let { proxy_, revoke } = Proxy.revocable(obj, {});
// console.log(proxy_.data);
// revoke(); // 撤销代理

