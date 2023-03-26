// Mixin 模式
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};
class User {
  constructor(name) {
    this.name = name;
  }
}
Object.assign(User.prototype, sayHiMixin);
// new User("fghk").sayHi();

// 在上面的例子中类是没有继承的，所以，User 可以从另一个类继承，同时也可以使用 Mixin 来 mix-in 其他方法

// 实际运用
let eventMixin = {
  /**
   * 订阅事件
   * @param {String} eventName
   * @param {Function} handler
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * 取消订阅
   * @param {String} eventName 
   * @param {Function} handler 
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    handlers.map(item => {
      if(handlers[i] === handler)
        handlers.splice(i--, 1);
    });
  },

  /**
   * 生成具有给定名称和数据的事件
   * @param {String} eventName 
   * @param  {...any} args 
   * @returns 
   */
  trigger(eventName, ...args) {
    if(!this._eventHandlers?.[eventName])
      return;
    this._eventHandlers[eventName].map(handler => handler.apply(this, args));
  }
};
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
Object.assign(Menu.prototype, eventMixin);
let menu = new Menu();
menu.on("select", value => console.log(`Value selected: ${value}`));
menu.choose(12);