// 导出数组
export let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// 导出 const 声明的变量
export const MODULES_BECAME_STANDARD_YEAR = 2015;
// 导出类
export class User {
  constructor(name) {
    this.name = name;
  }
}
// 或者
let months_ = ["Jan", "Feb", "Mar", "Apr", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MODULES_BECAME_STANDARD_YEAR_ = 2015;

class User_ {
  constructor(name) {
    this.name = name;
  }
}
export { months_, MODULES_BECAME_STANDARD_YEAR_, User_ };


// import *
// import * as all from "./test.js";
// all.sayHi("sss");

// import as
// import { sayHi as Hi } from "./test.js";
// Hi("ssss");

// export as
export { months_ as mo };

// export default
// 每个文件应该只有一个 export default
export default class User {
  constructor(name) {
    this.name = name;
  }
}
// 别的文件可以不需要大括号导入 import User from ".....";

// default 名称
// 如同 export default months_ 一样
export { months_ as default };

// 如果使用 * 导入
// import * as user from './user.js';
// let User = user.default; // 默认的导出
// new User('John');


// 重新导出
// 当项目目录过于复杂时，使用单个文件导出就显得重要
// export { sayHi } from './test.js';
// export { default as User } from './user.js';
// export { default } from "./user.js";