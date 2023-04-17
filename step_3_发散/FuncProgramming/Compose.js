import { map, concatAll, filter, forEach, reduce, zip } from "./Array.js";
// Unix 理念
// 1. 每个程序只做好一件事情，为了完成一项新的任务，与其在复杂的旧程序中添加新属性，不如重新构建程序
// 2. 每个程序的输出应该是另一个未知程序的输入
// 3. 每一个基础函数都需要接收一个参数并返回数据

// 接收一个函数的输出，并将其作为输入出传入另一个函数
// const compose = (a, b) => (c) => a(b(c));
// 更改一下，使用 reduce，可以组合多个函数
const compose =
  (...funs) =>
  (value) =>
    reduce(funs.reverse(), (acc, fun) => fun(acc), value);
// 在上面的 compose 中，数据流的方向是从右往左，如果我们需要从左往右的呢
const pipe =
  (...funs) =>
  (value) =>
    reduce(funs, (acc, fun) => fun(acc), value);

export { compose, pipe };
