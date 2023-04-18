// 函子
// 函子是一个对象，实现了一个 map 方法，在遍历每个对象值的时候，生成一个新的对象
// 总而言之，函子是一个持有值的容器
const Container = function (val) {
  this.value = val;
};
// 根据传入值创建容器
Container.of = function (value) {
  return new Container(value);
};
// 将容器内的值进行 fun 运算，然后放会容器
Container.prototype.map = function (fun) {
  return Container.of(fun(this.value));
};

// MayBe 函子
const MayBe = function (val) {
  this.value = val;
};
MayBe.of = function (value) {
  return new MayBe(value);
};
MayBe.prototype.isNothing = function () {
  return this.value === undefined || this.value === null;
};
MayBe.prototype.map = function (fun) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fun(this.value));
};
// 虽然只是简单的返回 this.value，但是它可以帮助我们打开嵌套
MayBe.prototype.join = function () {
  return this.isNothing() ? MayBe.of(null) : this.value;
};
// 我们总需要在 map 后调用 join，现在把它封装一下
MayBe.prototype.chain = function (fun) {
  return this.map(fun).join();
} 

// Either 函子
const Nothing = function (val) {
  this.value = val;
};
Nothing.of = function (val) {
  return new Nothing(val);
};
Nothing.prototype.map = function (fun) {
  return this;
};
const Some = function (val) {
  this.value = val;
};
Some.of = function (val) {
  return new Some(val);
};
Some.prototype.map = function (fun) {
  return Some.of(fun(this.value));
};
const Either = {
  Some: Some,
  Nothing: Nothing,
};

export { Container, MayBe, Either };
