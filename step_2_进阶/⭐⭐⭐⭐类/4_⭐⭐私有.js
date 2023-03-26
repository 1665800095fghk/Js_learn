// 受保护的属性以 _ 为前缀
class CoffeeMachine {
  _waterAmount = 0;
  set waterAmount(value) {
    if(value  < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }
  constructor(power) {
    this._power = power;
  }
}
// 如果想让一个变量为只读，只设置 get 就行

// TODO 私有的 #waterLimit - 现代 Js 教程