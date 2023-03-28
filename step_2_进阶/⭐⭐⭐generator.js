// 生成器
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}
// 使用
let generator = generateSequence();
// console.log(generator.next());


// generator 对象是可迭代的
// for(let i of generator) {
//   console.log(i);
// }

// generator 可以使用 spread 语法
let sequence = [0, ...generateSequence()];
// console.log(sequence);

// 使用 generator 迭代
// 在之前的可迭代对象中，使用了 [Symbol.iterator] 进行迭代
let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        return this.current <= this.last
          ? { done: false, value: this.current++ }
          : { done: true };
      },
    };
  },
};
// 使用 generator
let range_ = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    for (let val = this.from; val < this.to; val++) {
      yield val;
    }
  },
};


// generator 组合
// 组合是将几个 generator 透明的嵌入到一起
function* generateSequence_(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
// 使用 yield* 这个特殊的语法将一个 generator 嵌入到另一个 generator 中
function* generatePasswordCodes() {
  // 0..9
  // for (let i = 48; i <= 57; i++) yield i;
  yield* generateSequence_(48, 57);
  // A..Z
  // for (let i = 65; i <= 90; i++) yield i;
  yield* generateSequence_(65, 90);
  // a..z
  // for (let i = 97; i <= 122; i++) yield i;
  yield* generateSequence_(97, 122);
}
// let str = '';
// for(let code of generatePasswordCodes()) {
//   str += String.fromCharCode(code);
// }
// console.log(str);


// yield 是一个双向通路
// yield 不止可以想外部返回结果，也可以将外部的值传入 generator 内
function* gen() {
  let result = yield "2 + 2 = ?";
  console.log(`2 * 2 = ${result}`);
}
let generator_ = gen();
// console.log(generator_.next().value);
// // 将值传入 generator
// generator_.next(4);


// generator.throw
// 我们可以将值传入 generator，也可以将 error 传入
// 要向 yield 传递一个 error，我们需要调用 generator.throw
function* gen_() {
  try {
    let result  = yield "2 + 2 = ?";
    console.log("ssss");
  } catch (err) {
    console.log(e);
  }
}
// let generator_1 = gen();
// let question = generator_1.next().value;
// generator_1.throw(new Error("Fghk"));


// generator.return
// 完成 generator 的执行，并返回给定的 value
let g = generateSequence();
// console.log(g.next());
// console.log(g.return('foo'));
// // 下面的值会是 undefined
// console.log(g.next());


// 伪随机 generator
function* pseudoRandom(seeds) {
  while(true) {
    seeds = seeds * 16807 % 2147483647;
    yield seeds;
  }
}
let tmp = pseudoRandom(1);
console.log(tmp.next());
console.log(tmp.next());
console.log(tmp.next());